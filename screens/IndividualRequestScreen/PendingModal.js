import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL, formatDate, translatePayment } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default function PendingModal(props) {
  const [done, setDone] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    var idHolder = AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then(
      (data) => {
        return data;
      }
    );
    var tokenHolder = AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then(
      (data) => {
        return data;
      }
    );
  }, []);

  function handleClose() {
    props.modalVisible(false);
  }

  function acceptConfirm() {
    Alert.alert("Are you sure you want to accept this request?", "", [
      {
        text: "Yes",
        onPress: () => {
          acceptRequest();
          setDone(true);
          setAccepted(true);
        },
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancelled."),
      },
    ]);
  }

  function acceptRequest() {
    let params = {
      ID: props.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/acceptRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      console.log("GETTING TOKEN " + data);
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) {
            //alert("Accepted request.")
            removeFromArray(props.item, props.pendingList);
            props.activeList.push(props.item);
          } else {
            alert("Unable to accept, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url);
          console.log(e);
        });
    });
  }

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
          text: "Reject",
          onPress: () => {
            rejectRequest();
            setDone(true);
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Not rejected"),
        },
      ]
    );
  }

  function rejectRequest() {
    let params = {
      ID: props.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/rejectRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) {
            // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(props.item, props.pendingList);
            //alert("Rejected request.")
          } else {
            alert("Unable to reject, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url);
          console.log(e);
        });
    });
  }

  if (done && accepted) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modal_background}>
          <View style={styles.accepted_modal_view}>
            <View style={styles.header_container}>
              <Text style={texts.individual_req_header}>
                Request Accepted <Icon name="check" size={35} color="#2670FF" />
              </Text>
            </View>
            <Text style={texts.request_details}>
              Thank you for your help! We appreciate your willingness to give
              back.
            </Text>
            <Text></Text>

            <TouchableOpacity style={buttons.back} onPress={handleClose}>
              <Text style={texts.button_label_blue}>Back to Tasks</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </Modal>
    );
  } else if (done & !accepted) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modal_background}>
          <View style={styles.rejected_modal_view}>
            <View style={styles.header_container}>
              <Text style={texts.individual_req_header}>Request Rejected</Text>
            </View>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity style={buttons.back} onPress={handleClose}>
              <Text style={texts.button_label_blue}>Back to Tasks</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modal_background}>
          <View style={styles.pending_modal_view}>
            <TouchableOpacity onPress={handleClose}>
              <Icon
                name="close"
                size={25}
                color="#7F7F7F"
                style={buttons.close}
                onPress={handleClose}
              />
            </TouchableOpacity>

            <View style={styles.header_container}>
              <Text style={texts.individual_req_header}>New Request</Text>
            </View>

            <View style={styles.info_scroll_container}>
              <ScrollView style={styles.info_container}>
                <Text style={texts.info_header}>Information</Text>
                <Text style={texts.request_details}>
                  Email: {props.item.requester_contact_email}
                </Text>
                <Text style={texts.request_details}>
                  Phone: {props.item.requester_contact_phone}
                </Text>
                <Text style={texts.request_details}>
                  Languages: {props.item.languages}
                </Text>

                <Text></Text>
                <Text style={texts.details_header}>Needs:</Text>
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
            </View>

            <Text></Text>
            <TouchableOpacity
              style={buttons.accept}
              onPress={() => acceptConfirm()}
            >
              <Text style={texts.button_label_white}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttons.reject}
              onPress={() => rejectConfirm()}
            >
              <Text style={texts.button_label_red}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
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
