import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles, buttons, texts } from "./ProfileScreenStyles";

export default function ProfileScreen(props) {
  /**
   * Use a user object once that becomes available
   */
  return (
    <View style={styles.container}>
      <Text style={texts.header}> Your Profile </Text>
      <View style={styles.line} />
      <View style={{ flexDirection: "row", marginBottom: "2%" }}>
        <Text style={texts.label_bold}> Name: </Text>
        <Text style={texts.label}>Angela Luo</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "2%" }}>
        <Text style={texts.label_bold}> Phone: </Text>
        <Text style={texts.label}>630-392-3663</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "8%" }}>
        <Text style={texts.label_bold}> Email: </Text>
        <Text style={texts.label}>ael49021@gmail.com</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "2%" }}>
        <Text style={texts.label_bold}> Mutual Aid: </Text>
        <Text style={texts.label}>CCOM COVID-19 Task Force</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "8%" }}>
        <Text style={texts.label_bold}> Location: </Text>
        <Text style={texts.label}>Napervile Park District</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "2%" }}>
        <Text style={texts.label_bold}> Languages: </Text>
        <Text style={texts.label}>English</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "2%" }}>
        <Text style={texts.label_bold}> Car: </Text>
        <Text style={texts.label}>Yes</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "2%" }}>
        <Text style={texts.label_bold}> Availability: </Text>
        <Text style={texts.label}>Afternoon, Evening, Weekdays, Weekends</Text>
      </View>

      <TouchableOpacity style={buttons.edit}>
        <Text style={texts.button_label}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
