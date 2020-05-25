import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { passwordStyles } from "./ResetPasswordStyles";
import {
  styles,
  buttons,
  texts,
} from "../../screens/LoginScreen/LoginScreenStyles";
import { homeURL } from "../../constants";
import { validateEmail } from "../../Helpers";

/**
 * Reset Password modal
 */
export default function ResetPassword(props) {
  const [email, setEmail] = useState();

  function handleClose() {
    props.modalVisible(false);
  }

  function handleSubmitForgot() {
    let form = { email: email };

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
            [{ text: "OK", onPress: () => handleClose() }],
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
        console.log(e);
      });
  }
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false}>
        <View style={passwordStyles.centeredView}>
          <View style={passwordStyles.modalView}>
            <Text style={passwordStyles.descriptTest}>
              {" "}
              Reset your password{" "}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7F7F7F"
              onChangeText={(text) => setEmail(text)}
              defaultValue={email}
            />

            <TouchableOpacity
              onPress={handleSubmitForgot}
              disabled={!validateEmail(email)}
              style={!validateEmail(email) ? buttons.disabled : buttons.login}
            >
              <Text style={texts.button_label}>
                Send me a password reset link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose}>
              <Text style={texts.button_label_blue}>Close {"\n"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
