import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList, StyleSheet, ListItem
} from "react-native";
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL, volunteer_status } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
//import Cookie from 'js-cookie'

export default function RequestsScreen() {
  // from LoginScreen, we get loginToken and userID -> preferably loginSession or something 
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userID, setUserID] = useState();
  const [user, setUser] = useState("");
  const [loginSession, setLoginSession] = useState("");
  const [requestList, setRequestList] = useState("");

  const fetch_user_obj = async (id) => {
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
            fetch_user_obj(data["user"]._id);
            setLoginSession(data["user"].token)
            //Cookie.set("token", data.user.token);
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

  function generateRequestList(requestData) {
    let tempList = []; 
    for (var i = 0; i < requestData.length; i++) { // TODO: forEach
      var element = { // TODO: add more info upon clicking
        key: i, 
        requester_name: requestData[i].personal_info.requester_name, 
        resources: JSON.stringify(requestData[i].request_info), // TODO: add badges 
        needed_by: requestData[i].request_info.date + " " + requestData[i].request_info.time, 
      }
      tempList.push(element); 
    }
    setRequestList(tempList); 
  }

  function getRequests(requestStatus) {
    let params = {'status': volunteer_status.IN_PROGRESS}; // TODO: get diff status requests (pending, in progress, completed)
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);

		fetch_a(loginSession, 'token', url, {
            method: 'get',
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                  //console.log("data:" + JSON.stringify(data))
					        generateRequestList(data); 
                });
            } else {
                console.log("Error")
            }
    }).catch((e) => {
      console.log(e)
    });     
  }

  return (
    <View>
      <View style={styles.container}>
      <Text style={texts.header}>Welcome back, {user.first_name}!</Text>
      <Text style={texts.request_text}>View your requests below.</Text>
        <TouchableOpacity style={buttons.signup} onPress={handleLogin}>
          <Text style={texts.button_label_blue}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={buttons.signup} onPress={getRequests}>
          <Text style={texts.button_label_blue}>Active</Text>
        </TouchableOpacity>


        <View style={styles.container} marginTop="1%" marginBottom="1%">
        <FlatList
          data={requestList}
          renderItem={({item}) => 
            <>
            <View style={styles.request}>
              <Text style={texts.request_title}>{item.requester_name}</Text>
              <Text style={texts.request_text}>Request resources: {item.resources}</Text>
              <Text style={texts.request_text}>Needed by: {item.needed_by}</Text>
            </View>
            <Text></Text>
            </>
          }
        />
      </View>
      </View>
    </View>
  );
}