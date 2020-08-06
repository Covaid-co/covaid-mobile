import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  FlatList,
  Keyboard,
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
  const [isFocused, setFocus] = useState(false);
  const [keyboardHeight] = useState(new Animated.Value(46));
  const heightFactor = 1.2;

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);
    console.log("called. keyboardHeight: ", keyboardHeight);
    return () => {
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = (event) => {
    console.log("ENDHEIGHT: ", event.endCoordinates.height);
    setFocus(true);
    Animated.timing(keyboardHeight, {
      duration: event.duration * 0.9,
      toValue: event.endCoordinates.height * heightFactor,
      useNativeDriver: false,
    }).start();
  };

  const _keyboardWillHide = (event) => {
    console.log("STARTHEIGHT: ", event.endCoordinates.height);
    setFocus(false);
    Animated.timing(keyboardHeight, {
      duration: event.duration * 0.9,
      toValue: 46,
      useNativeDriver: false,
    }).start();
  };

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
    let form = {
      reason: message.trim(),
      adminMode: true,
    };
    let params = {
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
        <Animated.View
          style={{
            ...styles.confirm_modal_view,
            paddingBottom: keyboardHeight,
          }}
        >
            <TouchableOpacity
              style={{ alignItems: 'right' }}
              onPress={() => {handleClose()}}
            >
              <View
                style={{ minHeight: 50, minWidth: 50, marginRight: 10, marginTop: -20}}
              >
                <Icon
                  name="close"
                  size={32}
                  color="#7F7F7F"
                  style={buttons.close}
                  onPress={() => {handleClose()}}
                />
              </View>
              
            </TouchableOpacity>
          <View style={styles.header_container}>
            <Text style={texts.individual_req_header}>Confirmation</Text>
          </View>
          <View style={{ ...styles.info_container }}>
            <Text style={texts.confirm_text}>
              How did you complete this request?
            </Text>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder="Ex: I delivered groceries to this person's front door! (min. 10 characters)"
              placeholderTextColor="#CECECE"
              color="#7F7F7F"
              onChangeText={(text) => setMessage(text)}
              defaultValue={message}
            />
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={handleConfirm}
              disabled={message.length < 10}
              style={
                message.length < 10 ? buttons.disabledConfirm : buttons.confirm
              }
            >
              <Text style={texts.button_label_white}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
