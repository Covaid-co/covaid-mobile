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
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";

export default function ActiveRequestScreen({ route, navigation }) {
  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  function completeRequest() {
    setIsModalVisible("Complete request.");
  };

  function cancelRequest() {
    console.log("Cancel request.")
  };

  return (
    <View>
      <View>
        <Text style={texts.header}>Active Request</Text>

        <View style={styles.row}>
          <TouchableOpacity style={buttons.accept}>
            <Text style={texts.button_label_green}>Complete Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.reject}>
            <Text style={texts.button_label_red}>Cancel Request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <Text style={texts.desc}>Request is in-progress</Text>
            <Text style={texts.desc}>
              Thanks for accepting this request for support! Please reach out to
              the requester by using the contact information below.
            </Text>
            <Text style={texts.desc}><Text style={texts.label}>Who: </Text> {route.params.item.requester_name}</Text>
            <Text style={texts.desc}><Text style={texts.label}>Contact: </Text>{route.params.item.requester_contact}</Text>
            <Text style={texts.desc}><Text style={texts.label}>WDetails: </Text>{route.params.item.details}</Text>
            <Text style={texts.desc}><Text style={texts.label}>Requesting support with: </Text>{route.params.item.resources.resource_request.join(", ")}</Text>
            <Text style={texts.desc}><Text style={texts.label}>Needed by: </Text>{route.params.item.needed_by}</Text>
            <Text style={texts.desc}><Text style={texts.label}>Location: </Text>{route.params.item.location}</Text>
          </View>
      </View>
    </View>
  );  
}
