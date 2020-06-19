import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Colors from "../../public/Colors";

import { styles } from "./EditDetailsScreenStyles";
import { homeURL } from "../../constants";
import fetch_a from "../../util/fetch_auth";
import Details from "../../components/Details/Details.js";

export default function EditDetailsScreen({ route, navigation }) {
  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails(route.params.details);
  }, [route.params.userID]);

  navigation.setOptions({
    headerTitle: "Details",
    headerTitleStyle: {
      fontFamily: "Inter-bold",
      color: Colors.grey_font,
    },
    headerRight: () => (
      <TouchableOpacity style={{ margin: 10 }} onPress={() => handleUpdate()}>
        <Text style={{ color: Colors.blue, fontFamily: "Inter", fontSize: 16 }}>
          {" "}
          Done{" "}
        </Text>
      </TouchableOpacity>
    ),
  });

  const handleUpdate = async (someshit) => {
    if (details.length === 0) {
      Alert.alert("Please describe how you can help", "", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }
    let params = {
      "offer.details": details,
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
      <Details details={details} setDetails={setDetails} />
    </ScrollView>
  );
}
