import React, { useState, useEffect } from "react";
import { ActionSheetIOS, Button } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Text,
} from "react-native";

import { styles, texts } from "../screens/RequestsScreen/RequestsScreenStyles";
import TabBarIcon from "../components/TabBarIcon";
import RequestsScreen from "../screens/RequestsScreen/RequestsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import Colors from "../public/Colors";
import { Dropdown } from "react-native-material-dropdown-v2";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Requests";

export default function BottomTabNavigator({ navigation, route }) {
  const [choice, setChoice] = useState(0); // changes here are reflected on requests screen
  const options = ["Requires Action", "In Progress", "Completed"];

  navigation.setOptions({
    headerTitle: getHeaderTitle(route, setChoice, choice),
    headerRight: () => (
      <TouchableOpacity
        style={{
          flex: 1,
          marginTop: 6,
          marginRight: 18,
        }}
        onPress={() => navigation.navigate("Settings", route.params)}
      >
        <TabBarIcon name="md-settings" />
      </TouchableOpacity>
    ),
    headerLeft: null,
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.blue,
        inactiveTintColor: Colors.light_grey_font,
        style: {
          height: "11.5%",
          paddingTop: "3%",
          borderTopWidth: 1,
          borderTopColor: Colors.grey,
        },
      }}
    >
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        initialParams={route.params}
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-notifications" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Requests"
        component={RequestsScreen}
        initialParams={(route.params, { choice: choice })}
        options={{
          title: "Requests",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          ),
          gesturesEnabled: false,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={route.params}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );

  c;

  function getHeaderTitle(route, setChoice, choice) {
    let options2 = [
      {
        // label: 'Requires Action',
        value: "Requires Action",
      },
      {
        value: "In Progress",
      },
      {
        value: "Completed",
      },
    ];
    const routeName =
      route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    switch (routeName) {
      case "Requests":
        return () => (
          <View>
            {Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={() =>
                  ActionSheetIOS.showActionSheetWithOptions(
                    {
                      options: ["Cancel", ...options],
                      cancelButtonIndex: 0,
                      tintColor: Colors.blue,
                    },
                    (buttonIndex) => {
                      if (buttonIndex === 0) {
                        // cancel
                      } else {
                        setChoice(buttonIndex - 1);
                        navigation.navigate("Requests", {
                          choice: buttonIndex - 1,
                        });
                      }
                    }
                  )
                }
              >
                <Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: Colors.grey_font,
                      // color: colors[choice],
                      fontWeight: "600",
                      fontFamily: "Inter-bold",
                    }}
                  >
                    {options[choice]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.grey_font,
                    }}
                  >
                    {"  "}▼
                  </Text>
                </Text>
              </TouchableOpacity>
            ) : (
              <Dropdown
                label=" "
                data={options2}
                dropdownPosition={-4}
                style={styles.dropdown_style2}
                value={options[choice]}
                defaultValue={"Requires Action"}
                labelFontSize={16}
                fontSize="20"
                textColor={Colors.grey_font}
                onChangeText={(label, value) => {
                  setChoice(value);
                  navigation.navigate("Requests", { choice: value });
                }}
              />
            )}
          </View>
        );
      case "Profile":
        return (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              fontFamily: "Inter-bold",
              color: Colors.grey_font,
            }}
          >
            Profile
          </Text>
        );
      case "Notification":
        return (
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              fontFamily: "Inter-bold",
              color: Colors.grey_font,
            }}
          >
            Notifications
          </Text>
        );
    }
  }
}
