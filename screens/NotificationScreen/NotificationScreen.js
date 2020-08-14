import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { styles, texts } from "./NotificationStyles";
import Colors from "../../public/Colors";
import PendingModal from "../IndividualRequestScreen/PendingModal";
import { fetchPendingRequests } from "../../util/auth_functions";
import { getDate, timeSince } from "../../util/date";

export default function NotificationScreen({ route, navigation }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isPendingModal, setPendingModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleStart();
    });
    return unsubscribe;
  }, [navigation]);

  const handleStart = async () => {
    try {
      const pendings = await fetchPendingRequests(navigation, route);
      if (pendings) {
        filterRequests(pendings);
      }
    } catch (e) {
      alert(e);
    }
  };

  async function filterRequests(requests) {
    const pending = [];
    requests.map((request) => {
      pending.push({
        deadline:
          getDate(request.request_info.date) + " " + request.request_info.time,
        key: 1,
        requester_name: "New Request",
        resources: request.request_info,
        needed_by: request.request_info.date + " " + request.request_info.time,
        lat: parseFloat(request.location_info.coordinates[0]),
        long: parseFloat(request.location_info.coordinates[1]),
        requester_contact_email: request.personal_info.requester_email,
        requester_contact_phone: request.personal_info.requester_phone,
        details: request.request_info.details,
        completed_date: request.status.completed_date || "",
        request_id: request._id,
        languages: request.personal_info.languages,
        payment: request.request_info.payment,
        admin_msg: request.status.volunteers[0].adminMessage,
        timestamp: request.time_posted,
      });
    });
    console.log("setting pendings");
    setPendingRequests(pending.reverse());
    setLoading(false);
  }

  function displayRequestInfo(item) {
    return (
      <View style={styles.screen}>
        <View style={styles.flexrow}>
          <View>
            <View style={styles.flexrow}>
              <View style={styles.dot}></View>
              <Text style={texts.deadline}>Needed by {item.deadline}</Text>
            </View>
            <View style={styles.pleft}>
              <Text style={texts.header}>
                <Text style={texts.need_help}>You have a new request!</Text>
              </Text>
              <View style={styles.resources}>
                <Text style={texts.tasks}>
                  {item.resources.resource_request.slice(0, 2).join(", ")}
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
      {isPendingModal && (
        <PendingModal
          modalVisible={setPendingModal}
          item={currentItem}
          pendingList={pendingRequests}
          fromNotif={true}
        />
      )}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      ) : pendingRequests.length > 0 ? (
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
                setCurrentItem(item);
                setPendingModal(true);
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
    </View>
  );
}
