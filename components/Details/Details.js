import React from "react";
import { styles, texts } from "./DetailsStyles";
import { View, Text, TextInput } from "react-native";

export default function Details(props) {
  return (
    <View style={styles.center}>
      <Text style={texts.label}>
        Let us know more about you and how you can help (Please be specific)!
        For example: If you're offering food, please let us know if you're
        offering to cook food, donate food, or need to be reimbursed, etc. No
        pressure, but any information helps us match you more quickly!
      </Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={3}
        style={styles.input}
        onChangeText={(text) => props.setDetails(text.trim())}
        defaultValue={props.details}
        placeholder="I am a college student, and am happy to deliver food from stores or food banks in St. Louis County!"
      />
    </View>
  );
}
