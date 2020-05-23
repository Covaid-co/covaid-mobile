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

export default function LoginScreen() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [successLogin, setSuccessLogin] = useState([false]);

  function handleLogin() {
    console.log(username);
    console.log(password);
    incorrectUsernamePassword();
  }

  const incorrectUsernamePassword = () =>
    Alert.alert("Incorrect username or password", ""[{ text: "OK" }], {
      cancelable: false,
    });

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
