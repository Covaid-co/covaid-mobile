import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
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
    <>
      <View style = {styles.center}>
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
              style={props.obj[key] ? styles.selected : styles.unselected}
              onPress={() => handleObjChange(key)}
            >
              <Text
                style={
                  props.obj[key] ? styles.selected_text : styles.unselected_text
                }
              >
                {taskString}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
