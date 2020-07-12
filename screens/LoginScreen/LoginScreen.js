import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage,
  Animated,
  Keyboard,
  Linking,
} from "react-native";
import { styles, buttons, texts } from "./LoginScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { validateEmail } from "../../Helpers";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function LoginScreen({ route, navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [forgotPass, setForgotPass] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const heightFactor = 1.6;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
    }).start();
    checkPreviousLogin();
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = (event) => {
    setFocus(true);
    Animated.timing(keyboardHeight, {
      duration: event.duration * 0.8,
      toValue: event.endCoordinates.height * heightFactor,
    }).start();
  };

  const _keyboardWillHide = (event) => {
    setFocus(false);
    Animated.timing(keyboardHeight, {
      duration: event.duration * 0.9,
      toValue: 0,
    }).start();
  };

  async function storeKeys(data) {
    try {await AsyncStorage.setItem(storage_keys.SAVE_ID_KEY, data.user._id);
      
      await AsyncStorage.setItem(storage_keys.SAVE_TOKEN_KEY, data.user.token);
    } catch (e) {
      alert(e);
    }
  }

  async function checkPreviousLogin() {
    try {
      const idHolder = await AsyncStorage.getItem(storage_keys.SAVE_ID_KEY);
      const tokenHolder = await AsyncStorage.getItem(
        storage_keys.SAVE_TOKEN_KEY
      );
      if (idHolder && tokenHolder) {
        navigation.navigate("Covaid");
      }
    } catch (e) {
      alert(e);
    }
  }

  async function handlePasswordReset() {
    const form = { email: username };

    fetch(homeURL + "/api/users/emailpasswordresetlink", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert(
            "Check your email for password link!",
            "",
            [
              {
                text: "OK",
                onPress: () => {
                  setForgotPass(false);
                },
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          Alert.alert("Error sending link!", ""[{ text: "OK" }], {
            cancelable: false,
          });
        }
      })
      .catch((e) => {
        console.log("Error: " + e);
      });
  }

  async function handleLogin() {
    const form = {
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
            storeKeys(data);
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
          } else {
            Alert.alert(
              "An unknown error has occured. Please try again or contact Covaid support.",
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
        alert("ERROR: " + e);
      });
  }

  function toggleForgot() {
    setForgotPass(!forgotPass);
  }

  return (
    <Animated.View
      style={{ flex: 1, opacity: fadeAnim, backgroundColor: Colors.white }}
    >
      <Animated.View style={[styles.screen, { paddingBottom: keyboardHeight }]}>
        <View style={{ flex: 0.33 }} />
        <View style={styles.content_container}>
          <Text style={texts.header}>covaid</Text>
          <Text style={texts.subheader}>volunteers</Text>
          {forgotPass ? (
            <View style={styles.input_container}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#CECECE"
                onChangeText={(text) => setUsername(text)}
                defaultValue={username}
              />
              <TouchableOpacity
                style={
                  !validateEmail(username) ? buttons.disabled : buttons.login
                }
                onPress={handlePasswordReset}
                disabled={!validateEmail(username)}
              >
                <Text style={texts.button_label}>Send Reset Link</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleForgot}>
                <Text style={texts.forgot_password}>I remember now!</Text>
              </TouchableOpacity>
            </View>
          ) : (
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
                <TouchableOpacity onPress={toggleForgot}>
                  <Text style={texts.forgot_password}>Forgot password?</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </Animated.View>
      <View style={styles.footer}>
        <Text style={texts.footer_text}>
          Don’t have an account? To register as a new volunteer, please visit{" "}
          <Text
            style={[texts.footer_text, { color: Colors.blue }]}
            onPress={() => Linking.openURL("https://www.covaid.co")}
          >
            www.covaid.co
          </Text>
        </Text>
      </View>
    </Animated.View>
  );
}