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

export default function PendingRequestScreen(props) {
  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  

  function acceptRequest(reqKey) {
    setIsModalVisible("Accept request.");
  };

  function rejectRequest(reqKey) {
    console.log("Reject request.")
  };

  return (
    <View>
      <View>
        <Text style={texts.header}>Pending Request</Text>

        <Text>Request is pending</Text>
        <Text>Who: {props.item.requester_name}</Text>
        <Text>Contact: {props.item.requester_contact}</Text>
        <Text>Details: {props.item.details}</Text>
        <Text>Requesting support with: {props.item.resources}</Text>
        <Text>Needed by: {props.item.needed_by}</Text>
        <Text>Location: {props.item.location}</Text>
        
        <TouchableOpacity style={buttons.accept}>
          <Text style={texts.button_label}>Accept Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.reject}>
          <Text style={texts.button_label}>Reject Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.go_back} onPress={() => props.setDisplayIndividualReq(false)}>
          <Text style={texts.button_label_blue}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
}
