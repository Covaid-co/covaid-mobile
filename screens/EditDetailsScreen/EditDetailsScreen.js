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
  Alert
} from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./EditDetailsScreenStyles";
import { homeURL, storage_keys} from "../../constants";
import { generateURL, validateEmail, extractTrueObj } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import { NavigationEvents } from "react-navigation";
import Geocode from "react-geocode";
import CheckForm from "../../components/CheckForm/CheckForm";
import Details from "../../components/Details/Details.js"

/**
 * unactive volunteer request not sending?? nevermind, site was just laggy prolly
 * android fetching not working
 */

export default function EditDetailsScreen({ route, navigation }) {
  const [publish, setPublish] = useState(false);
  const [user, setUser] = useState();
  const [zip, setZip] = useState();
  const [initialZip, setInitialZip] = useState("");
  const [resources, setResources] = useState({});
  const [details, setDetails] = useState();

  useEffect(() => {
    setDetails(route.params.details)
  }, [route.params.userID]);

  navigation.setOptions({
    headerTitle: "Details",
    headerTitleStyle: {
      fontFamily: "Inter-bold",
      color: Colors.grey_font
    },
    headerRight: () => (
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={()=> handleUpdate()} 
        >
          <Text style = {{color: Colors.blue, fontFamily: "Inter", fontSize: 16}}> Done </Text>
        </TouchableOpacity>
      ),
  });
  console.log(route.params)
  const toggleSwitch = () => {
    handleUpdate(!publish);
    setPublish(!publish);
  };
    const handleUpdate = async (someshit) => {
      if (details.length === 0) {
        Alert.alert(
            "Please describe how you can help",
            "",
            [{ text: "OK" }],
            {
              cancelable: false,
            }
          );
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
            navigation.goBack()
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
        <ScrollView style = {styles.container}>
          <Details details={details} setDetails={setDetails} />
      </ScrollView>
    );
}
