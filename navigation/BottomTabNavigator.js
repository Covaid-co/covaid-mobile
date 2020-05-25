import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import RequestsScreen from "../screens/RequestsScreen/RequestsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Requests";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  //navigation.setOptions({ headerTitle: "Covaid"});

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {/* <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Get Started",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
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
            <TabBarIcon focused={focused} name = "md-home"/>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name = "md-person"/>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    // case "Home":
    //   return "How to get started";
    // case "Links":
    //   return "Links to learn more";
    case "Requests":
    return "Requests";
    case "Profile":
    return "Profile";
    case "Notification":
    return "Notifications";
  }
}
