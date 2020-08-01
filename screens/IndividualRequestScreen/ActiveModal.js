import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Alert,
  ScrollView,
} from "react-native";
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL, formatDate, translatePayment } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import ConfirmModal from "./ConfirmModal";

export default function ActiveModal(props) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  function handleClose() {
    props.modalVisible(false);
  }

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

  function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function cancelConfirm() {
    Alert.alert("Are you sure you want to unmatch?", "This cannot be undone.", [
      {
        text: "Unmatch me",
        onPress: () => {
          cancelRequest();
          setDone(true);
          setCancelled(true);
        },
      },
      {
        text: "Go Back",
        onPress: () => console.log("No."),
      },
    ]);
  }

  function cancelRequest() {
    console.log("Cancelling this ");
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
            removeFromArray(props.item, props.activeList);
          } else {
            alert("Unable to cancel, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(url);
          console.log(e);
        });
    });
  }

  if (done && !cancelled) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modal_background}>
          <View style={styles.done_req_modal_view}>
            <View style={styles.header_container}>
              <Text style={texts.individual_req_header}>
                Request Complete!{" "}
                <Icon name="check" size={35} color="#3ABD24" />
              </Text>
            </View>
            <Text style={texts.request_details}>
              Thank you for completing the request! We appreciate your help.
            </Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity style={buttons.back} onPress={handleClose}>
              <Text style={texts.button_label_blue}>Back to Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else if (done && cancelled) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modal_background}>
          <View style={styles.rejected_modal_view}>
            <View style={styles.header_container}>
              <Text style={texts.individual_req_header}>
                Request Cancelled{" "}
                <Icon name="close" size={35} color="#7F7F7F" />
              </Text>
            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity style={buttons.back} onPress={handleClose}>
              <Text style={texts.button_label_blue}>Back to Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modal_background}>
          <View style={styles.active_modal_view}>
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
              <Text style={texts.individual_req_header}>
                {props.item.requester_name}
              </Text>
            </View>

            <View style={styles.info_container}>
              {/* <ScrollView style={styles.info_container}> */}
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
              <Text style={texts.details_header}>Needs</Text>
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
              {/* </ScrollView> */}
            </View>

            <Text></Text>
            <TouchableOpacity
              style={buttons.accept}
              onPress={() => setConfirmModalVisible(true)}
            >
              <Text style={texts.button_label_white}>Mark Complete ✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttons.reject}
              onPress={() => cancelConfirm()}
            >
              <Text style={texts.button_label_red}>Unmatch Request</Text>
            </TouchableOpacity>

            {confirmModalVisible && (
              <ConfirmModal
                modalVisible={setConfirmModalVisible}
                item={props.item}
                setDone={setDone}
                activeList={props.activeList}
                completeList={props.completeList}
              />
            )}
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
