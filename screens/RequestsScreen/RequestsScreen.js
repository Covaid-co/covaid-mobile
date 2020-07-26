import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList, 
  AsyncStorage,
} from "react-native";
import { styles, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, formatDate } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PendingModal from '../IndividualRequestScreen/PendingModal'
import ActiveModal from '../IndividualRequestScreen/ActiveModal'
import CompletedModal from '../IndividualRequestScreen/CompletedModal'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

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

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  let options = [{
    label: 'Requires Action',
    value: 'Requires Action',
  }, {
    value: 'In Progress',
  }, {
    value: 'Completed',
  }];

  useEffect(() => {
    setPendingModalVisible(route.params.pendingModalVisible)
    setCurrentItem(route.params.currentItem)
    setCurrentRequestList(route.params.currentRequestType);
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
        fetchUser(data); 
      });   

      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        fetchRequests(volunteer_status.PENDING, setPendingRequests, data)
        fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
        fetchRequests(volunteer_status.COMPLETE, setCompletedRequests, data);
      });     
    });
    navigation.setOptions = {
      title: 'Chat',
      headerStyle: { backgroundColor: 'red' },
      headerTitleStyle: { color: 'green' },
    }

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      unsubscribe();
    };
  }, [navigation]);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  if (route.params.choice !== currentRequestType) {
    if (route.params.choice == volunteer_status.COMPLETE) {
      setCurrentRequestList(completedRequests);
    } 
    else if (route.params.choice == volunteer_status.IN_PROGRESS) {
      setCurrentRequestList(activeRequests);
    } 
    else {
      setCurrentRequestList(pendingRequests);
    } 
    setCurrentRequestType(route.params.choice)
  }
  
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
        admin_msg: requestData[i].status.volunteers[0].adminMessage, 
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
      <View style={styles.req_container_original}>       
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
        <View style={styles.req_container}>   
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
            </View>
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
    if (reqType == volunteer_status.PENDING) {
      return (
        <>
        <View style={{flexDirection:'col'}}>
          <Text style={texts.request_name_text}>New Request</Text>
          <Text style={texts.request_date_text}>Due {formatDate(new Date(item.needed_by.split(" ")[0]), "MMM d", true)}  {displayRequestIcon(reqType)}</Text>
        </View>
        
      <Text style={texts.request_resource_text}>{item.resources.resource_request.join(", ")}</Text>
        </>
      );
    } else {
      return (
        <>
        <View style={{flexDirection:'col'}}>
          <Text style={texts.request_name_text}>{item.requester_name}</Text>
          <Text style={texts.request_date_text}>Due {formatDate(new Date(item.needed_by.split(" ")[0]), "MMM d", true)}  {displayRequestIcon(reqType)}</Text>
        </View>
        
      <Text style={texts.request_resource_text}>{item.resources.resource_request.join(", ")}</Text>
        </>
      );
    }    
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
