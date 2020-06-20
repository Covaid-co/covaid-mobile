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
import CompleteConfirm from "../../components/CompleteConfirm/CompleteConfirm.js";
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function ActiveRequestScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [done, setDone] = useState(false); 
  const [cancelled, setCancelled] = useState(false); 

  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });    
  }, []);

  function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function cancelConfirm() {
    Alert.alert(
      "Are you sure you want to cancel this request?",
      "This cannot be undone.",
      [  
        {  
          text: 'Yes',  
          onPress: () => {
            cancelRequest(); 
            setDone(true); 
            setCancelled(true); 
          },   
        },  
        {   
          text: 'No', 
          onPress: () => console.log('No.')
        },  
      ]  
    ); 
  }

  function cancelRequest() {
    console.log("Cancelling this ")
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
            removeFromArray(route.params.item, route.params.activeList); 
          } else {
            alert("Unable to cancel, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url); 
          console.log(e);
        })
    }); 
  };

  if (done && !cancelled) {
    return (
      <View style={styles.entire_request_container}>       
        <View style={styles.individual_req_container}>
          <View style={styles.requester_name_container}>
            <Text style={texts.individual_req_header}>Request Complete!   <Icon name="check" size={35} color="#3ABD24"/></Text>
          </View>
          <Text style={texts.info_header}></Text>
          <Text style={texts.request_details}>Thank you for completing the request! We appreciate your help.</Text>
        </View>    
      </View>
    ); 
  } else if (done && cancelled) {
    return (
      <View style={styles.entire_request_container}>       
        <View style={styles.individual_req_container}>
          <View style={styles.requester_name_container}>
            <Text style={texts.individual_req_header}>Request Cancelled   <Icon name="close" size={35} color="#7F7F7F"/></Text>
          </View>
        </View>    
      </View>
    ); 
  } else {
    return (
      <View style={styles.entire_request_container}>
          <View style={styles.active_header}>
            <Text style={texts.individual_req_header}>Request is in-progress</Text>
          </View>
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
          <TouchableOpacity style={buttons.accept} onPress={() => setModalVisible(true)}>
            <Text style={texts.button_label_white}>Mark Complete ✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttons.reject} onPress={() => cancelConfirm()}>
            <Text style={texts.button_label_red}>Unmatch Request</Text>
          </TouchableOpacity>
         
        {/*modalVisible && <CompleteConfirm modalVisible={setModalVisible} item={route.params.item} setDone={setDone} activeList={route.params.activeList} completeList={route.params.completeList}/>*/}
        {modalVisible && navigation.navigate("Confirm Completion", {navigation: route.params, item: route.params.item, modalVisible: setModalVisible, setDone: setDone, activeList: route.params.activeList, completeList: route.params.completeList})}
      </>
    ); 
  }
}
