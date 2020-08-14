import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { handleLogout } from "../../util/auth_functions";
import { styles, buttons, texts } from "./SettingsScreenStyles";

export default function ProfileScreen({ route, navigation }) {
  function alertLogout() {
    Alert.alert(
      "Log Out",
      "Are you sure you want to logout of Covaid Volunteers?",
      [
        { text: "Cancel" },
        {
          text: "Logout",
          onPress: async () => {
            handleLogout(navigation, route);
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={texts.label_bold}>
        About: We are a group of college students/recent grads who want to play
        our part in the fight against COVID-19
      </Text>
      <TouchableOpacity style={buttons.logout} onPress={alertLogout}>
        <Text style={texts.label_bold}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}
