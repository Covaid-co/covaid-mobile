import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { formatDate, translatePayment } from "../../Helpers";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default function CompletedModal(props) {
  function handleClose() {
    props.modalVisible(false);
  }

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modal_background}>
        <View style={styles.completed_modal_view}>
          <View
            style={{
              ...styles.header_container,
              flex: 1,
              flexDirection: "row",
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            <Text style={{ ...texts.individual_req_header, flex: 1 }}>
              {props.item.requester_name}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "flex-start" }}
              onPress={() => {
                handleClose();
              }}
            >
              <Icon
                name="close"
                size={32}
                color="#7F7F7F"
                style={buttons.close}
                onPress={() => {
                  handleClose();
                }}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.info_container}>
            <Text style={texts.info_header}>Needs</Text>
            {showResourceBadges(props.item.resources.resource_request)}

            <Text></Text>
            <Text style={texts.details_header}>Details</Text>
            <Text style={texts.request_details}>{props.item.details}</Text>

            <Text></Text>
            <Text style={texts.details_header}>
              Message from your mutual aid group
            </Text>
            <Text style={texts.request_details}>
              {props.item.admin_msg || "None"}
            </Text>

            <Text></Text>
            <Text style={texts.details_header}>Needed by</Text>
            <Text style={texts.request_details}>
              {props.item.needed_by.split(" ")[1]} of{" "}
              {formatDate(
                new Date(props.item.needed_by.split(" ")[0]),
                "MMMMMMMMMM dd, yyyy",
                false
              )}
            </Text>

            <Text></Text>
            <Text style={texts.details_header}>Reimbursement</Text>
            <Text style={texts.request_details}>
              {translatePayment(props.item.payment)}
            </Text>
          </ScrollView>
          <View style={styles.complete_date_container}>
            <Text style={texts.completion_date}>Request completed on</Text>
            <Text style={texts.completion_date}>
              {formatDate(
                new Date(props.item.completed_date),
                "MMMMMM dd, yyyy h:mm TT",
                false
              )}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function showResourceBadges(resources) {
  return (
    <>
      <View style={styles.flex_container}>
        {resources.map((prop, key) => {
          return (
            <View key={key} style={styles.resource_badge}>
              <Text style={texts.resource_text}>{prop}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
}
