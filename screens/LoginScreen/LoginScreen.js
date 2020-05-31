import React, { useState, useEffect } from "react";
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
import { homeURL, storage_keys } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import RequestsScreen from "../RequestsScreen/RequestsScreen.js";

export default function LoginScreen(props) {
  const [username, setUsername] = useState("bangaru2@illinois.edu");
  const [password, setPassword] = useState("pwd123");

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
            const saveData1 = async () => {
              try {
                await AsyncStorage.setItem(
                  storage_keys.SAVE_ID_KEY,
                  data["user"]._id
                );
              } catch (e) {
                alert(e);
              }
            };
            saveData1();

            const saveData2 = async () => {
              // TODO: combine this and above into 1 method
              try {
                await AsyncStorage.setItem(
                  storage_keys.SAVE_TOKEN_KEY,
                  data["user"].token
                );
              } catch (e) {
                alert(e);
              }
            };
            saveData2();

            props.setAppAuth(true);
          });
        } else {
          if (response.status === 403) {
            Alert.alert(
              "Check your email for a verification link prior to logging in.",
              "",
              [{ text: "OK" }],
              {
                cancelable: false,
              }
            );
          } else if (response.status === 401) {
            Alert.alert(
              "Incorrect username or password",
              "",
              [{ text: "OK" }],
              {
                cancelable: false,
              }
            );
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

  useEffect(() => {
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then(
      (data) => {
        return data;
      }
    );
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then(
      (data) => {
        return data;
      }
    );

    if (idHolder && tokenHolder) {
      props.setAppAuth(true);
    }
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/C-LOGO.png")}
        />
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
}
