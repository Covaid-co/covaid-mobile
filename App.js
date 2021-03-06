import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import TabBarIcon from "./components/TabBarIcon.js";
import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { homeURL, storage_keys } from "./constants";
import fetch_a from "./util/fetch_auth";
import Colors from "./public/Colors";

import LoginScreen from "./screens/LoginScreen/LoginScreen.js";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen.js";
import EditOfferScreen from "./screens/EditOfferScreen/EditOfferScreen.js";
import EditDetailsScreen from "./screens/EditDetailsScreen/EditDetailsScreen.js";
import RequestsScreen from "./screens/RequestsScreen/RequestsScreen.js";
import SettingsScreen from "./screens/SettingsScreen/SettingsScreen.js";

const navigationRef = React.createRef();
const Stack = createStackNavigator();
const headerAttributes = {
  fontSize: 17,
  fontFamily: "Inter-bold",
  color: Colors.grey_font,
};
export default function App(props) {
  const isLoadingComplete = useCachedResources();

  async function handleAuth() {
    try {
      const idHolder = await AsyncStorage.getItem(storage_keys.SAVE_ID_KEY);
      const tokenHolder = await AsyncStorage.getItem(
        storage_keys.SAVE_TOKEN_KEY
      );
      if (idHolder && tokenHolder) {
        await fetchUserAndNavigate(tokenHolder);
      }
    } catch (e) {
      alert(e);
    }
  }

  async function fetchUserAndNavigate(token) {
    var url = homeURL + "/api/users/current";
    try {
      const res = await fetch_a(token, "token", url, {
        method: "get",
      });
      if (res.ok) {
        let user = await res.json();
        if (user._id && user._id.length !== 0) {
          console.log("\n***APP.JS*** User Name: " + user.first_name + "\n");
          console.log(
            "---- ***APP.JS*** User successfully fetched. Token is active. User is authorized ----\n"
          );
          navigationRef.current.navigate("Covaid", { user: user });
        } else {
          console.log(
            "---- ***APP.JS*** Fetch ok, but user ID could not be found. Token is expired. User is unauthorized ----\n"
          );
          navigationRef.current.navigate("Login");
        }
      } else {
        console.log(
          "---- ***APP.JS*** User could not be fetched. Token is expired. User is unauthorized ----\n"
        );
        navigationRef.current.navigate("Login");
      }
    } catch (e) {
      console.log("***APP.js*** fetchUserAndNavigate error: " + e);
      // navigationRef.current.navigate("Login");
    }
  }

  useEffect(() => {
    handleAuth();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration} ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              borderBottomColor: "rgba(206, 206, 206,0.95)",
              borderBottomWidth: 0.25,
              shadowColor: Colors.shadowColor,
              shadowOffset: {
                height: 1,
              },
              shadowOpacity: 0.05,
              shadowRadius: 4,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerTitleStyle: headerAttributes,
            }}
          />
          <Stack.Screen
            name="Covaid"
            component={BottomTabNavigator}
            options={{
              gestureEnabled: false,
              headerTitleStyle: headerAttributes,
            }}
          />
          <Stack.Screen
            name="Edit Profile"
            component={EditProfileScreen}
            options={{
              headerTitleStyle: headerAttributes,
            }}
          />
          <Stack.Screen
            name="Edit Offer"
            component={EditOfferScreen}
            options={{
              headerTitleStyle: headerAttributes,
            }}
          />
          <Stack.Screen
            name="Edit Details"
            component={EditDetailsScreen}
            options={{
              headerTitleStyle: headerAttributes,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitleStyle: headerAttributes,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
