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
  AsyncStorage
} from "react-native";
import Modal from 'react-native-modal';
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import PendingRequestScreen from "../IndividualRequestScreen/PendingRequestScreen";
import CompletedRequestScreen from "../IndividualRequestScreen/CompletedRequestScreen";
import ActiveRequestScreen from "../IndividualRequestScreen/ActiveRequestScreen";
//import Cookie from 'js-cookie'

export default function RequestsScreen() {
  // from LoginScreen, we get loginToken and userID -> preferably loginSession or something 
  //const [userID, setUserID] = useState();
  const [user, setUser] = useState("");
  //const [loginToken, setLoginToken] = useState("");
  const [currentRequestList, setCurrentRequestList] = useState();
  const [currentRequestType, setCurrentRequestType] = useState(volunteer_status.PENDING);
  // const [isModalVisible, setIsModalVisible] = useState(false); 
  const [pendingRequests, setPendingRequests] = useState(); 
  const [activeRequests, setActiveRequests] = useState(); 
  const [completedRequests, setCompletedRequests] = useState(); 
  const [displayIndividualReq, setDisplayIndividualReq] = useState(false);
  const [currentItem, setCurrentItem] = useState();  

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
    //console.log(requestData)
    let tempList = []; 
    for (var i = 0; i < requestData.length; i++) { // TODO: forEach
      var element = { 
        key: i, 
        requester_name: requestData[i].personal_info.requester_name, 
        resources: JSON.stringify(requestData[i].request_info), // TODO: add badges 
        needed_by: requestData[i].request_info.date + " " + requestData[i].request_info.time, 
        location: requestData[i].location_info.coordinates, 
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
  }, []);


  if (displayIndividualReq && currentRequestType == volunteer_status.PENDING) {
    return (
      <View style={styles.container}>
        <PendingRequestScreen item={currentItem} setDisplayIndividualReq={setDisplayIndividualReq}/>
      </View>
    )
  } else if (displayIndividualReq && currentRequestType == volunteer_status.IN_PROGRESS) {
    return (
      <View style={styles.container}>
        <ActiveRequestScreen item={currentItem} setDisplayIndividualReq={setDisplayIndividualReq}/>
      </View>
    )
  } else if (displayIndividualReq && currentRequestType == volunteer_status.COMPLETE) {
    return (
      <View style={styles.container}>
        <CompletedRequestScreen item={currentItem} setDisplayIndividualReq={setDisplayIndividualReq}/>
      </View>
    )
  } else {
    return (
      <View>
        <View style={styles.container}>
        <Text style={texts.header}>Welcome back, {user.first_name}!</Text>
        <Text style={texts.request_text}>View your requests below.</Text>
  
          <TouchableOpacity onPress={() => {setCurrentRequestList(pendingRequests); 
              setCurrentRequestType(volunteer_status.PENDING);}}>
            <Text style={texts.button_label_blue}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setCurrentRequestList(activeRequests);
              setCurrentRequestType(volunteer_status.IN_PROGRESS);}}>
            <Text style={texts.button_label_blue}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setCurrentRequestList(completedRequests); 
              setCurrentRequestType(volunteer_status.COMPLETE)}}>
            <Text style={texts.button_label_blue}>Complete</Text>
          </TouchableOpacity>
  
          <View style={styles.requestContainer} marginTop="1%" marginBottom="1%">
          <FlatList
            data={currentRequestList}
            renderItem={({item}) => 
              <>  
              <TouchableOpacity style={styles.request} onPress={() => {
                setDisplayIndividualReq(true); 
                setCurrentItem(item); 
              }}>
                {displayRequestInfo(currentRequestType, item)}
              </TouchableOpacity>
              <Text></Text>
              </>
            }
          />
        </View>
        </View>
      </View>  
    );
  }

  function displayRequestInfo(reqType, item) {
    if (reqType == volunteer_status.PENDING || reqType == volunteer_status.IN_PROGRESS) {
      return (
        <>
        <Text style={texts.request_title}>{item.requester_name}</Text>
        <Text style={texts.request_text}>Request resources: {item.resources}</Text>
        <Text style={texts.request_text}>Needed by: {item.needed_by}</Text>
        </>
      )
    } else if (reqType == volunteer_status.COMPLETE) { // TODO verify with website if this is the info that has to be shown 
      return (
        <>
        <Text style={texts.request_title}>{item.requester_name}</Text>
        <Text style={texts.request_text}>Completed: {item.completed_date}</Text>
        </>
      )
    }
    return (
      <Text style={texts.header}>Obtaining details...</Text>
    )
  };
}
