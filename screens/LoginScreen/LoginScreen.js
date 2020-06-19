import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Keyboard,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles, buttons, texts } from "./LoginScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import RequestsScreen from "../RequestsScreen/RequestsScreen.js";
import ResetPassword from "../../components/ResetPassword/ResetPassword";

export default function LoginScreen({ route, navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const [isFocused, setFocus] = useState(false);

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
    Keyboard.addListener("keyboardDidShow", _keyboardWillShow);
    Keyboard.addListener("keyboardDidHide", _keyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardWillHide);
    };

    // if (idHolder && tokenHolder) {
    //   navigation.navigate("Covaid");
    // }
  }, []);

  const _keyboardWillShow = (event) => {
    setFocus(true);
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height * 1.75,
      }),
    ]).start();
  };

  const _keyboardWillHide = (event) => {
    setFocus(false);
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

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
            setUsername("");
            setPassword("");
            navigation.navigate("Covaid");
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
    // <View style={{ backgroundColor: "white" }}
    <Animated.View style={[styles.screen, { paddingBottom: keyboardHeight }]}>
      <View style={{ flex: 0.33 }} />
      <View style={styles.content_container}>
        <Text style={texts.header}>covaid</Text>
        <Text style={texts.subheader}>volunteers</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CECECE"
            onChangeText={(text) => setUsername(text)}
            defaultValue={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#CECECE"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            defaultValue={password}
          />
          <TouchableOpacity
            style={
              !validateEmail(username) || !password
                ? buttons.disabled
                : buttons.login
            }
            onPress={handleLogin}
            disabled={!validateEmail(username) || !password}
          >
            <Text style={texts.button_label}>Login</Text>
          </TouchableOpacity>
          {!isFocused && (
            <TouchableOpacity onPress={handlePasswordReset}>
              <Text style={texts.forgot_password}>Forgot password?</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={texts.footer_text}>
          Don’t have an account? To register as a new volunteer, please visit{" "}
        </Text>
        <Text style={texts.footer_text}>www.covaid.co</Text>
      </View>
      {/* <TouchableOpacity style={buttons.signup}>
        <Text style={texts.button_label_blue}>SIGN UP</Text>
      </TouchableOpacity>
      {modalVisible && <ResetPassword modalVisible={setModalVisible} />} */}
    </Animated.View>
  );
}
