import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

import Colors from "../public/Colors";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
