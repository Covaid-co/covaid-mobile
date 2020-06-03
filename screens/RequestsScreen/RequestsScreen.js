import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList, StyleSheet, ListItem,
  Button, 
  AsyncStorage,
} from "react-native";
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import Modal from 'react-native-modal';
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import PendingRequestScreen from "../IndividualRequestScreen/PendingRequestScreen";
import CompletedRequestScreen from "../IndividualRequestScreen/CompletedRequestScreen";
import ActiveRequestScreen from "../IndividualRequestScreen/ActiveRequestScreen";
//import Cookie from 'js-cookie'

export default function RequestsScreen({ route, navigation }) {
  const [user, setUser] = useState("");
  const [currentRequestList, setCurrentRequestList] = useState();
  const [currentRequestType, setCurrentRequestType] = useState(volunteer_status.PENDING);
  const [pendingRequests, setPendingRequests] = useState([]); 
  const [activeRequests, setActiveRequests] = useState([]); 
  const [completedRequests, setCompletedRequests] = useState([]); 
  const [currentItem, setCurrentItem] = useState();  
  const [buttonStyles, setButtonStyles] = useState([buttons.pressed_tab, buttons.tabs, buttons.tabs, texts.button_label, texts.button_label_blue, texts.button_label_blue]);

  const fetchUser = async (id) => { // TODO: use authenticated version of this 
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
          });
        } else {
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  function generateRequestList(requestData, requestStateChanger) { 
    let tempList = []; 
    for (var i = 0; i < requestData.length; i++) { // TODO: forEach
      var element = { 
        key: i, 
        requester_name: requestData[i].personal_info.requester_name, 
        resources: requestData[i].request_info, // TODO: add badges 
        needed_by: requestData[i].request_info.date + " " + requestData[i].request_info.time, 
        location: requestData[i].location_info.coordinates[0] + ", " + requestData[i].location_info.coordinates[1], 
        requester_contact: requestData[i].personal_info.requester_email || requestData[i].personal_info.requester_phone, 
        details: requestData[i].request_info.details, 
        completed_date: requestData[i].status.completed_date || "",
        request_id: requestData[i]._id,  
      } // add any relevant information 
      tempList.push(element); 
    }
    requestStateChanger(tempList); 
  }

  function fetchRequests(reqStatus, requestStateChanger, token) {
    let params = {'status': reqStatus}; // TODO: get diff status requests (pending, in progress, completed)
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);
    
		fetch_a(token, 'token', url, {
            method: 'get',
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                  generateRequestList(data, requestStateChanger); 
                });
            } else {
                console.log("Error")
            }
    }).catch((e) => {
      console.log(e)
    });     
  }

  function toggleButtonStyles(reqType){
    if (reqType === volunteer_status.PENDING) {
      setButtonStyles([buttons.pressed_tab, buttons.tabs, buttons.tabs, texts.button_label, texts.button_label_blue, texts.button_label_blue]); 
    } else if (reqType === volunteer_status.IN_PROGRESS) {
      setButtonStyles([buttons.tabs, buttons.pressed_tab, buttons.tabs, texts.button_label_blue, texts.button_label, texts.button_label_blue]); 
    } else {
      setButtonStyles([buttons.tabs, buttons.tabs, buttons.pressed_tab, texts.button_label_blue, texts.button_label_blue, texts.button_label]); 
    }
  }  

  useEffect(() => {
    AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
      console.log("GETTING USER ID " + data)
      fetchUser(data); 
    });

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      console.log("GETTING TOKEN " + data)
      fetchRequests(volunteer_status.PENDING, setPendingRequests, data);
      fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
      fetchRequests(volunteer_status.COMPLETE, setCompletedRequests, data);
    });    

    setCurrentRequestList(pendingRequests); // TODO: Get them to show up when request screen opens 
    setCurrentRequestType(volunteer_status.PENDING);
    toggleButtonStyles(volunteer_status.PENDING); 
  }, []);



    return (
        <View style={styles.container}>
        <View style = {styles.center}>
        <Text style={texts.header}>Welcome back, {user.first_name}!</Text>
        <Text></Text>

        
        <View style={styles.row}>
          <TouchableOpacity 
          style = {buttonStyles[0]}
          onPress={() => {setCurrentRequestList(pendingRequests); 
              setCurrentRequestType(volunteer_status.PENDING);
              toggleButtonStyles(volunteer_status.PENDING); 
              }}>
            <Text style={buttonStyles[3]}>Pending</Text>
            <Badge containerStyle={{ position: 'absolute', top: -7, right: 6 }} value={<><Text>{pendingRequests.length}</Text></>} status='warning' />
          </TouchableOpacity>
          <TouchableOpacity 
          style = {buttonStyles[1]}
          onPress={() => {setCurrentRequestList(activeRequests);
              setCurrentRequestType(volunteer_status.IN_PROGRESS);
              toggleButtonStyles(volunteer_status.IN_PROGRESS); 
              }}>
            <Text style={buttonStyles[4]}>Active</Text>
            <Badge containerStyle={{ position: 'absolute', top: -7, right: 11 }} value={<><Text>{activeRequests.length}</Text></>} status='warning' />
          </TouchableOpacity>
          <TouchableOpacity 
          style = {buttonStyles[2]}
          onPress={() => {setCurrentRequestList(completedRequests); 
              setCurrentRequestType(volunteer_status.COMPLETE);
              toggleButtonStyles(volunteer_status.COMPLETE); 
              }}>
            <Text style={buttonStyles[5]}>Complete</Text>
          </TouchableOpacity>
          </View>
          </View>
        
          <FlatList
            data={currentRequestList}
            contentContainerStyle={styles.center}
            renderItem={({item}) => 
              <TouchableOpacity style={styles.request} onPress={() => { 
                if (currentRequestType == volunteer_status.PENDING) {
                  navigation.navigate("Pending Request", {navigation: route.params, item: item}); 
                } else if (currentRequestType == volunteer_status.IN_PROGRESS) {
                  navigation.navigate("Active Request", {navigation: route.params, item: item});
                } else if (currentRequestType == volunteer_status.COMPLETE) {
                  navigation.navigate("Completed Request", {navigation: route.params, item: item});
                }
                setCurrentItem(item); 
              }}>
                {displayRequestInfo(currentRequestType, item)}
              </TouchableOpacity>
            }
            /> 
      </View>  
    );

  function displayRequestInfo(reqType, item) {
    // TODO: display location properly instead of coordinates
    if (reqType == volunteer_status.PENDING || reqType == volunteer_status.IN_PROGRESS) {
      var resourceBadges = []; 
      item.resources.resource_request.forEach(req => {console.log(req); // TODO: badges not actually displaying text, change the badge color 
        resourceBadges.push(<><Badge value={<><Text>{req}</Text></>} status='primary' /></>)
      }); 
      return (
        <>
        <Text style={texts.request_title}>{item.requester_name}</Text>
        <Text style={texts.request_text}><Text style={texts.request_label}>Request resources: </Text>{item.resources.resource_request.join(", ")}</Text>
        {/* <Text style={texts.request_text}><Text style={texts.request_label}>Request resources: </Text>{resourceBadges}</Text> */} 
        <Text style={texts.request_text}><Text style={texts.request_label}>Needed by: </Text>{item.needed_by}</Text>
        </>
      )
    } else if (reqType == volunteer_status.COMPLETE) {  
      return (
        <>
        <Text style={texts.request_title}>{item.requester_name}</Text>
        <Text style={texts.request_text}><Text style={texts.request_label}>Completed: </Text>{item.completed_date}</Text>
        </>
      )
    }
    return (
      <Text style={texts.header}>Obtaining details...</Text>
    )
  };
}
