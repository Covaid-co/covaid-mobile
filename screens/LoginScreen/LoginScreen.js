import React from "react";
import { View, Text, Button, Image, StatusBar, Alert } from "react-native";
import { styles, buttons, texts } from "./LoginScreenStyles";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/images/robot-dev.png")} />
        <Text style={texts.header}>Mutual aid for COVID-19</Text>
      </View>
      <View>
        <Button style={buttons.primary} title="Login" />
      </View>
    </View>
  );
}
