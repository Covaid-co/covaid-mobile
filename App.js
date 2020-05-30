import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import TabBarIcon from "./components/TabBarIcon.js";
import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";

import LoginScreen from "./screens/LoginScreen/LoginScreen.js";
import EditProfileScreen from "./screens/EditProfileScreen/EditProfileScreen.js";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [auth, setAuth] = React.useState(false);

  if (!isLoadingComplete) {
    return null;
  } else if (auth) {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen
              name="Covaid"
              component={BottomTabNavigator}
              initialParams={{ userID: "5eb780ce6e90930017d11480" }}
              options={{
                headerRight: () => (
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => alert("This is will trigger settings")}
                  >
                    <TabBarIcon name="md-settings" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
