import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    FlatList, StyleSheet, ListItem,
    Button, 
    AsyncStorage,
  } from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./SettingsScreenStyles";
import { homeURL } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import { NavigationEvents } from 'react-navigation';

export default function ProfileScreen({ route, navigation }) {
  function handleLogout() {
    AsyncStorage.clear();
    navigation.navigate("Login", route.params)
  }

  function alertLogout() {
    Alert.alert(
        "Log Out",
        "Are you sure you want to logout of Covaid Volunteers?",
        [{ text: "Cancel" },
        { text: "Logout", onPress: () => handleLogout()}],
        {
          cancelable: false,
        }
      );
  }

  
    return (
      <View style={styles.container}>
          <View styles = {styles.center}>
          <TouchableOpacity
          style = {buttons.logout}
          onPress = {alertLogout}
          >
              <Text style = {texts.header}>LOGOUT</Text>
          </TouchableOpacity>  
          </View>     
      </View>
    );
}
