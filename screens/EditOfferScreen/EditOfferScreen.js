import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import Colors from "../../public/Colors";

import { styles } from "./EditOfferScreenStyles";
import { homeURL } from "../../constants";
import { extractTrueObj } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import CheckForm from "../../components/CheckForm/CheckForm";

export default function EditOfferScreen({ route, navigation }) {
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
