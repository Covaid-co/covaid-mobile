import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { formatDate, translatePayment } from "../../Helpers";

export default function CompletedRequestScreen({ route, navigation }) {
  useEffect(() => { 
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => { return data; });
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => { return data; });   
  }, []);
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
        <Text style={texts.request_details}>{route.params.item.resources.resource_request}</Text>
        
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

        <Text></Text>
        <Text style={texts.completion_date}>Request aaaaaacompleted on</Text>
        <Text style={texts.completion_date}>{formatDate(new Date(route.params.item.completed_date), "MMMMMM dd, yyyy h:mm TT", false)}</Text>
      </View>
    </View>
  );  
}
