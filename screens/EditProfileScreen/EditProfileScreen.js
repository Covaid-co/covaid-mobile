import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styles, buttons, texts } from "./EditProfileScreenStyles";

export default function LoginScreen({ route, navigation }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [initialZip, setInitialZip] = useState("");

  const [zipUpdated, setZipUpdated] = useState(false);

  const [latlong, setLatLong] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [user, setUser] = useState({});
  const [defaultResources, setDefaultResources] = useState([
    "Food/Groceries",
    "Medication",
    "Donate",
    "Emotional Support",
    "Academic/Professional",
    "Misc.",
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [times, setTimes] = useState({});
  const [languageChecked, setLanguageChecked] = useState({});
  const [resources, setResources] = useState({});
  const [hasCar, setHasCar] = useState(false);
  const [association, setAssociation] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [state, setFoundState] = useState([]);

  const defaultTaskList = [
    "Food/Groceries",
    "Medication",
    "Donate",
    "Emotional Support",
    "Academic/Professional",
    "Misc.",
  ];
  const timeNames = ["Morning", "Afternoon", "Evening", "Weekdays", "Weekends"];
  const languages = [
    "English",
    "Spanish",
    "Mandarin",
    "Cantonese",
    "Other (Specify in details)",
  ];
  function form(header, placeholder, change, value) {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7F7F7F"
          onChangeText={(input) => change(input)}
          defaultValue={value}
        />
      </View>
    );
  }
  console.log(route.params)
  return (
    <View>
      <View style={styles.container}>
        <Text style={texts.header}>Edit your profile</Text>
        <Text style={texts.header}>{route.params.name}</Text>
        <TextInput></TextInput>
      </View>
    </View>
  );
}
