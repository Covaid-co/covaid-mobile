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

export default function CompletedRequestScreen({ route, navigation }) {
  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  return (
    <View>
      <View>
        <Text style={texts.header}>Completed Request</Text>

        <Text>Who: {route.params.item.requester_name}</Text>
        <Text>Contact: {route.params.item.requester_contact}</Text>
        <Text>Details: {route.params.item.details}</Text>
        <Text>Completed: {route.params.item.completed_date}</Text>
        
      </View>
    </View>
  );  
}
