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
      ID: route.params.item.request_id,
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
       
        <View style={styles.container3}>
          <Text style={texts.desc}>
            This request is pending! 
          </Text>
          <Text style={texts.desc}><Text style={texts.label}>Who: </Text> {route.params.item.requester_name}</Text>
          <Text style={texts.desc}><Text style={texts.label}>Contact:</Text>  {route.params.item.requester_contact}</Text>
          <Text style={texts.desc}><Text style={texts.label}>Details: </Text> {route.params.item.details}</Text>
          <Text style={texts.desc}><Text style={texts.label}>Requesting support with: </Text> {route.params.item.resources.resource_request.join(", ")}</Text>
          <Text style={texts.desc}><Text style={texts.label}>Needed by: </Text> {route.params.item.needed_by}</Text>
          <Text style={texts.desc}><Text style={texts.label}>Location: </Text> {route.params.item.location}</Text>
        </View>
        
        <View style={styles.container2}>
          <View style={styles.row}>
            <TouchableOpacity style={buttons.accept} onPress={() => acceptRequest()}>
              <Text style={texts.button_label_green}>Accept Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.reject}>
              <Text style={texts.button_label_red}>Reject Request</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );  
}
