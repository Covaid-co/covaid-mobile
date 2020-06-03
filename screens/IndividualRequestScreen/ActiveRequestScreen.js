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

        <TouchableOpacity style={buttons.accept}>
          <Text style={texts.button_label}>Complete Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.reject}>
          <Text style={texts.button_label}>Cancel Request</Text>
        </TouchableOpacity>

        <Text>Request is in-progress</Text>
          <Text>
            Thanks for accepting this request for support! Please reach out to
            the requester by using the contact information below.
          </Text>
          <Text>Who: {route.params.item.requester_name}</Text>
          <Text>Contact: {route.params.item.requester_contact}</Text>
          <Text>Details: {route.params.item.details}</Text>
          <Text>Requesting support with: {route.params.item.resources}</Text>
          <Text>Needed by: {route.params.item.needed_by}</Text>
          <Text>Location: {route.params.item.location}</Text>
      </View>
    </View>
  );  
}
