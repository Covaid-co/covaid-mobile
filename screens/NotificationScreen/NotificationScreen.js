import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList,
  AsyncStorage,
} from "react-native";
import {
  styles,
  texts,
} from "../../components/Notifications/NotificationStyles";
import Colors from "../../public/Colors";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import getDistance from "../../util/distance";
import fetch_a from "../../util/fetch_auth";

export default function NotificationScreen({ route, navigation }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);

  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetch_user_obj(route.params.userID);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
          });
        } else {
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  function generateRequestList(requestData, requestStateChanger) {
    let tempList = [];
    console.log(user);
    for (var i = 0; i < requestData.length; i++) {
      var element = {
        key: i,
        requester_name: requestData[i].personal_info.requester_name,
        resources: requestData[i].request_info,
        needed_by:
          requestData[i].request_info.date +
          " " +
          requestData[i].request_info.time,
        distance:
          getDistance(
            user.latlong[0],
            user.latlong[1],
            requestData[i].location_info.coordinates[0],
            requestData[i].location_info.coordinates[1]
          ) + " m", //requestData[i].location_info.coordinates[0] + ", " + requestData[i].location_info.coordinates[1],
        requester_contact:
          requestData[i].personal_info.requester_email ||
          requestData[i].personal_info.requester_phone,
        details: requestData[i].request_info.details,
        completed_date: requestData[i].status.completed_date || "",
        request_id: requestData[i]._id,
      }; // add any relevant information
      tempList.push(element);
    }
    requestStateChanger(tempList);
    //initializes the current request list to "pending". Otherwise the list of requests dont pop up initially
    return tempList;
  }

  function fetchRequests(reqStatus, requestStateChanger, token) {
    let params = { status: reqStatus };
    var url = generateURL(homeURL + "/api/request/volunteerRequests?", params);

    fetch_a(token, "token", url, {
      method: "get",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setTimeout(function () {
              generateRequestList(data, requestStateChanger);
            }, 750);
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
    let arr = d.toDateString().split(" ");
    let s = "";
    s += arr[1];
    s += " ";
    s += arr[2];
    return s;
  };

  function displayRequestInfo(reqType, item) {
    var resourceBadges = ``;
    var date = getDate(item.needed_by.split(" ")[0]);
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={texts.deadline}>Due {date}</Text>
            <Text style={texts.header}>
              {item.requester_name.split(" ")[0]} needs your help
            </Text>
            <View style={{ marginTop: 6, flexDirection: "row" }}>
              <Text style={texts.tasks}>
                {item.resources.resource_request.join(", ")}
              </Text>
              <View style={styles.dot}></View>
              <Text style={texts.distance}>{item.distance}</Text>
            </View>
          </View>
          <View style={{ flexGrow: 1 }} />

          <View style={{ alignItems: "flex-end" }}>
            <Text style={texts.timestamp}>1h ago</Text>
            <View style={{ flexGrow: 1 }} />
            <Text>></Text>
          </View>
        </View>

        {/* <Text style={texts.details}>{item.details}</Text> */}
        {/*<Text style={texts.request_text}><Text style={texts.request_label}>Request resources: </Text>{dom}</Text>*/}
      </>
    );
  }
  if (user.latlong) {
    console.log(user.latlong);
    return (
      <View>
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
                  activeList: activeRequests,
                });
              }}
            >
              {displayRequestInfo(volunteer_status.PENDING, item)}
            </TouchableHighlight>
          )}
        />
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}
