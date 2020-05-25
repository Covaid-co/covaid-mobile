import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styles, buttons, texts } from "./RequestsScreenStyles";
import { homeURL } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import { createIconSetFromFontello } from "@expo/vector-icons";

export default function RequestsScreen() { // 'data' json obtained from login should be passed to RequestsScreen
  // user object can be obtained from its ID and requests can be made with its token 
  const [userID, setUserID] = useState();
  const [user, setUser] = useState(); 
  const [loginToken, setLoginToken] = useState(); 

  const fetch_user_obj = async (id) => {
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

  const handleLogin = () => {
    let form = {
      user: {
        email: 'ael49021@gmail.com',
        password: 'angela',
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
        alert("HELLO")
        alert(e);
      });
  }

  const getRequests = () => { //TODO: async storage 
    handleLogin(); 
    let params = {'status': 1};
    var url = generateURL( "/api/request/volunteerRequests?", params);
    fetch_a(loginToken, 'token', url, {
            method: 'get',
    }).then((response) => {
        console.log(JSON.stringify(response))
        if (response.ok) {
            response.json().then((data) => {
                console.log("what")
                console.log(JSON.stringify(data))
                alert(JSON.stringify(data)); 
            });
        } else {
          alert("Error obtaining requests");
        }
    }).catch((e) => {
        alert(e);
    });
    };


    const fetchRequests = (status, requestStateChanger) => {
      let params = {'status': status};
      var url = generateURL( "/api/request/volunteerRequests?", params);
      fetch_a('token', url, {
              method: 'get',
          }).then((response) => {
              if (response.ok) {
                  response.json().then(data => {
            requestStateChanger(data);
                  });
              } else {
                  console.log("Error")
              }
          }).catch((e) => {
              console.log(e)
          });
    };

  return (
    <View>
      <View style={styles.container}>
      <Text style={texts.button_label_blue}>sss REQUESTS</Text>
        <Text style={texts.button_label_blue}>Hello</Text>
        <TouchableOpacity style={buttons.signup} onPress={getRequests}>
          <Text style={texts.button_label_blue}>SEE REQUESTS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
