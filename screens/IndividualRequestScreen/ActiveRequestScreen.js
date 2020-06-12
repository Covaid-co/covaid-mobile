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
import CompleteConfirm from "../../components/CompleteConfirm/CompleteConfirm.js";

export default function ActiveRequestScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [done, setDone] = useState(false); 

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
            alert("Cancelled request.")
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

  return (
    <View style={styles.entire_request_container}>
        <View style={styles.active_header}>
          <Text style={texts.individual_req_header}>Request is in-progress</Text>
        </View>
        <View style={styles.individual_req_container}>
          <View>
            <Text style={texts.individual_req_header}>{route.params.item.requester_name}</Text>
          </View>
          <Text style={texts.info_header}>Information</Text>
          <Text style={texts.request_details}>Email: DISPLAY EMAIL </Text>
          <Text style={texts.request_details}>Phone: DISPLAY PHONE </Text>
          <Text style={texts.request_details}>Languages: DISPLAY LANGUAGES</Text>

          <Text></Text>
          <Text style={texts.details_header}>Needs:</Text>
          <Text style={texts.request_details}>SHOW RESOURCES</Text>

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
          <Text style={texts.request_details}>DISPLAY REIMBURSEMENT HERE</Text>
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
              <Text style={texts.button_label_gray}>Complete Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.disabled}>
              <Text style={texts.button_label_gray}>Cancel Request</Text>
            </TouchableOpacity>
          </View>
          {modalVisible && <CompleteConfirm modalVisible={setModalVisible} item={route.params.item} setDone={setDone} activeList={route.params.activeList} completeList={route.params.completeList}/>}
        </View>
      );       
    } else {
      return (
        <View style={styles.container2}>
          <View>
            <TouchableOpacity style={buttons.accept} onPress={() => setModalVisible(true)}>
              <Text style={texts.button_accept_label}>Complete this request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.reject} onPress={() => cancelConfirm()}>
              <Text style={texts.button_reject_label}>Cancel this request</Text>
            </TouchableOpacity>
          </View>
          {/*modalVisible && <CompleteConfirm modalVisible={setModalVisible} item={route.params.item} setDone={setDone} activeList={route.params.activeList} completeList={route.params.completeList}/>*/}
          {modalVisible && navigation.navigate("Complete Confirm", {navigation: route.params, item: route.params.item, modalVisible: setModalVisible, setDone: setDone, activeList: route.params.activeList, completeList: route.params.completeList})}
        </View>
      ); 
    }
  }
}
