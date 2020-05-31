import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styles, buttons, texts } from "./EditProfileScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, validateEmail, extractTrueObj } from "../../Helpers";

export default function LoginScreen({ route, navigation }) {
  const [user, setUser] = useState();
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

  useEffect(() => {
    fetch_user_obj(route.params.userID);
  }, [route.params.userID]);

  function form(header, change, value) {
    return (
      <View style = {styles.form}>
        <Text style = {texts.label}>
          {header}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => change(input)}
          defaultValue={value}
        />
      </View>
    );
  }

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
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
  return (
    <ScrollView style={styles.container}>
      <View style = {styles.center}>
        {form("First Name:", setFirstName, firstName)}
        {form("Last Name:", setLastName, lastName)}
        {form("Email:", setEmail, email)}
        {form("Phone:", setPhone, phone)}
        {form("Zip Code:", setZip, zip)}
      </View> 
      </ScrollView>
  );
}
