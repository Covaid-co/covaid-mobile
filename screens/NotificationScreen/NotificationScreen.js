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
import getDistance from "../../util/distance";
import fetch_a from "../../util/fetch_auth";

export default function NotificationScreen({ route, navigation }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  // const [user, setUser] = useState({});
  // const [userLoc, setUserLoc] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleStart();
    });
    return unsubscribe;
  }, [navigation]);

  // const handleStart1 = async () => {
  //   try {
  //     const idHolder = await AsyncStorage.getItem(storage_keys.SAVE_ID_KEY);
  //     if (idHolder) {
  //       console.log("IDHOLDERNOTIF: " + JSON.stringify(idHolder));
  //       fetchUser(idHolder);
  //     }
  //   } catch (e) {
  //     alert(e);
  //   }
  // };

  const handleStart = async () => {
    try {
      const tokenHolder = await AsyncStorage.getItem(
        storage_keys.SAVE_TOKEN_KEY
      );
      fetchRequests(tokenHolder);
    } catch (e) {
      alert(e);
    }
  };

  // const fetchUser = async (id) => {
  //   const params = { id: id };
  //   var url = generateURL(homeURL + "/api/users/user?", params);

  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         response.json().then((data) => {
  //           console.log(
  //             "THIS IS WHAT IT SHOULD BE SET TO : " + data[0].latlong
  //           );
  //           setUserLoc(data[0].latlong);
  //           console.log("USERLOC: " + data[0].latlong);
  //         });
  //       } else {
  //         // alert("Error obtaining user object");
  //       }
  //     })
  //     .catch((e) => {
  //       alert(e);
  //     });
  // };
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

  async function filterRequests(requests) {
    const pending = [];
    // const idHolder = await AsyncStorage.getItem(storage_keys.SAVE_ID_KEY);
    // if (idHolder) {
    //   console.log("IDHOLDERNOTIF: " + JSON.stringify(idHolder));
    //   fetchUser(idHolder);
    //   console.log("USERLOC: " + userLoc);
    // }
    requests.map((request) => {
      pending.push({
        request_id: request._id,
        details: request.request_info.details,
        requester_name: request.personal_info.requester_name,
        requester_contact:
          request.personal_info.requester_email ||
          request.personal_info.requester_phone,
        resources: request.request_info,
        deadline_date: getDate(request.request_info.date),
        deadline_time: request.request_info.time,
        distance:
          getDistance(
            // userLoc[0],
            // userLoc[1],
            0,
            0,
            request.location_info.coordinates[0],
            request.location_info.coordinates[1]
          ) + " miles away",
        needed_by: request.request_info.date + " " + request.request_info.time,
        timestamp: request.time_posted,
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
    console.log(pendingRequests);
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
                {item.requester_name.split(" ")[0]}{" "}
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
            <Text style={texts.timestamp}>
              {timeSince(new Date(item.timestamp))} ago
            </Text>
            <View style={styles.grow} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* {user ? ( */}
      {pendingRequests[0] ? (
        <FlatList
          keyExtractor={(item, index) => {
            return index.toString();
          }}
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
                  currScreen: "Notification",
                });
              }}
            >
              {displayRequestInfo(item)}
            </TouchableHighlight>
          )}
        />
      ) : (
        <View style={styles.nonewnotifs}>
          <Text style={texts.nonewnotifs}>
            When you receive new requests, messages from your organization, or
            updates from Covaid, you will see them here!
          </Text>
        </View>
      )}
      {/* ) : (
        <Text>Loading...</Text>
      )} */}
    </View>
  );
}
