import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styles, buttons, texts } from "./LoginScreenStyles";
import { homeURL } from "../../constants";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import { generateURL, validateEmail } from "../../Helpers";

export default function LoginScreen() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userID, setUserID] = useState();
  const [user, setUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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

  function handleLogin() {
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
            setUserID(data["user"]._id);
            fetch_user_obj(data["user"]._id);
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
    setModalVisible(true);
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
        {modalVisible && <ResetPassword modalVisible={setModalVisible} />}
      </View>
    </View>
  );
}
