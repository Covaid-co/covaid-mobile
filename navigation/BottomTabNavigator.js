import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";

import { styles } from "../screens/RequestsScreen/RequestsScreenStyles";

import TabBarIcon from "../components/TabBarIcon";
import RequestsScreen from "../screens/RequestsScreen/RequestsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import { Dropdown } from "react-native-material-dropdown-v2";
import Colors from "../public/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Requests";

export default function BottomTabNavigator({ navigation, route }) {
  const [choice, setChoice] = useState(0); // changes here are reflected on requests screen

  navigation.setOptions({
    headerTitle: getHeaderTitle(route, setChoice, choice),
    headerRight: () => (
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.navigate("Settings", route.params)}
      >
        <TabBarIcon name="md-settings" />
      </TouchableOpacity>
    ),
    headerLeft: null,
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
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
        initialParams={{ choice: choice, wtf: "bitch" }}
        // initialParams={route.params}
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

  function getHeaderTitle(route, setChoice, choice) {
    const routeName =
      route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    const options2 = [
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
    switch (routeName) {
      case "Requests":
        return () => (
          <View style={styles.dropdown_container}>
            <Dropdown
              label=" "
              data={options2}
              dropdownPosition={-4}
              style={styles.dropdown_style2}
              value={"Requires Action"}
              defaultValue={"Requires Action"}
              labelFontSize={16}
              fontSize={16}
              inputContainerStyle={{ borderBottomColor: "transparent" }}
              textColor={Colors.grey_font}
              useNativeDriver={true}
              onChangeText={(label, value) => {
                if (value === "Requires Action") {
                  setChoice(0);
                  navigation.navigate("Requests", { choice: 0 });
                } else {
                  setChoice(value);
                  navigation.navigate("Requests", { choice: value });
                }
              }}
            />
          </View>
        );
      case "Profile":
        return "Profile";
      case "Notification":
        return "Notifications";
    }
  }
}
