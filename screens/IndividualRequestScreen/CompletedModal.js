import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL } from "../../constants";
import { formatDate, translatePayment } from "../../Helpers";

/**
 * Reset Password modal
 */
export default function CompletedModal(props) {
  function handleClose() {
    props.modalVisible(false);
  }

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

          <Text></Text>
          <Text style={texts.completion_date}>Request completed on</Text>
          <Text style={texts.completion_date}>{formatDate(new Date(props.item.completed_date), "MMMMMM dd, yyyy h:mm TT", false)}</Text>
        </View>

        <TouchableOpacity onPress={handleClose}>
          <Text style={texts.button_label_blue}>Close {"\n"}</Text>
        </TouchableOpacity>
      </Modal>
    </View>
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