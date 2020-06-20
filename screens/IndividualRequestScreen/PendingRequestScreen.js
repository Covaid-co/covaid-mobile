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
import { styles, buttons, texts } from "./IndividualRequestScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";

export default function PendingRequestScreen({ route, navigation }) {
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

  function acceptRequest() {
    const params = {
      ID: route.params.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/acceptRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) {
            alert("Accepted request.");
            removeFromArray(route.params.item, route.params.pendingList);
            route.params.activeList.push(route.params.item);
          } else {
            alert("Unable to accept, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
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

  function rejectRequest() {
    const params = {
      ID: route.params.item.request_id,
    };
    var url = generateURL(homeURL + "/api/request/rejectRequest?", params);

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) {
            // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(route.params.item, route.params.pendingList);
            alert("Rejected request.");
          } else {
            alert("Unable to reject, please email us at covaidco@gmail.com.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  return (
    <View>
      <View style={styles.container3}>
        <Text style={texts.desc}>This request is pending!</Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Who: </Text>{" "}
          {route.params.item.requester_name}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Contact:</Text>{" "}
          {route.params.item.requester_contact}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Details: </Text> {route.params.item.details}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Requesting support with: </Text>{" "}
          {route.params.item.resources.resource_request.join(", ")}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Needed by: </Text>{" "}
          {route.params.item.needed_by}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Distance: </Text>{" "}
          {route.params.item.distance}
        </Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.row}>
          <TouchableOpacity
            style={buttons.accept}
            onPress={() => acceptRequest()}
          >
            <Text style={texts.button_label_green}>Accept Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttons.reject}
            onPress={() => rejectRequest()}
          >
            <Text style={texts.button_label_red}>Reject Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
