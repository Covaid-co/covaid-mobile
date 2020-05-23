import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { styles, buttons, texts } from "./LoginScreenStyles";
import { homeURL } from '../../constants';
import { generateURL } from '../../Helpers';

export default function LoginScreen() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userID, setUserID] = useState(); 
  const [user, setUser] = useState(); 

  const fetch_user_obj = async (id) => {
    let params = {'id': id};
    var url = generateURL(homeURL +  "/api/users/user?", params); 
    
		fetch(url).then((response) => { 
      if (response.ok) {
          response.json().then(data => {
            setUser(data[0])
          });
      } else {
          alert("Error obtaining user object")
      }
      }).catch((e) => {
          alert(e)
      });
  }

  function handleLogin() {
    setUsername('bangaru2@illinois.edu')
    setPassword('pwd123'); 

    // TODO: validate credentials (backend)
    // make sure something is entered for both
    // make sure valid email ?

    let form = {
      'user': { // TODO: retrieve from text fields (frontend)
          'email': 'shrestab19@gmail.com',
          'password': 'pwd123'
      }
    };

    fetch(homeURL + '/api/users/login/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    }).then((response) => {
        if (response.ok) { 
            response.json().then(data => {
                setUserID(data["user"]._id);  
                fetch_user_obj(userID); 
            });            
        } else {
            if (response.status === 403) {
                alert("Check your email for a verification link prior to logging in.")
            } else if (response.status === 401) {
                alert("Incorrect password"); 
            }
        }
    }).catch(e => {
        alert(e)
    });
  }

  function handlePasswordReset() {
    console.log("send email");
  }

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/C-LOGO.png")}
        />
        <Text style={texts.button_label_blue}>UserID: {userID}</Text>
        <Text style={texts.header}>Volunteer App for COVID-19</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7F7F7F"
          onChangeText={(text) => setUsername(text)}
          defaultValue={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7F7F7F"
          onChangeText={(text) => setPassword(text)}
          defaultValue={password}
        />
        <TouchableOpacity onPress={handlePasswordReset}>
          <Text style={texts.button_label_blue}>Forgot your Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.login} onPress={handleLogin}>
          <Text style={texts.button_label}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.signup}>
          <Text style={texts.button_label_blue}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
