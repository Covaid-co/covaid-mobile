import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";

import { passwordStyles } from "./CompleteConfirmStyles";
import {
  styles,
  buttons,
  texts,
} from "../../screens/LoginScreen/LoginScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'

/**
 * Reset Password modal
 */
export default function CompleteConfirm(props) {
  const [message, setMessage] = useState("");

  function handleConfirm() {
    //alert(message + " fasjflsakjld")
    //console.log(props.item.request_id + "reqid")
    completeRequest(); 
    props.modalVisible(false);
  }

  function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function completeRequest() {
    let form = {
      reason: message,
      adminMode: true,
    };
    let params = {
      ID: props.item.request_id,
    };

    var url = generateURL(homeURL + "/api/request/completeRequest?", params);

    // TODO: remove useless token string 
    
    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { 
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) { // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(props.item, props.activeList); 
            props.completeList.push(props.item); 
            alert("Marked complete.")
          } else {
            alert("Unable to complete, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url); 
          console.log(e);
        })
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false}>
        <View style={passwordStyles.centeredView}>
          <View style={passwordStyles.modalView}>
            <Text style={passwordStyles.descriptTest}>
              How did you complete the request? 
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Message"
              placeholderTextColor="#7F7F7F"
              onChangeText={(text) => setMessage(text)}
              defaultValue={message}
            />
            <TouchableOpacity onPress={handleConfirm} style={{display: message || "none"}}>
              <Text style={texts.button_label_blue}>Confirm {"\n"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
