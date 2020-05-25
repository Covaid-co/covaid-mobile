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

export default function RequestsScreen() {
  const [userID, setUserID] = useState("5ec1a0b411b7cc136655d8d0");
  const [user, setUser] = useState(); 
  const [login]

  const handleLogin = () => {
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

  const getRequests = () => {
    let params = {'status': 1};
    var url = generateURL( "/api/request/volunteerRequests?", params);
    fetch_a('token', url, {
            method: 'get',
    }).then((response) => {
        console.log(JSON.stringify(response))
        if (response.ok) {
            response.json().then((data) => {
                console.log("what")
                alert(JSON.stringify(data)); 
            });
        } else {
          console.log("HELO")
          alert("Error obtaining requests");
        }
    }).catch((e) => {
        alert(e);
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
