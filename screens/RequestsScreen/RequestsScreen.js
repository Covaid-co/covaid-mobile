import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList, 
  AsyncStorage,
} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import { styles, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, formatDate } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PendingModal from '../IndividualRequestScreen/PendingModal'
import ActiveModal from '../IndividualRequestScreen/ActiveModal'
import CompletedModal from '../IndividualRequestScreen/CompletedModal'

export default function RequestsScreen({ route, navigation }) {
  const [user, setUser] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]); 
  const [activeRequests, setActiveRequests] = useState([]); 
  const [completedRequests, setCompletedRequests] = useState([]);
  const [currentRequestList, setCurrentRequestList] = useState();
  const [currentRequestType, setCurrentRequestType] = useState(); 
  const [currentItem, setCurrentItem] = useState();  
  const requestTypeList = [volunteer_status.PENDING, volunteer_status.IN_PROGRESS, volunteer_status.COMPLETE]
  const [pendingModalVisible, setPendingModalVisible] = useState(false); 
  const [activeModalVisible, setActiveModalVisible] = useState(false); 
  const [completedModalVisible, setCompletedModalVisible] = useState(false); 

  let options = [{
    label: 'Requires Action',
    value: 'Requires Action',
  }, {
    value: 'In Progress',
  }, {
    value: 'Completed',
  }];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
        console.log("GETTING USER ID " + data)
        fetchUser(data); 
      });   

      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        console.log("GETTING TOKEN " + data)
        fetchRequests(volunteer_status.PENDING, setPendingRequests, data)
        fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
        fetchRequests(volunteer_status.COMPLETE, setCompletedRequests, data);
      });     

      var reqType = requestTypeList[route.params.choice];
      console.log("TYPE OF REQUEST: " + reqType)
      if (reqType == volunteer_status.COMPLETE) {
        setCurrentRequestList(completedRequests);
      } else if (reqType == volunteer_status.IN_PROGRESS) {
        setCurrentRequestList(activeRequests); 
      } else {
        setCurrentRequestList(pendingRequests); 
      }
      setCurrentRequestType(reqType);
    });
    navigation.setOptions = {
      title: 'Chat',
      headerStyle: { backgroundColor: 'red' },
      headerTitleStyle: { color: 'green' },
    }
    console.log("useeffects ran")

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  console.log(route.params)

  // if (route.params.choice == volunteer_status.COMPLETE) {
  //   setCurrentRequestList(completedRequests);
  //   setCurrentRequestType(route.params.choice)
  // } 
  // else if (reqType == volunteer_status.IN_PROGRESS) {
  //   setCurrentRequestList(activeRequests); 
  // } else {
  //   setCurrentRequestList(pendingRequests); 
  // }
  // setCurrentRequestType(reqType);
  
  const fetchUser = async (id) => { 
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
          });
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  function generateRequestList(requestData, requestStateChanger, reqStatus) { 
    let tempList = []; 
    for (var i = 0; i < requestData.length; i++) { 
      var element = { 
        key: i, 
        requester_name: requestData[i].personal_info.requester_name, 
        resources: requestData[i].request_info, 
        needed_by: requestData[i].request_info.date + " " + requestData[i].request_info.time, 
        lat: parseFloat(requestData[i].location_info.coordinates[0]), 
        long: parseFloat(requestData[i].location_info.coordinates[1]), 
        requester_contact_email: requestData[i].personal_info.requester_email,
        requester_contact_phone: requestData[i].personal_info.requester_phone, 
        details: requestData[i].request_info.details, 
        completed_date: requestData[i].status.completed_date || "",
        request_id: requestData[i]._id,  
        languages: requestData[i].personal_info.languages, 
        payment: requestData[i].request_info.payment, 
      } 
      tempList.push(element); 
    }
    // initializes the current request list to "pending". Otherwise the list of requests dont pop up initially
    if (reqStatus == currentRequestType) {
      setCurrentRequestList(tempList)
    }
    requestStateChanger(tempList);  
    return tempList; 
  }

  function fetchRequests(reqStatus, requestStateChanger, token) {
    let params = {'status': reqStatus}; 
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);
    
		fetch_a(token, 'token', url, {
            method: 'get',
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                  setTimeout(function () {
                    generateRequestList(data, requestStateChanger, reqStatus); 
                  }, 750);
                  // generateRequestList(data, requestStateChanger, reqStatus); 
                });
            } else {
                console.log("Error")
            }
    }).catch((e) => {
      console.log(e)
    });     
  }

  if (pendingRequests) {
    return (
        <View style={styles.req_container}>
          <Dropdown
            label=''
            data={options} 
            style={styles.dropdown_style}
            textColor="#4F4F4F"
            defaultValue="Requires Action"
            
            
            onChangeText={(label, value) =>{
                var reqType = requestTypeList[value];
                if (reqType == volunteer_status.COMPLETE) {
                  setCurrentRequestList(completedRequests);
                } else if (reqType == volunteer_status.IN_PROGRESS) {
                  setCurrentRequestList(activeRequests); 
                } else {
                  setCurrentRequestList(pendingRequests); 
                }
                setCurrentRequestType(reqType);
              }
            }
          />
        <View style={styles.center}> 
          </View>        
          {displayAllRequests(currentRequestList)}
      </View>  
    );
   } 
  else {
    return (
      <Text>Loading...</Text>
    )
  }
  function displayAllRequests(reqList) {
    if (reqList && reqList.length == 0) {
      return (
        <>
          <View style={styles.container}>
            <View style = {styles.center}>
              <View style={styles.no_request}>
                <Text style={texts.no_request_text}>{getEmptyMessage(currentRequestType)}</Text>
              </View>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
        {pendingModalVisible && <PendingModal modalVisible={setPendingModalVisible} item={currentItem} pendingList={pendingRequests} activeList={activeRequests} volunteer={user}/>}
        {activeModalVisible && <ActiveModal modalVisible={setActiveModalVisible} item={currentItem} activeList={activeRequests} completeList={completedRequests} volunteer={user}/>}
        {completedModalVisible && <CompletedModal modalVisible={setCompletedModalVisible} item={currentItem} />}
        <FlatList
            data={currentRequestList || pendingRequests}
            contentContainerStyle={styles.center}
            renderItem={({item}) => 
              <TouchableOpacity style={getContainerType(currentRequestType)} onPress={() => { 
                setCurrentItem(item); 
                if (currentRequestType == volunteer_status.PENDING || currentRequestType == null) {
                  setPendingModalVisible(true);
                  setActiveModalVisible(false);
                  setCompletedModalVisible(false);
                } else if (currentRequestType == volunteer_status.IN_PROGRESS) {
                  setPendingModalVisible(false);
                  setActiveModalVisible(true);
                  setCompletedModalVisible(false);
                } else if (currentRequestType == volunteer_status.COMPLETE) {
                  setPendingModalVisible(false);
                  setActiveModalVisible(false);
                  setCompletedModalVisible(true);
                }
              }}>
                {displayRequestInfo(currentRequestType, item)}
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index}
            /> 
          </>
      );
    }
  }

  function getContainerType(reqType) { 
    if (reqType == volunteer_status.IN_PROGRESS) {
      return styles.request_active
    } else if (reqType == volunteer_status.COMPLETE) {
      return styles.request_completed
    } else {
      return styles.request_pending
    }
  }

  function getEmptyMessage(reqType) {
    if (reqType == volunteer_status.IN_PROGRESS) {
      return "No tasks in-progress"; 
    } else if (reqType == volunteer_status.COMPLETE) {
      return "No completed tasks";
    } else {
      return "No tasks requiring action";
    } 
  }

  function displayRequestInfo(reqType, item) {
    return (
      <>
      <View style={{flexDirection:'col'}}>
        <Text style={texts.request_name_text}>{item.requester_name}</Text>
        <Text style={texts.request_date_text}>Due {formatDate(new Date(item.needed_by.split(" ")[0]), "MMM d", true)}  {displayRequestIcon(reqType)}</Text>
      </View>
      
    <Text style={texts.request_resource_text}>{item.resources.resource_request.join(", ")}</Text>
      </>
    );
  };

  function displayRequestIcon(reqType) {
    if (reqType == volunteer_status.IN_PROGRESS) {
      return (<Icon name="clock" size={15} color="#DB9327"/>)
    } else if (reqType == volunteer_status.COMPLETE) {
      return (<Icon name="check" size={15} color="#3ABD24"/>)
    } else {
      return (<Icon name="exclamation" size={15} color="#FF5924"/>)
    }
  }
}
