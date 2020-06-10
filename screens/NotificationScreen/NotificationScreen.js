import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
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

  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetch_user_obj(route.params.userID);

      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        console.log("DATA: " + data);
        fetchRequests(volunteer_status.PENDING, setPendingRequests, data);
        fetchRequests(volunteer_status.IN_PROGRESS, setActiveRequests, data);
      });
    });
  }, []);
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
            0,
            0,
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

  return (
    <View>
      <FlatList
        data={pendingRequests}
        contentContainerStyle={styles.center}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.request}
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function displayRequestInfo(reqType, item) {
  var resourceBadges = ``;
  return (
    <>
      <Text style={texts.request_text}>{item.needed_by}</Text>
      <Text style={texts.request_text}>{item.distance}</Text>

      <Text style={texts.request_title}>{item.requester_name}</Text>
      <Text style={texts.request_text}>
        <Text style={texts.request_label}>Request resources: </Text>
        {item.resources.resource_request.join(", ")}
      </Text>
      {/*<Text style={texts.request_text}><Text style={texts.request_label}>Request resources: </Text>{dom}</Text>*/}
    </>
  );
}
