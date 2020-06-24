import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { formatDate, translatePayment } from "../../Helpers";
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function CompletedModal(props) {
  function handleClose() {
    props.modalVisible(false);
  }

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modal_background}>
          <View style={styles.completed_modal_view}>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close" size={25} color="#7F7F7F" style={buttons.close} onPress={handleClose}/>
            </TouchableOpacity>
            
            <View style={styles.header_container}>
              <Text style={texts.individual_req_header}>{props.item.requester_name} </Text>
            </View>
            
            <View style={styles.info_container}>
              <Text></Text>
              <Text style={texts.details_header}>Needs:</Text>
              {showResourceBadges(props.item.resources.resource_request)}
              
              <Text></Text>
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
            </View>

            <View style={styles.complete_date_container}>
              <Text></Text>
              <Text style={texts.completion_date}>Request completed on</Text>
              <Text style={texts.completion_date}>{formatDate(new Date(props.item.completed_date), "MMMMMM dd, yyyy h:mm TT", false)}</Text>
            </View>            
          </View>        
      </View>
    </Modal>

  );
}

function showResourceBadges(resources) {
  return (
    <>
      <FlatList
        data={resources}
        horizontal={false}
        numColumns={3}
        contentContainerStyle={styles.center}
        style={styles.list_style}
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
