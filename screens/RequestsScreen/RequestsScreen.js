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

  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
  ]

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            //console.log(data[0]);
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

  function handlePasswordReset() {
    console.log("send email");
  }

  function getRequests() {
    handleLogin(); 
    console.log("LOGINDONE")
    // console.log(userID)

    let params = {'status': volunteer_status.IN_PROGRESS}; // TODO: get diff status requests (pending, in progress, completed)
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);
    // console.log(url); 
    // console.log(loginSession); 
		fetch_a(loginSession, 'token', url, {
            method: 'get',
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                  console.log("data:" + JSON.stringify(data))
					        //requestStateChanger(data);
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
        <TouchableOpacity style={buttons.signup} onPress={getRequests}>
          <Text style={texts.button_label_blue}>SEE REQUESTS</Text>
        </TouchableOpacity>

        <View style={styles.container} marginTop="1%" marginBottom="1%">
        <FlatList
          data={[
            {key: 'Devin                                 '},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => 
            <><Text style={{borderWidth: 1, borderColor:"red"}}>{item.key}</Text>
            <Text style={texts.request_title}>{item.key}</Text></>
          }
        />

        <FlatList
          data={list}
          renderItem={({item}) => <Text
                
                title={item.name}>{item.name}</Text>}
          keyExtractor={item => item.name}
        />
      </View>
      </View>
    </View>
  );
}