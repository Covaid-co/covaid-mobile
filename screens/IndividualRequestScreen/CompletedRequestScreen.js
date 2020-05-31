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

export default function CompletedRequestScreen(props) {
  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  return (
    <View>
      <View>
        <Text style={texts.header}>Completed Request</Text>

        <Text>Who: {props.item.requester_name}</Text>
        <Text>Contact: {props.item.requester_contact}</Text>
        <Text>Details: {props.item.details}</Text>
        <Text>Completed: {props.item.completed_date}</Text>
        
        <TouchableOpacity style={buttons.go_back} onPress={() => props.setDisplayIndividualReq(false)}>
          <Text style={texts.button_label_blue}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
}
