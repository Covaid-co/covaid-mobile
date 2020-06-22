import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Alert,
} from "react-native";
import getDistance from '../../util/distance'
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL, formatDate, translatePayment } from "../../Helpers";
import fetch_a from '../../util/fetch_auth'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ConfirmCompleteModal from "../../components/CompleteConfirm/ConfirmCompleteModal";

export default function ActiveModal(props) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [done, setDone] = useState(false); 
  const [cancelled, setCancelled] = useState(false); 

  function handleClose() {
    props.modalVisible(false);
  }

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
      ID: props.item.request_id,
    };

    var url = generateURL(homeURL + "/api/request/rejectRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { 
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) { // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(props.item, props.activeList); 
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
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={false}>
        <View style={styles.individual_req_container}>
          <View style={styles.requester_name_container}>
              <Text style={texts.individual_req_header}>Request Complete!   <Icon name="check" size={35} color="#3ABD24"/></Text>
            </View>
            <Text style={texts.info_header}></Text>
            <Text style={texts.request_details}>Thank you for completing the request! We appreciate your help.</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={texts.button_label_blue}>Close {"\n"}</Text>
          </TouchableOpacity>  
        </View>          
      </Modal>
    </View>
    ); 
  } else if (done && cancelled) {
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={false}>
        <View style={styles.individual_req_container}>
          <View style={styles.requester_name_container}>
            <Text style={texts.individual_req_header}>Request Cancelled   <Icon name="close" size={35} color="#7F7F7F"/></Text>
          </View>
          <TouchableOpacity onPress={handleClose}>
            <Text style={texts.button_label_blue}>Close {"\n"}</Text>
          </TouchableOpacity>  
        </View>          
      </Modal>
    </View>
    ); 
  } else {
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={false}>
        <View>
          <View style={styles.requester_name_container}>
            <Text style={texts.individual_req_header}>{props.item.requester_name}</Text>
          </View>
        </View>

          <View style={styles.info_container}>
            <Text style={texts.info_header}>Information</Text>
            <Text style={texts.request_details}>Email: {props.item.requester_contact_email}</Text>
            <Text style={texts.request_details}>Phone: {props.item.requester_contact_phone}</Text>
            <Text style={texts.request_details}>Languages: {props.item.languages}</Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Needs:</Text>
            {showResourceBadges(props.item.resources.resource_request)}
  
            <Text style={texts.details_header}>Details</Text>
            <Text style={texts.request_details}>{props.item.details}</Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Needed by</Text>
            <Text style={texts.request_details}>
              {props.item.needed_by.split(" ")[1]} of {formatDate(new Date(props.item.needed_by.split(" ")[0]), "MMMMMMMMMM dd, yyyy", false)}
            </Text>
  
            <Text></Text>
            <Text style={texts.details_header}>Reimbursement</Text>
            <Text style={texts.request_details}>{translatePayment(props.item.payment)}</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={texts.button_label_blue}>Close {"\n"}</Text>
            </TouchableOpacity>

            <Text></Text><Text></Text><Text></Text>
            <TouchableOpacity style={buttons.accept} onPress={() => setConfirmModalVisible(true)}>
              <Text style={texts.button_label_white}>Mark Complete ✓</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttons.reject} onPress={() => cancelConfirm()}>
              <Text style={texts.button_label_red}>Unmatch Request</Text>
            </TouchableOpacity>

            {confirmModalVisible && <ConfirmCompleteModal modalVisible={setConfirmModalVisible} item={props.item} setDone={setDone} activeList={props.activeList} completeList={props.completeList}/>}
    
          </View>

        </Modal>
      </View>
    );
  }
}

function showResourceBadges(resources) {
  return (
    <>
      <FlatList
        data={resources}
        horizontal={false}
        numColumns={3}
        contentContainerStyle={styles.center}
        renderItem={({item}) => 
          <>
            <View style={styles.resource_badge}>
              <Text style={texts.resource_text}>{item}</Text>
            </View>
          </>
        }
        keyExtractor={(item, index) => index}
        /> 
    </>
  )
}
