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
      <View style={styles.container3}>
        <Text style={texts.desc}>You have completed this request!</Text>
        <Text style={texts.desc}><Text style={texts.label}>Who: </Text>{route.params.item.requester_name}</Text>
        <Text style={texts.desc}><Text style={texts.label}>Contact: </Text>{route.params.item.requester_contact}</Text>
        <Text style={texts.desc}><Text style={texts.label}>Details: </Text>{route.params.item.details}</Text>
        <Text style={texts.desc}><Text style={texts.label}>Completed: </Text>{route.params.item.completed_date}</Text>
      </View>
    </View>
  );  
}
