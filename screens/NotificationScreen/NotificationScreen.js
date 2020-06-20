import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  FlatList,
} from "react-native";
import { styles, texts } from "./NotificationStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";

export default function NotificationScreen({ route, navigation }) {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        console.log("DATA: " + data);
        fetchRequests(data);
      });
    });
  }, [navigation]);

  function timeSince(date) {
    console.log("DATE: " + date);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  function filterRequests(requests) {
    const pending = [];
    requests.map((request) => {
      pending.push({
        key: request._id,
        name: request.personal_info.requester_name,
        resources: request.request_info,
        deadline_date: getDate(request.request_info.date),
        deadline_time: request.request_info.time,
        timestamp: timeSince(new Date(Date.now() - request.time_posted)),
      });
    });
    setPendingRequests(pending);
  }

  function fetchRequests(token) {
    const params = { status: volunteer_status.PENDING };
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);

    fetch_a(token, "token", url, {
      method: "get",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            filterRequests(data);
          });
        } else {
          console.log("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const getDate = (date) => {
    var d = new Date(date);
    const arr = d.toDateString().split(" ");
    let s = "";
    s += arr[1];
    s += " ";
    s += arr[2];
    return s;
  };

  function displayRequestInfo(item) {
    return (
      <View style={styles.screen}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.dot}></View>
              <Text style={texts.deadline}>Needed by {item.deadline_date}</Text>
            </View>
            <View style={{ paddingLeft: 23 }}>
              <Text style={texts.header}>
                {item.name.split(" ")[0]}{" "}
                <Text style={texts.need_help}>needs your help</Text>
              </Text>
              <View style={styles.resources}>
                <Text style={texts.tasks}>
                  {item.resources.resource_request.join(", ")}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.grow} />
          <View style={styles.rhs}>
            <Text style={texts.timestamp}>{item.timestamp}</Text>
            <View style={styles.grow} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={pendingRequests}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor="#F3F5F9"
            style={styles.container}
            onPress={() => {
              navigation.navigate("Pending Request", {
                navigation: route.params,
                item: item,
                pendingList: pendingRequests,
              });
            }}
          >
            {displayRequestInfo(item)}
          </TouchableHighlight>
        )}
      />
    </View>
  );
}
