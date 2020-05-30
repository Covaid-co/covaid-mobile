import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, Switch } from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./ProfileScreenStyles";

export default function ProfileScreen({ navigation }) {
  //set this to props.publish
  const [publish, setPublish] = useState(false);

  const toggleSwitch = () => setPublish((publish) => !publish);
  /**
   * Use a user object once that becomes available
   */
  return (
    <ScrollView style={styles.container}>
      <Text style={texts.header}> Your Profile </Text>
      <View style={styles.line} />
      <View style={styles.info}>
        <Text style={texts.label_bold}> Name: </Text>
        <Text style={texts.label}>Angela Luo</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Phone: </Text>
        <Text style={texts.label}>630-392-3663</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Email: </Text>
        <Text style={texts.label}>ael49021@gmail.com</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Mutual Aid: </Text>
        <Text style={texts.label}>CCOM COVID-19 Task Force</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Location: </Text>
        <Text style={texts.label}>Napervile Park District</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Languages: </Text>
        <Text style={texts.label}>English</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Car: </Text>
        <Text style={texts.label}>Yes</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Availability: </Text>
        <Text style={texts.label}>Afternoon, Evening, Weekdays, Weekends</Text>
      </View>
      <View style={styles.info}>
        <Text style={texts.label_bold}> Details: </Text>
        <Text style={texts.label}>
          I am a college student who can pick up/drop off supplies (ex. masks,
          food, etc) in the Naperville area.{" "}
        </Text>
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
}
