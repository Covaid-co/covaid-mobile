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
import { generateURL, formatDate, translatePayment } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function PendingRequestScreen({ route, navigation }) {
  const [done, setDone] = useState(false); 
  const [accepted, setAccepted] = useState(false); 

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
            setAccepted(true); 
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
      "This cannot be undone.",
      [  
        {  
          text: 'Reject',  
          onPress: () => {
            rejectRequest();
            setDone(true); 
          },   
        },  
        {   
          text: 'Cancel', 
          onPress: () => console.log("Not rejected")
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

  if (done && accepted) {
    return (
      <View style={styles.entire_request_container}>       
        <View style={styles.individual_req_container}>
          <View style={styles.requester_name_container}>
            <Text style={texts.individual_req_header}>Request Accepted   <Icon name="check" size={35} color="#2670FF"/></Text>
          </View>
          <Text style={texts.info_header}></Text>
          <Text style={texts.request_details}>Thank you for your help! We appreciate your willingness to give back.</Text>
        </View>    
      </View>
    ); 
  } else if (done & !accepted) {
    return (
      <View style={styles.entire_request_container}>       
        <View style={styles.individual_req_container}>
          <View style={styles.requester_name_container}>
            <Text style={texts.individual_req_header}>Request Rejected   <Icon name="close" size={35} color="#7F7F7F"/></Text>
          </View>
        </View>    
      </View>
    ); 
  } else {
    return (
      <View style={styles.entire_request_container}>       
          <View style={styles.individual_req_container}>
            <View style={styles.requester_name_container}>
              <Text style={texts.individual_req_header}>{route.params.item.requester_name}</Text>
            </View>
            <Text style={texts.info_header}>Information</Text>
            <Text style={texts.request_details}>Email: {route.params.item.requester_contact_email}</Text>
            <Text style={texts.request_details}>Phone: {route.params.item.requester_contact_phone}</Text>
            <Text style={texts.request_details}>Languages: {route.params.item.languages}</Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Needs:</Text>
            <Text style={texts.request_details}>{route.params.item.resources.resource_request.join(", ")}</Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Details</Text>
            <Text style={texts.request_details}>{route.params.item.details}</Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Needed by</Text>
            <Text style={texts.request_details}>
              {route.params.item.needed_by.split(" ")[1]} of {formatDate(new Date(route.params.item.needed_by.split(" ")[0]), "MMMMMMMMMM dd, yyyy", false)}
            </Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Reimbursement</Text>
            <Text style={texts.request_details}>{translatePayment(route.params.item.payment)}</Text>
            {showButtons()}
          </View>    
      </View>
    ); 
  }

  function showButtons() {      
    return (
      <>
        <Text></Text><Text></Text><Text></Text>
        <TouchableOpacity style={buttons.accept} onPress={() => acceptConfirm()}>
          <Text style={texts.button_label_white}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttons.reject} onPress={() => rejectConfirm()}> 
          <Text style={texts.button_label_red}>Decline</Text>
        </TouchableOpacity>
      </>
    ); 
  }
}
