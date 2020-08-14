import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles, texts } from "./RequestsScreenStyles";
import { volunteer_status } from "../../constants";
import { formatDate } from "../../Helpers";
import {
  fetchPendingRequests,
  fetchActiveRequests,
  fetchCompletedRequests,
  fetchToken,
  updateUser,
} from "../../util/auth_functions";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import PendingModal from "../IndividualRequestScreen/PendingModal";
import ActiveModal from "../IndividualRequestScreen/ActiveModal";
import CompletedModal from "../IndividualRequestScreen/CompletedModal";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
export default function RequestsScreen({ route, navigation }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [currentRequestList, setCurrentRequestList] = useState();
  const [currentRequestType, setCurrentRequestType] = useState(
    route.params.choice
  );
  const [currentItem, setCurrentItem] = useState();

  const requestTypeList = [
    volunteer_status.PENDING,
    volunteer_status.IN_PROGRESS,
    volunteer_status.COMPLETE,
  ];

  const [pendingModalVisible, setPendingModalVisible] = useState(false);
  const [activeModalVisible, setActiveModalVisible] = useState(false);
  const [completedModalVisible, setCompletedModalVisible] = useState(false);
  const [token, setToken] = useState();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  let options = [
    {
      label: "Requires Action",
      value: "Requires Action",
    },
    {
      value: "In Progress",
    },
    {
      value: "Completed",
    },
  ];

  async function fetchAndGenerateAllRequests() {
    try {
      const pendings = await fetchPendingRequests(navigation, route);
      if (pendings) {
        generateRequestList(
          pendings,
          setPendingRequests,
          volunteer_status.PENDING
        );
      }
      const actives = await fetchActiveRequests(navigation, route);
      if (actives) {
        generateRequestList(
          actives,
          setActiveRequests,
          volunteer_status.IN_PROGRESS
        );
      }
      const completeds = await fetchCompletedRequests(navigation, route);
      if (completeds && completeds.length && completeds.length > 0) {
        generateRequestList(
          completeds,
          setCompletedRequests,
          volunteer_status.COMPLETE
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async function saveTokenLocally() {
    try {
      const token = await fetchToken();
      if (token) {
        console.log("HANDLING AUTH WITH TOKENHOLDER");
        setToken(token);
      } else {
        console.log("no token exists...log out?");
      }
    } catch (err) {
      throw err;
    }
  }
  useEffect(() => {
    setPendingModalVisible(route.params.pendingModalVisible);
    saveTokenLocally();
    setCurrentItem(route.params.currentItem);
    const unsubscribe = navigation.addListener("focus", () =>
      fetchAndGenerateAllRequests()
    );
    navigation.setOptions = {
      title: "Chat",
      headerStyle: { backgroundColor: "red" },
      headerTitleStyle: { color: "green" },
    };

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
        fetchAndGenerateAllRequests();
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        fetchAndGenerateAllRequests();
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      unsubscribe();
    };
  }, [navigation]);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if (!token || token.length === 0) {
        console.log("\nupdating user push token...\n\n");
        updateUserPushToken(token);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  if (route.params.choice !== currentRequestType) {
    if (route.params.choice == volunteer_status.COMPLETE) {
      setCurrentRequestList(completedRequests);
      setCurrentRequestType(volunteer_status.COMPLETE);
    } else if (route.params.choice == volunteer_status.IN_PROGRESS) {
      setCurrentRequestList(activeRequests);
      setCurrentRequestType(volunteer_status.IN_PROGRESS);
    } else {
      setCurrentRequestList(pendingRequests);
      setCurrentRequestType(volunteer_status.PENDING);
    }
  }

  const updateUserPushToken = async (pushToken) => {
    try {
      const tokenHolder = await fetchToken();
      const params = {
        pushToken: pushToken,
      };
      await updateUser(params);
    } catch (e) {
      throw e;
    }
  };

  function generateRequestList(requestData, requestStateChanger, reqStatus) {
    let tempList = [];
    for (var i = 0; i < requestData.length; i++) {
      var element = {
        status: requestData[i].status.currentStatus,
        key: i,
        requester_name: requestData[i].personal_info.requester_name,
        resources: requestData[i].request_info,
        needed_by:
          requestData[i].request_info.date +
          " " +
          requestData[i].request_info.time,
        lat: parseFloat(requestData[i].location_info.coordinates[0]),
        long: parseFloat(requestData[i].location_info.coordinates[1]),
        requester_contact_email: requestData[i].personal_info.requester_email,
        requester_contact_phone: requestData[i].personal_info.requester_phone,
        details: requestData[i].request_info.details,
        completed_date: requestData[i].status.completed_date || "",
        request_id: requestData[i]._id,
        languages: requestData[i].personal_info.languages,
        payment: requestData[i].request_info.payment,
        admin_msg: requestData[i].status.volunteers[0].adminMessage,
      };
      tempList.push(element);
    }

    if (requestData.length !== 0 && reqStatus === currentRequestType) {
      setCurrentRequestList(tempList);
      setCurrentRequestType(reqStatus);
    }
    requestStateChanger(tempList);
    return tempList;
  }

  if (pendingRequests) {
    return (
      <View style={styles.req_container_original}>
        {displayAllRequests(currentRequestList)}
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
  function displayAllRequests(reqList) {
    if (reqList && reqList.length === 0) {
      return (
        <>
          <View style={styles.container}>
            <View style={styles.center}>
              <View style={styles.no_request}>
                <Text style={texts.no_request_text}>
                  {getEmptyMessage(currentRequestType)}
                </Text>
              </View>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.req_container}>
            {pendingModalVisible && (
              <PendingModal
                modalVisible={setPendingModalVisible}
                item={currentItem}
                pendingList={pendingRequests}
                activeList={activeRequests}
                // volunteer={user}
              />
            )}
            {activeModalVisible && (
              <ActiveModal
                modalVisible={setActiveModalVisible}
                item={currentItem}
                activeList={activeRequests}
                completeList={completedRequests}
                // volunteer={user}
              />
            )}
            {completedModalVisible && (
              <CompletedModal
                modalVisible={setCompletedModalVisible}
                item={currentItem}
              />
            )}
            {currentRequestList ? (
              <FlatList
                data={currentRequestList || reqList || pendingRequests}
                contentContainerStyle={styles.center}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={getContainerType(currentRequestType)}
                    onPress={() => {
                      setCurrentItem(item);
                      if (
                        currentRequestType == volunteer_status.PENDING ||
                        currentRequestType == null
                      ) {
                        setPendingModalVisible(true);
                        setActiveModalVisible(false);
                        setCompletedModalVisible(false);
                      } else if (
                        currentRequestType == volunteer_status.IN_PROGRESS
                      ) {
                        setPendingModalVisible(false);
                        setActiveModalVisible(true);
                        setCompletedModalVisible(false);
                      } else if (
                        currentRequestType == volunteer_status.COMPLETE
                      ) {
                        setPendingModalVisible(false);
                        setActiveModalVisible(false);
                        setCompletedModalVisible(true);
                      }
                    }}
                  >
                    {displayRequestInfo(currentRequestType, item)}
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.container}>
                <View style={styles.center}>
                  <View style={styles.no_request}>
                    <Text style={texts.no_request_text}>
                      {getEmptyMessage(currentRequestType)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </>
      );
    }
  }

  function getContainerType(reqType) {
    if (reqType == volunteer_status.IN_PROGRESS) {
      return styles.request_active;
    } else if (reqType == volunteer_status.COMPLETE) {
      return styles.request_completed;
    } else {
      return styles.request_pending;
    }
  }

  function getEmptyMessage(reqType) {
    if (reqType == volunteer_status.IN_PROGRESS) {
      return "No tasks in-progress";
    } else if (reqType == volunteer_status.COMPLETE) {
      return "No completed tasks";
    } else {
      return "No tasks requiring action";
    }
  }

  function displayRequestInfo(reqType, item) {
    if (reqType == volunteer_status.PENDING) {
      return (
        <>
          <View style={{ flexDirection: "col" }}>
            <Text style={texts.request_name_text}>New Request</Text>
            <Text style={texts.request_date_text}>
              Due{" "}
              {formatDate(
                new Date(item.needed_by.split(" ")[0]),
                "MMM d",
                true
              )}
              {"   "}
              {displayRequestIcon(reqType)}
            </Text>
          </View>

          <Text style={texts.request_resource_text}>
            {item.resources.resource_request.join(", ")}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <View style={{ flexDirection: "col" }}>
            <Text style={texts.request_name_text}>{item.requester_name}</Text>
            <Text style={texts.request_date_text}>
              Due{" "}
              {formatDate(
                new Date(item.needed_by.split(" ")[0]),
                "MMM d",
                true
              )}{" "}
              {displayRequestIcon(reqType)}
            </Text>
          </View>

          <Text style={texts.request_resource_text}>
            {item.resources.resource_request.join(", ")}
          </Text>
        </>
      );
    }
  }

  function displayRequestIcon(reqType) {
    if (reqType == volunteer_status.IN_PROGRESS) {
      return <Icon name="clock" size={15} color="#DB9327" />;
    } else if (reqType == volunteer_status.COMPLETE) {
      return <Icon name="check" size={15} color="#3ABD24" />;
    } else {
      return <Icon name="exclamation" size={15} color="#FF5924" />;
    }
  }
}
