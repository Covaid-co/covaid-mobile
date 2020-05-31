import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, Switch } from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./ProfileScreenStyles";
import { homeURL } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";

export default function ProfileScreen({ route, navigation }) {
  /**
   * TODO:
   * functionality for publish/unpublish
   * edit profile page
   */
  const [publish, setPublish] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [user, setUser] = useState();

  const toggleSwitch = () => setPublish((publish) => !publish);

  useEffect(() => {
    fetch_user_obj(route.params.userID);
  }, [route.params.userID]);
  console.log(route.params);

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data[0]);
            setUser(data[0]);
          });
        } else {
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  if (user) {
    return (
      <ScrollView style={styles.container}>
        <Text style={texts.header}> Your Profile </Text>
        <View style={styles.line} />
        <View style={styles.info}>
          <Text style={texts.label_bold}> Name: </Text>
          <Text style={texts.label}>
            {user.first_name + " " + user.last_name}
          </Text>
        </View>
        {user.phone && (
          <View style={styles.info}>
            <Text style={texts.label_bold}> Phone: </Text>
            <Text style={texts.label}>{user.phone}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={texts.label_bold}> Email: </Text>
          <Text style={texts.label}>{user.email}</Text>
        </View>
        {user.association_name.length > 0 && (
          <View style={styles.info}>
            <Text style={texts.label_bold}> Mutual Aid: </Text>
            <Text style={texts.label}>{user.association_name}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={texts.label_bold}> Location: </Text>
          <Text style={texts.label}>{user.offer.neighborhoods.join(", ")}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Languages: </Text>
          <Text style={texts.label}>{user.languages.join(", ")}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Car: </Text>
          <Text style={texts.label}>{user.offer.car ? "Yes" : "No"}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Availability: </Text>
          <Text style={texts.label}>
            {user.offer.timesAvailable.join(", ")}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Details: </Text>
          <Text style={texts.label}>{user.offer.details}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Publish Offer: </Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.grey }}
            thumbColor={publish ? Colors.blue : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={publish}
          />
        </View>
        {(publish && (
          <Text style={texts.green_text}> Your offer is now public!</Text>
        )) || (
          <Text style={texts.red_text}> Your offer is currently inactive</Text>
        )}

        <TouchableOpacity
          style={buttons.edit}
          onPress={() => navigation.navigate("Edit Profile", { name: "Jane" })}
        >
          <Text style={texts.button_label}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}
