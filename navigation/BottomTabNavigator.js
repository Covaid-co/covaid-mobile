import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Text
} from "react-native";

import { styles, texts } from "../screens/RequestsScreen/RequestsScreenStyles";

import TabBarIcon from "../components/TabBarIcon";
import RequestsScreen from "../screens/RequestsScreen/RequestsScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import { volunteer_status, storage_keys } from "../constants";
import { Dropdown } from 'react-native-material-dropdown';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Requests";

export default function BottomTabNavigator({ navigation, route }) {
  const [choice, setChoice] = useState(1); // changes here are reflected on requests screen 

  navigation.setOptions({
    headerTitle: getHeaderTitle(route, setChoice),
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
        initialParams={{"choice": choice, "wtf": "bitch"}}
        //initialParams={route.params}
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


function getHeaderTitle(route, setChoice) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    let options2 = [{
      // label: 'Requires Action',
      value: 'Requires Action',
    }, {
      value: 'In Progress',
    }, {
      value: 'Completed',
    }];
  switch (routeName) {
    case "Requests":
      return () => (<TouchableOpacity style={{ margin: 10 }}>
         
         <Dropdown
            label=''
            data={options2} 
            dropdownPosition = {-4}
            style={styles.dropdown_style2}
            textColor="#4F4F4F"
            defaultValue="Requires Action"
            onChangeText={(label, value) =>{
                setChoice(value);
                navigation.navigate('Requests', {choice: value})
                
                // setCurrentRequestType
                // setCurrentRequestList
              }
            }
          />
         
         </TouchableOpacity>);
    case "Profile":
      return "Profile";
    case "Notification":
      return "Notifications";
  }
}
}