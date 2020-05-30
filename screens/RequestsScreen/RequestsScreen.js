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
} from "react-native";
import Modal from 'react-native-modal';
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
//import Cookie from 'js-cookie'

export default function RequestsScreen() {
  // from LoginScreen, we get loginToken and userID -> preferably loginSession or something 
  const [userID, setUserID] = useState();
  const [user, setUser] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const [currentRequestList, setCurrentRequestList] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [pendingRequests, setPendingRequests] = useState(); 
  const [activeRequests, setActiveRequests] = useState(); 
  const [completedRequests, setCompletedRequests] = useState(); 

  const fetchUser = async (id) => {
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

  function handleLogin() {
    let form = {
      user: {
        email: 'bangaru2@illinois.edu',
        password: 'pwd123',
      },
    };

    fetch(homeURL + "/api/users/login/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserID(data["user"]._id);
            setLoginToken(data["user"].token)
          });
        } else {
          if (response.status === 403) {
            Alert.alert(
              "Check your email for a verification link prior to logging in.",
              ""[{ text: "OK" }],
              {
                cancelable: false,
              }
            );
          } else if (response.status === 401) {
            Alert.alert("Incorrect username or password", ""[{ text: "OK" }], {
              cancelable: false,
            });
          }
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  function generateRequestList(requestData, requestStateChanger) { 
    let tempList = []; 
    for (var i = 0; i < requestData.length; i++) { // TODO: forEach
      var element = { 
        key: i, 
        requester_name: requestData[i].personal_info.requester_name, 
        resources: JSON.stringify(requestData[i].request_info), // TODO: add badges 
        needed_by: requestData[i].request_info.date + " " + requestData[i].request_info.time, 
        location: requestData[i].location_info.coordinates, 
        requester_contact: requestData[i].requester_email || requestData[i].requester_phone, 
        details: requestData[i].request_info.details, 
        completed_date: requestData[i].status.completed_date || "", 
      } // add any relevant information 
      tempList.push(element); 
    }
    requestStateChanger(tempList); 
  }

  function fetchRequests(reqStatus, requestStateChanger) {
    let params = {'status': reqStatus}; // TODO: get diff status requests (pending, in progress, completed)
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);
    
		fetch_a(loginToken, 'token', url, {
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

  function toggleModal() { // TODO render proper modal with correct details based on if its a pending/active request
    setIsModalVisible(!isModalVisible);
  };

  function completeRequest(reqKey) {
    setIsModalVisible("Complete request.");
  };

  function acceptRequest(reqKey) {
    setIsModalVisible("Accept request.");
  };

  function cancelRequest(reqKey) {
    console.log("Cancel request.")
  };

  function rejectRequest(reqKey) {
    console.log("Reject request.")
  };

  useEffect(() => {
    handleLogin();   
    fetchUser(userID); 
    fetchRequests(volunteer_status.PENDING, setPendingRequests);
    fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests);
    fetchRequests(volunteer_status.COMPLETE, setCompletedRequests);
  }, []);


  return (
    <View>
      <View style={styles.container}>
      <Text style={texts.header}>Welcome back, {user.first_name}!</Text>
      <Text style={texts.request_text}>View your requests below.</Text>
        <TouchableOpacity style={buttons.signup} onPress={handleLogin}>
          <Text style={texts.button_label_blue}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCurrentRequestList(pendingRequests)}>
          <Text style={texts.button_label_blue}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentRequestList(activeRequests)}>
          <Text style={texts.button_label_blue}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentRequestList(completedRequests)}>
          <Text style={texts.button_label_blue}>Complete</Text>
        </TouchableOpacity>

        <View style={styles.requestContainer} marginTop="1%" marginBottom="1%">
        <FlatList
          data={currentRequestList}
          renderItem={({item}) => 
            <>

            <View style={{flex: 1}}>
              <Modal isVisible={isModalVisible}>
                <View style={{flex: 1}}>
                  {displayRequestModal(requestType, item)}
                </View>
              </Modal>
            </View>

            <TouchableOpacity style={styles.request} onPress={toggleModal}>
              {displayRequestInfo(requestType, item)}
            </TouchableOpacity>
            <Text></Text>
            </>
          }
        />
      </View>
      </View>
    </View>
  );

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


  function displayRequestModal(reqType, item) {
    if (reqType == volunteer_status.PENDING) {
      return (
        <>
        <Text>Test</Text>
        <Button title="Close" onPress={toggleModal} />
        <Button title="Accept" onPress={() => acceptRequest(item.key)} />
        <Button title="Reject" onPress={() => rejectRequest(item.key)} />
        <Text>Request is pending</Text>
        <Text>Thanks for accepting this request for support! Please reach out to the requester by using the contact information below.</Text>
        <Text>Who: {item.requester_name}</Text>
        <Text>Contact: {item.requester_contact}</Text>
        <Text>Details: {item.details}</Text>
        <Text>Requesting support with: {item.resources}</Text>
        <Text>Needed by: {item.needed_by}</Text>
        <Text>Location: {item.location}</Text>
        </>
      )
    } else if (reqType == volunteer_status.IN_PROGRESS) {
      return (
        <>
        <Text>Test</Text>
        <Button title="Close" onPress={toggleModal} />
        <Button title="Complete" onPress={() => completeRequest(item.key)} />
        <Button title="Cancel" onPress={() => cancelRequest(item.key)} />
        <Text>Request is in-progress</Text>
        <Text>Thanks for accepting this request for support! Please reach out to the requester by using the contact information below.</Text>
        <Text>Who: {item.requester_name}</Text>
        <Text>Contact: {item.requester_contact}</Text>
        <Text>Details: {item.details}</Text>
        <Text>Requesting support with: {item.resources}</Text>
        <Text>Needed by: {item.needed_by}</Text>
        <Text>Location: {item.location}</Text>
        </>
      )
    } else if (reqType == volunteer_status.COMPLETE) { // TODO verify with website if this is the info that has to be shown 
      return (
        <>
        <Text>Test</Text>
        <Button title="Close" onPress={toggleModal} />
        <Text>Request is complete</Text>
        <Text>Who: {item.requester_name}</Text>
        <Text>Contact: {item.requester_contact}</Text>
        <Text>Details: {item.details}</Text>
        <Text>Completed: {item.completed_date}</Text>
        </>
      )
    }
    return (
      <Text style={texts.header}>Obtaining request data...</Text>
    )
  };
}