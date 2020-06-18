import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { styles } from "./CheckFormStyles";

export default function CheckForm(props) {
  const handleObjChange = (key) => {
    props.setObj((prev) => ({
      ...prev,
      [key]: !props.obj[key],
    }));
  };

  const sortedObj = Object.keys(props.obj);
  sortedObj.sort();

  return (
    // <>
    <View style={styles.center}>
      {sortedObj.map((key) => {
        const isTranslated = props.translations ? true : false;
        const taskString =
          isTranslated && props.translations[props.language][key]
            ? props.translations[props.language][key]
            : key;
        return (
          <TouchableOpacity
            key={key}
            disabled={props.disabled}
            style={styles.checkbox}
            // style={props.obj[key] ? styles.selected : styles.unselected}
            onPress={() => handleObjChange(key)}
          >
            <View
              style={props.obj[key] ? styles.circle_blue : styles.circle_grey}
            ></View>
            <Text style={styles.label}>{taskString}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={styles.line} />
    </View>
    // </>
  );
}
