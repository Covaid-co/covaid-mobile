import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  AsyncStorage,
  Modal,
} from "react-native";

import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import Icon from "react-native-vector-icons/SimpleLineIcons";

/**
 * Reset Password modal
 */
export default function ConfirmModal(props) {
  const [message, setMessage] = useState("");

  function handleConfirm() {
    completeRequest();
    props.setDone(true);
    props.modalVisible(false);
  }

  function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function completeRequest() {
    // const form = {
    //   reason: message.trim(),
    //   adminMode: true,
    // };
    const params = {
      ID: props.item.request_id,
    };

    var url = generateURL(homeURL + "/api/request/completeRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) {
            removeFromArray(props.item, props.activeList);
            props.completeList.push(props.item);
          } else {
            alert("Unable to complete, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url);
          console.log(e);
        });
    });
  }

  function handleClose() {
    props.modalVisible(false);
  }

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modal_background}>
        <View style={styles.confirm_modal_view}>
          <TouchableOpacity onPress={handleClose}>
            <Icon
              name="close"
              size={25}
              color="#7F7F7F"
              style={buttons.close}
              onPress={handleClose}
            />
          </TouchableOpacity>
          <View style={styles.header_container}>
            <Text style={texts.individual_req_header}>Confirmation</Text>
          </View>
          <Text></Text>
          <Text style={texts.confirm_text}>
            How did you complete this request?
          </Text>
          <Text></Text>

          <TextInput
            style={styles.input}
            multiline="true"
            placeholder="Ex: I delivered groceries to this person's front door! (min. 10 characters)"
            placeholderTextColor="#7F7F7F"
            color="#000000"
            onChangeText={(text) => setMessage(text)}
            defaultValue={message}
          />
          <Text></Text>
          <View
            style={{ display: message.length < 10, style: styles.container }}
          >
            <TouchableOpacity onPress={handleConfirm} style={buttons.confirm}>
              <Text></Text>
              <Text style={texts.button_label_white}>Confirm {"\n"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function showResourceBadges(resources) {
  return (
    <>
      <FlatList
        data={resources}
        horizontal={false}
        numColumns={3}
        contentContainerStyle={styles.center}
        style={styles.list_style}
        renderItem={({ item }) => (
          <>
            <View style={styles.resource_badge}>
              <Text style={texts.resource_text}>{item}</Text>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index}
      />
    </>
  );
}
