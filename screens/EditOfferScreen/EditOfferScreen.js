import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Modal,
  Alert,
} from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./EditOfferScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL, validateEmail, extractTrueObj } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import { NavigationEvents } from "react-navigation";
import Geocode from "react-geocode";
import CheckForm from "../../components/CheckForm/CheckForm";

/**
 * unactive volunteer request not sending?? nevermind, site was just laggy prolly
 * android fetching not working
 */

export default function EditOfferScreen({ route, navigation }) {
  const [publish, setPublish] = useState(false);
  const [user, setUser] = useState();
  const [zip, setZip] = useState();
  const [initialZip, setInitialZip] = useState("");
  const [resources, setResources] = useState({});


  useEffect(() => {
    setResources(route.params.resources);
  }, [route.params.userID]);

  navigation.setOptions({
    headerTitle: "Offer",
    headerRight: () => (
      <TouchableOpacity style={{ margin: 10 }} onPress={() => handleUpdate()}>
        <Text style={{ color: Colors.blue, fontFamily: "Inter", fontSize: 16 }}>
          {" "}
          Done{" "}
        </Text>
      </TouchableOpacity>
    ),
    headerLeft: null,
  });
  console.log(route.params);
  const toggleSwitch = () => {
    handleUpdate(!publish);
    setPublish(!publish);
  };
  function bitchwtf() {
    console.log("BITCH WTF");
    navigation.navigate("Profile");
  }

  const handleUpdate = async (someshit) => {
    if (Object.values(resources).every((v) => v === false)) {
      Alert.alert(
        "Choose at least one category to help",
        "",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    var resourceList = extractTrueObj(resources);
    let params = {
      "offer.tasks": resourceList,
    };
    console.log(resourceList);
    fetch_a(route.params.token, "token", homeURL + "/api/users/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (response.ok) {
          navigation.goBack();
        } else {
          Alert.alert(
            "Update not successful",
            "Please check your network connection",
            [{ text: "OK" }],
            {
              cancelable: false,
            }
          );
        }
      })
      .catch((e) => {
        Alert.alert(
          "Update not successful",
          "Please check your network connection",
          [{ text: "OK" }],
          {
            cancelable: false,
          }
        );
      });
  };

  return (
    <ScrollView style={styles.container}>
      <CheckForm obj={resources} setObj={setResources} />
      <View style={styles.line} />
    </ScrollView>
  );
}
