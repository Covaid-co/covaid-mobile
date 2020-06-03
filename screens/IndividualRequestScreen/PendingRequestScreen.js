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
import fetch_a from '../../util/fetch_auth'

export default function PendingRequestScreen({ route, navigation }) {
  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  

  function acceptRequest() {
    console.log("Accept request.");
    let params = {
      ID: props.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/acceptRequest?", params);
    
    
    // TODO: fetch token 
    fetch_a("token", url, {
      method: "put",
    })
      .then((response) => {
        if (response.ok) { // TODO: Move it from pending to active on RequestsScreen
          alert("Accepted!")
        } else {
          console.log("Error");
        }
      })
      .catch((e) => {
        console.log(url); 
        console.log(e);
      });
  };

  function rejectRequest() {
    console.log("Reject request.")
  };

  return (
    <View>
      <View>
        <Text style={texts.header}>Pending Request</Text>

        <TouchableOpacity style={buttons.accept} onPress={() => acceptRequest()}>
          <Text style={texts.button_label}>Accept Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.reject}>
          <Text style={texts.button_label}>Reject Request</Text>
        </TouchableOpacity>

        <Text>Request is pending</Text>
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
