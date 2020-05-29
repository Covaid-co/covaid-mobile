import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage,
} from "react-native";
import { styles, buttons, texts } from "./LoginScreenStyles";
import { homeURL } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import RequestsScreen from "../RequestsScreen/RequestsScreen.js";

export default function LoginScreen() {
  const [username, setUsername] = useState('bangaru2@illinois.edu');
  const [password, setPassword] = useState('pwd123');
  const [userID, setUserID] = useState();
  const [loginSession, setLoginSession] = useState();
  // userID and loginToken are the only things that need to be saved really 

  async function handleLogin() {
    let form = {
      user: {
        email: username,
        password: password,
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
            //console.log(data["user"]._id)
            setUserID(data["user"]._id);
            setLoginSession(data["user"].token); 

            const storeUserInfo = async () => {
              try {
                await AsyncStorage.setItem('@userID', JSON.stringify(data["user"]._id))
                //await AsyncStorage.setItem('@sessionToken', JSON.stringify(data["user"].token))
              } catch (e) {
                console.log(e); 
              }
            }

            const storeSmthElse = async () => {
              try {
                //await AsyncStorage.setItem('@userID', JSON.stringify(data["user"]._id))
                await AsyncStorage.setItem('@sessionToken', JSON.stringify(data["user"].token))
              } catch (e) {
                console.log(e); 
              }
            }
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

  //AsyncStorage.getItem("userID").then((userID)=>setUserID(userID));
  //AsyncStorage.getItem("sessionToken").then((sessionToken)=>setLoginSession(sessionToken));

  if (!(userID && loginSession)) {
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
            secureTextEntry={true}
            defaultValue={password}
          />
          <TouchableOpacity onPress={handlePasswordReset}>
            <Text style={texts.button_label_blue}>Forgot your Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !validateEmail(username) || !password
                ? buttons.disabled
                : buttons.login
            }
            onPress={handleLogin}
            disabled={!validateEmail(username) || !password}
          >
            <Text style={texts.button_label}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.signup}>
            <Text style={texts.button_label_blue}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
        <View>
          <RequestsScreen />
        </View>
    );
  }
  
}
