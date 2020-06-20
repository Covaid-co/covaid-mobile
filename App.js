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

import LoginScreen from "./screens/LoginScreen/LoginScreen.js";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen.js";
import EditOfferScreen from "./screens/EditOfferScreen/EditOfferScreen.js";
import EditDetailsScreen from "./screens/EditDetailsScreen/EditDetailsScreen.js";
import RequestsScreen from "./screens/RequestsScreen/RequestsScreen.js";
import ActiveRequestScreen from "./screens/IndividualRequestScreen/ActiveRequestScreen.js"
import PendingRequestScreen from "./screens/IndividualRequestScreen/PendingRequestScreen.js"
import CompletedRequestScreen from "./screens/IndividualRequestScreen/CompletedRequestScreen.js"
import CompleteConfirm from "./components/CompleteConfirm/CompleteConfirm"

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [auth, setAuth] = useState(false);
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
      setUserID(data);
    });

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
      setToken(data);
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Covaid"
            component={BottomTabNavigator}
            initialParams={{
              userID: userID,
              token: token,
            }}
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
          <Stack.Screen name="Active Request" component={ActiveRequestScreen} />
          <Stack.Screen name="Pending Request" component={PendingRequestScreen} />
          <Stack.Screen name="Completed Request" component={CompletedRequestScreen} />
          <Stack.Screen name="Confirm Completion" component={CompleteConfirm} />
          <Stack.Screen name="Requests Screen" component={RequestsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
