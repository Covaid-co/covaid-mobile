import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  ListItem,
  Button,
  AsyncStorage,
} from "react-native";
//import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import Modal from "react-native-modal";
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import getDistance from "../../util/distance";
import PendingRequestScreen from "../IndividualRequestScreen/PendingRequestScreen";
import CompletedRequestScreen from "../IndividualRequestScreen/CompletedRequestScreen";
import ActiveRequestScreen from "../IndividualRequestScreen/ActiveRequestScreen";

export default function RequestsScreen({ route, navigation }) {
  const [user, setUser] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [currentRequestList, setCurrentRequestList] = useState();
  const [currentRequestType, setCurrentRequestType] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [buttonStyles, setButtonStyles] = useState([
    buttons.pressed_tab,
    buttons.tabs,
    buttons.tabs,
    texts.button_label,
    texts.button_label_blue,
    texts.button_label_blue,
  ]);
  const fetchUser = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data[0]);
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

  function generateRequestList(requestData, requestStateChanger, reqStatus) {
    let tempList = [];
    console.log(user);
    for (var i = 0; i < requestData.length; i++) {
      var element = {
        key: i,
        requester_name: requestData[i].personal_info.requester_name,
        resources: requestData[i].request_info,
        needed_by:
          requestData[i].request_info.date +
          " " +
          requestData[i].request_info.time,
        distance:
          getDistance(
            0,
            0,
            requestData[i].location_info.coordinates[0],
            requestData[i].location_info.coordinates[1]
          ) + " m", //requestData[i].location_info.coordinates[0] + ", " + requestData[i].location_info.coordinates[1],
        requester_contact:
          requestData[i].personal_info.requester_email ||
          requestData[i].personal_info.requester_phone,
        details: requestData[i].request_info.details,
        completed_date: requestData[i].status.completed_date || "",
        request_id: requestData[i]._id,
      }; // add any relevant information
      tempList.push(element);
    }
    //initializes the current request list to "pending". Otherwise the list of requests dont pop up initially
    if (reqStatus == currentRequestType) {
      setCurrentRequestList(tempList);
    }
    requestStateChanger(tempList);
    return tempList;
  }

  function fetchRequests(reqStatus, requestStateChanger, token) {
    let params = { status: reqStatus };
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);

    fetch_a(token, "token", url, {
      method: "get",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setTimeout(function () {
              generateRequestList(data, requestStateChanger, reqStatus);
            }, 750);
            // generateRequestList(data, requestStateChanger, reqStatus);
          });
        } else {
          console.log("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function toggleButtonStyles(reqType) {
    if (reqType === volunteer_status.PENDING) {
      setButtonStyles([
        buttons.pressed_tab,
        buttons.tabs,
        buttons.tabs,
        texts.button_label,
        texts.button_label_blue,
        texts.button_label_blue,
      ]);
    } else if (reqType === volunteer_status.IN_PROGRESS) {
      setButtonStyles([
        buttons.tabs,
        buttons.pressed_tab,
        buttons.tabs,
        texts.button_label_blue,
        texts.button_label,
        texts.button_label_blue,
      ]);
    } else {
      setButtonStyles([
        buttons.tabs,
        buttons.tabs,
        buttons.pressed_tab,
        texts.button_label_blue,
        texts.button_label_blue,
        texts.button_label,
      ]);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
        console.log("GETTING USER ID " + data);
        fetchUser(data);
      });

      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        console.log("GETTING TOKEN " + data);
        fetchRequests(volunteer_status.PENDING, setPendingRequests, data);
        fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
        fetchRequests(volunteer_status.COMPLETE, setCompletedRequests, data);
      });
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  if (pendingRequests) {
    console.log(pendingRequests.key);
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={texts.header}>Welcome back, {user.first_name}!</Text>
          <Text></Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={buttonStyles[0]}
              onPress={() => {
                setCurrentRequestList(pendingRequests);
                setCurrentRequestType(volunteer_status.PENDING);
                toggleButtonStyles(volunteer_status.PENDING);
              }}
            >
              <Text style={buttonStyles[3]}>
                Pending ({pendingRequests.length})
              </Text>
              {/*<Badge containerStyle={{ position: 'absolute', top: -7, right: 6 }} value={<><Text>{pendingRequests.length}</Text></>} status='warning' />*/}
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyles[1]}
              onPress={() => {
                setCurrentRequestList(activeRequests);
                setCurrentRequestType(volunteer_status.IN_PROGRESS);
                toggleButtonStyles(volunteer_status.IN_PROGRESS);
              }}
            >
              <Text style={buttonStyles[4]}>
                Active ({activeRequests.length})
              </Text>
              {/*<Badge containerStyle={{ position: 'absolute', top: -7, right: 11 }} value={<><Text>{activeRequests.length}</Text></>} status='warning' />*/}
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyles[2]}
              onPress={() => {
                // refreshStatuses();
                setCurrentRequestList(completedRequests);
                setCurrentRequestType(volunteer_status.COMPLETE);
                toggleButtonStyles(volunteer_status.COMPLETE);
              }}
            >
              <Text style={buttonStyles[5]}>
                Complete ({completedRequests.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {displayAllRequests(currentRequestList)}
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
  function displayAllRequests(reqList) {
    if (reqList && reqList.length == 0) {
      return (
        <>
          <View style={styles.container}>
            <View style={styles.center}>
              <Text style={texts.no_request}>No requests here.</Text>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <FlatList
          data={currentRequestList || pendingRequests}
          contentContainerStyle={styles.center}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.request}
              onPress={() => {
                if (currentRequestType == volunteer_status.PENDING) {
                  navigation.navigate("Pending Request", {
                    navigation: route.params,
                    item: item,
                    pendingList: pendingRequests,
                    activeList: activeRequests,
                  });
                } else if (currentRequestType == volunteer_status.IN_PROGRESS) {
                  navigation.navigate("Active Request", {
                    navigation: route.params,
                    item: item,
                    activeList: activeRequests,
                    completeList: completedRequests,
                  });
                } else if (currentRequestType == volunteer_status.COMPLETE) {
                  navigation.navigate("Completed Request", {
                    navigation: route.params,
                    item: item,
                  });
                }
                setCurrentItem(item);
              }}
            >
              {displayRequestInfo(currentRequestType, item)}
            </TouchableOpacity>
          )}
        />
      );
    }
  }

  function displayRequestInfo(reqType, item) {
    if (
      reqType == volunteer_status.PENDING ||
      reqType == volunteer_status.IN_PROGRESS
    ) {
      var resourceBadges = ``;
      /*item.resources.resource_request.forEach(req => {console.log(req); 
        resourceBadges += `<Badge value={<><Text>${req}</Text></>} status='primary' />`; 
      });
      console.log(resourceBadges) 
      var dom = React.createElement(resourceBadges)*/
      //dom.innerHTML = resourceBadges;
      return (
        <>
          <Text style={texts.request_title}>{item.requester_name}</Text>
          <Text style={texts.request_text}>
            <Text style={texts.request_label}>Request resources: </Text>
            {item.resources.resource_request.join(", ")}
          </Text>
          {/*<Text style={texts.request_text}><Text style={texts.request_label}>Request resources: </Text>{dom}</Text>*/}
          <Text style={texts.request_text}>
            <Text style={texts.request_label}>Needed by: </Text>
            {item.needed_by}
          </Text>
        </>
      );
    } else if (reqType == volunteer_status.COMPLETE) {
      return (
        <>
          <Text style={texts.request_title}>{item.requester_name}</Text>
          <Text style={texts.request_text}>
            <Text style={texts.request_label}>Completed: </Text>
            {item.completed_date}
          </Text>
        </>
      );
    } else {
      setCurrentRequestType(volunteer_status.PENDING);
      return (
        <>
          <Text style={texts.request_title}>{item.requester_name}</Text>
          <Text style={texts.request_text}>
            <Text style={texts.request_label}>Request resources: </Text>
            {item.resources.resource_request.join(", ")}
          </Text>
          {/*<Text style={texts.request_text}><Text style={texts.request_label}>Request resources: </Text>{dom}</Text>*/}
          <Text style={texts.request_text}>
            <Text style={texts.request_label}>Needed by: </Text>
            {item.needed_by}
          </Text>
        </>
      );
    }
  }
}
