import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from "react-native";
import { styles, buttons, texts } from "./EditProfileScreenStyles";
import { homeURL, volunteer_status, storage_keys } from "../../constants";
import { generateURL, validateEmail, extractTrueObj } from "../../Helpers";
import CheckForm from "../../components/CheckForm/CheckForm";
import Details from "../../components/Details/Details";
import Colors from "../../public/Colors";
/**
 * Update location when zipcode changes
 *
 * hacky fix: idk how to make the screen longer when the keyboard pops up so everything is in a very specific order for a reason
 */
export default function LoginScreen({ route, navigation }) {
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [initialZip, setInitialZip] = useState("");
  const [details, setDetails] = useState();

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

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
            setConstants(data[0]);
          });
        } else {
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const setConstants = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setEmail(data.email);
    setPhone(data.phone);
    //zip code using a location function
    //maybe on location change, it will automatically rerender the page and switch the categories
    setDetails(data.offer.details);
    setCurrentUserObject(data.languages, languages, setLanguageChecked);
    setCurrentUserObject(data.offer.timesAvailable, timeNames, setTimes);
    async function getResources() {
      if (!data.association) {
        setCurrentUserObject(data.offer.tasks, defaultResources, setResources);
        return;
      }
      let params = { associationID: data.association };
      var url = generateURL("/api/association/get_assoc/?", params);
      const response = await fetch(url);
      response.json().then((res) => {
        setCurrentUserObject(pdata.offer.tasks, res.resources, setResources);
      });
    }
    getResources();
  };
  const setCurrentUserObject = (userList, fullList, setFunction) => {
    for (var i = 0; i < fullList.length; i++) {
      const curr = fullList[i];
      const include = userList.includes(curr) ? true : false;
      setFunction((prev) => ({
        ...prev,
        [curr]: include,
      }));
    }
  };

  function form(header, change, value) {
    return (
      <View style={styles.form}>
        <Text style={texts.label}>{header}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => change(input)}
          defaultValue={value}
        />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        {form("First Name:", setFirstName, firstName)}
        {form("Last Name:", setLastName, lastName)}
        {form("Email:", setEmail, email)}
        {form("Phone:", setPhone, phone)}
        {form("Zip Code:", setZip, zip)}
        <Details details={details} setDetails={setDetails} />
        <Text style={texts.label}> What languages do you speak? </Text>
        <CheckForm obj={languageChecked} setObj={setLanguageChecked} />
        <Text style={texts.label}> What is your general availability? </Text>
        <CheckForm obj={times} setObj={setTimes} />
        <Text style={texts.label}> Select Categories</Text>
        <CheckForm obj={resources} setObj={setResources} />
      </View>
      <View style={styles.row}>
        <Text style={texts.label}> Car: </Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.grey }}
          thumbColor={hasCar ? Colors.blue : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setHasCar(!hasCar)}
          value={hasCar}
        />
        {(hasCar && <Text style={texts.green_text}> Car Available</Text>) || (
          <Text style={texts.red_text}> No Car Available</Text>
        )}
      </View>
      <View style={{ marginBottom: 100 }}>
        <View style={styles.center}>
          <TouchableOpacity style={buttons.edit}>
            <Text style={texts.button_label}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
