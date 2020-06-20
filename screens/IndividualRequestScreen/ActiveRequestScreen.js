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

export default function ActiveRequestScreen({ route, navigation }) {
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

  function completeRequest() {
    const form = {
      reason: "fake reason",
      adminMode: true,
    };
    const params = {
      ID: route.params.item.request_id,
    };

    var url = generateURL(homeURL + "/api/request/completeRequest?", params);

    // TODO: remove useless token string

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      fetch_a(data, "token", url, {
        method: "put",
      })
        .then((response) => {
          if (response.ok) {
            // TODO: Move it from pending to active on RequestsScreen
            removeFromArray(route.params.item, route.params.activeList);
            route.params.completeList.push(route.params.item);
            alert("Marked complete.");
          } else {
            alert("Unable to complete, please email us at covaidco@gmail.com.");
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

  function cancelRequest() {
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
            removeFromArray(route.params.item, route.params.activeList);
            alert("Cancelled request.");
          } else {
            alert("Unable to cancel, please email us at covaidco@gmail.com.");
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
        <Text style={texts.desc}>
          Thanks for accepting this request for support! Please reach out to the
          requester by using the contact information below.
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Who: </Text>{" "}
          {route.params.item.requester_name}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Contact: </Text>
          {route.params.item.requester_contact}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Details: </Text>
          {route.params.item.details}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Requesting support with: </Text>
          {route.params.item.resources.resource_request.join(", ")}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Needed by: </Text>
          {route.params.item.needed_by}
        </Text>
        <Text style={texts.desc}>
          <Text style={texts.label}>Distance: </Text>
          {route.params.item.distance}
        </Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.row}>
          <TouchableOpacity
            style={buttons.accept}
            onPress={() => completeRequest()}
          >
            <Text style={texts.button_label_green}>Complete Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttons.reject}
            onPress={() => cancelRequest()}
          >
            <Text style={texts.button_label_red}>Cancel Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
