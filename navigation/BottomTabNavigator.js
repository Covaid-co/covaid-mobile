import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import TabBarIcon from "../components/TabBarIcon";
import RequestsScreen from "../screens/RequestsScreen/RequestsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import { volunteer_status } from "../constants";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Requests";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
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
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case "Requests":
      return "Requests";
    case "Profile":
      return "Profile";
    case "Notification":
      return "Notifications";
  }
}
