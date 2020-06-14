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

import { styles, texts, buttons } from "./CompleteConfirmStyles";

import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'

/**
 * Reset Password modal
 */
export default function CompleteConfirm({ route, navigation }) {
  const [message, setMessage] = useState("");

  function handleConfirm() {
    //alert(message + " fasjflsakjld")
    //console.log(props.item.request_id + "reqid")
    completeRequest(); 
    route.params.setDone(true); 
    route.params.modalVisible(false);
    navigation.goBack(null); 
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
      ID: route.params.item.request_id,
    };

    var url = generateURL(homeURL + "/api/request/completeRequest?", params);

    // TODO: remove useless token string 
    
    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { 
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) { // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(route.params.item, route.params.activeList); 
            route.params.completeList.push(route.params.item); 
            //alert("Marked complete.")
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
    <View style={styles.container}>
      <View style={styles.active_header}>
        <Text style={texts.header}>Confirmation</Text>
      </View>
      <Text style={texts.desc}>How did you complete this request?</Text>
      <TextInput
        style={styles.input}
        multiline='true'
        placeholder="Ex: I delivered groceries to this person's front door! (min. 10 characters)"
        placeholderTextColor="#7F7F7F"
        color="#000000"
        onChangeText={(text) => setMessage(text)}
        defaultValue={message}
      />
      <Text></Text>
      <TouchableOpacity onPress={handleConfirm} style={{display: message || "none"}, buttons.accept}>
        <Text></Text>
        <Text style={texts.button_label}>Confirm {"\n"}</Text>
      </TouchableOpacity>
    </View>
  );
}



