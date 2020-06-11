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
import getDistance from '../../util/distance'
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'

export default function PendingRequestScreen({ route, navigation }) {
  const [done, setDone] = useState(false); 

  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  function acceptConfirm() {
    Alert.alert(
      "Are you sure you want to accept this request?",
      "",
      [  
        {  
          text: 'Yes',  
          onPress: () => {
            acceptRequest();
            setDone(true); 
          },   
        },  
        {   
          text: 'Cancel', 
          onPress: () => console.log('Cancelled.')
        },  
      ]  
    ); 
  }

  function acceptRequest() {
    let params = {
      ID: route.params.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/acceptRequest?", params);
    
    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      console.log("GETTING TOKEN " + data)
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) { 
            //alert("Accepted request.")
            removeFromArray(route.params.item, route.params.pendingList); 
            route.params.activeList.push(route.params.item); 
          } else {
            alert("Unable to accept, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url); 
          console.log(e);
        })
    }); 
  };

  function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function rejectConfirm() {
    Alert.alert(
      "Are you sure you want to reject this request?",
      "",
      [  
        {  
          text: 'Yes',  
          onPress: () => {
            rejectRequest();
            setDone(true); 
          },   
        },  
        {   
          text: 'Cancel', 
          onPress: () => console.log('Cancelled.')
        },  
      ]  
    ); 
  }

  function rejectRequest() {
    let params = {
      ID: route.params.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/rejectRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { 
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) { // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(route.params.item, route.params.pendingList); 
            //alert("Rejected request.")
          } else {
            alert("Unable to reject, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url); 
          console.log(e);
        })
    }); 
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
          <Text style={texts.desc}><Text style={texts.label}>Distance: </Text> {getDistance(route.params.volunteer.latlong[0], route.params.volunteer.latlong[1], route.params.item.lat, route.params.item.long)} mi</Text>
        </View>
        {showButtons()}
    
    </View>
  );  

  function showButtons() {
    if (done) {
      return (
        <View style={styles.container2}>
          <View style={styles.row}>
            <TouchableOpacity style={buttons.disabled}>
              <Text style={texts.button_label_gray}>Accept Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.disabled}> 
              <Text style={texts.button_label_gray}>Reject Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      );       
    } else {
      return (
        <View style={styles.container2}>
          <View style={styles.row}>
            <TouchableOpacity style={buttons.accept} onPress={() => acceptConfirm()}>
              <Text style={texts.button_label_green}>Accept Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.reject} onPress={() => rejectConfirm()}> 
              <Text style={texts.button_label_red}>Reject Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      ); 
    }
  }
}
