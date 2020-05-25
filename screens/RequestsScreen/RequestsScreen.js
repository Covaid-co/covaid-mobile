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

export default function LoginScreen() {
  const [userID, setUserID] = useState("5ec1a0b411b7cc136655d8d0");
  const [user, setUser] = useState(); 

  const getRequests = () => {
    let params = {'status': 1};
    var url = generateURL( "/api/request/volunteerRequests?", params);
    fetch_a('token', url, {
            method: 'get',
    }).then((response) => {
        alert(JSON.stringify(response))
        if (response.ok) {
            response.json().then((data) => {
                console.log("what")
                alert(JSON.stringify(data)); 
            });
        } else {
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
