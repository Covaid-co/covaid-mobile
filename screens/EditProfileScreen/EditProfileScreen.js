import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
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
import Geocode from "react-geocode";
import fetch_a from "../../util/fetch_auth";
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
  const [latlong, setLatLong] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [times, setTimes] = useState({});
  const [languageChecked, setLanguageChecked] = useState({});
  const [resources, setResources] = useState({});
  const [hasCar, setHasCar] = useState(false);
  const [association, setAssociation] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [state, setFoundState] = useState([]);

  const [defaultResources, setDefaultResources] = useState([
    "Food/Groceries",
    "Medication",
    "Donate",
    "Emotional Support",
    "Academic/Professional",
    "Misc.",
  ]);

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
  const noLocChange = 2;

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
    let params = {};
    var url = generateURL(homeURL + "/api/apikey/google", params);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((key) => {
            Geocode.setApiKey(key["google"]);
            setIsLoaded(true);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.email);
            setPhone(data.phone);
            setLatLong(data.latlong);
            setNeighborhoods(data.offer.neighborhoods);
            setFoundState(data.offer.state);
            getZip(data.latlong);
            setAssociation(data.association);
            setAssociationName(data.association_name);
            setDetails(data.offer.details);
            setCurrentUserObject(data.languages, languages, setLanguageChecked);
            setCurrentUserObject(
              data.offer.timesAvailable,
              timeNames,
              setTimes
            );
            async function getResources() {
              if (!data.association) {
                setCurrentUserObject(
                  data.offer.tasks,
                  defaultResources,
                  setResources
                );
                return;
              }
              let params = {
                associationID: data.association,
              };
              var url = generateURL(
                homeURL + "/api/association/get_assoc/?",
                params
              );

              const response = await fetch(url);
              response.json().then((res) => {
                setDefaultResources(res.resources);
                setCurrentUserObject(
                  data.offer.tasks,
                  res.resources,
                  setResources
                );
              });
            }
            getResources();
          });
        } else {
          console.log("Error");
        }
      })
      .catch((e) => {
        alert(e);
      });
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

  // true means location changes
  // false means location failed to change
  const updateLocation = async (e) => {
    console.log(zip);
    if (zip.length != 5 || !/^\d+$/.test(zip)) {
      alert("Invalid Zipcode");
      return false;
    }
    if (initialZip !== zip) {
      if (handleChangedZip()) {
        setInitialZip(zip);
        return true;
      }
      return false;
    } else {
      setNeighborhoods(user.offer.neighborhoods);
      setAssociation(user.association);
      setAssociationName(user.association_name);
      setLatLong(user.latlong);
      setCurrentUserObject(user.offer.tasks, defaultResources, setResources);
      return noLocChange;
    }
  };

  function getZip(location) {
    var latlng = { lat: parseFloat(location[1]), lng: parseFloat(location[0]) };
    var latitude = latlng.lat;
    var longitude = latlng.lng;

    Geocode.fromLatLng(latitude, longitude).then((response) => {
      if (response.status === "OK") {
        for (var i = 0; i < response.results.length; i++) {
          for (
            var j = 0;
            j < response.results[i].address_components.length;
            j++
          ) {
            if (
              response.results[i].address_components[j].types.indexOf(
                "postal_code"
              ) > -1
            ) {
              setInitialZip(
                response.results[i].address_components[j].long_name
              );
              setZip(response.results[i].address_components[j].long_name);
              break;
            }
          }
        }
      }
    });
  }

  const handleNoAssociations = () => {
    setDefaultResources(defaultTaskList);
    setCurrentUserObject([], defaultTaskList, setResources);
    var temp_resources = {};
    for (var i = 0; i < defaultTaskList.length; i++) {
      temp_resources[defaultTaskList[i]] = false;
    }
    setAssociation("");
    setAssociationName("");
    setResources(temp_resources);
  };

  const handleNewAssociation = (association) => {
    setDefaultResources(association.resources);
    setCurrentUserObject([], association.resources, setResources);
    var temp_resources = {};
    for (var i = 0; i < association.resources.length; i++) {
      temp_resources[association.resources[i]] = false;
    }
    setResources(temp_resources);
    setAssociation(association._id);
    setAssociationName(association.name);
  };

  async function getLatLng(zip) {
    try {
      if (zip.length !== 5 || !/^\d+$/.test(zip)) {
        throw Error("Invalid zipcode");
      }
      var response = await Geocode.fromAddress(zip);
      var new_neighborhoods = [];
      var foundState = [];
      for (var i = 0; i < Math.min(5, response.results.length); i++) {
        const results = response.results[i]["address_components"];
        for (var j = 0; j < results.length; j++) {
          const types = results[j].types;
          if (types.includes("neighborhood") || types.includes("locality")) {
            const currNeighborhoodName = results[j]["long_name"];
            if (new_neighborhoods.includes(currNeighborhoodName) === false) {
              new_neighborhoods.push(currNeighborhoodName);
            }
          }
          for (var k = 0; k < types.length; k++) {
            const type = types[k];
            if (
              foundState.length === 0 &&
              type === "administrative_area_level_1"
            ) {
              foundState = [results[j]["long_name"], results[j]["short_name"]];
            }
          }
        }
      }
      const { lat, lng } = response.results[0].geometry.location;
      setLatLong([lng, lat]);
      let params = { latitude: lat, longitude: lng };
      const url = generateURL(
        homeURL + "/api/association/get_assoc/lat_long?",
        params
      );
      const response_assoc = await fetch(url);
      const data = await response_assoc.json();
      setZipUpdated(true);
      if (data.length === 0) {
        setNeighborhoods(new_neighborhoods);
        setFoundState(foundState);
        handleNoAssociations();
      } else {
        setNeighborhoods(new_neighborhoods);
        setFoundState(foundState);
        handleNewAssociation(data[0]);
      }

      Alert.alert(
        "You have edited locations, please update your categories to help!",
        "",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return true;
    } catch (err) {
      alert("Invaild zipcode");
    }
  }

  const handleChangedZip = () => {
    if (getLatLng(zip)) {
      return true;
    } else {
      return false;
    }
  };
  async function handleSaveChanges() {
    if ((await updateLocation()) == noLocChange) {
      handleSubmit();
    }
  }

  const checkInputs = () => {
    var valid = true;
    if (Object.values(languageChecked).every((v) => v === false)) {
      alert("Need to select a language");
      valid = false;
    }
    if (Object.values(resources).every((v) => v === false)) {
      alert("Need to select categories to help");
      valid = false;
    }
    if (Object.values(times).every((v) => v === false)) {
      alert("No general availability selected");
      valid = false;
    }
    if (firstName.length === 0) {
      alert("Enter a first name");
      valid = false;
    } else if (lastName.length === 0) {
      alert("Enter a last name");
      valid = false;
    } else if (
      /^\d+$/.test(phone) &&
      phone.length !== 10 &&
      phone.length !== 0
    ) {
      alert("Enter a valid phone number");
      valid = false;
    } else if (email.length === 0 || validateEmail(email) === false) {
      alert("Enter a valid email");
      valid = false;
    }
    return valid;
  };

  function handleSubmit() {
    if (checkInputs() === false) {
      return;
    }
    var selectedLanguages = extractTrueObj(languageChecked);
    var selectedTimes = extractTrueObj(times);
    var resourceList = extractTrueObj(resources);

    let params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      "offer.timesAvailable": selectedTimes,
      "offer.car": hasCar,
      "offer.neighborhoods": neighborhoods,
      "offer.state": state,
      association: association,
      association_name: associationName,
      "offer.tasks": resourceList,
      location: {
        type: "Point",
        coordinates: latlong,
      },
      languages: selectedLanguages,
    };
    var url = generateURL(homeURL + "/api/users/update?", params);
    fetch_a(route.params.token, "token", url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Offer successfully created");
          navigation.goBack();
        } else {
          console.log("Offer not successful");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  }

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
  if (user) {
    return (
      <ScrollView scrollIndicatorInsets={{ right: 1 }} style={styles.container}>
        <View style={styles.center}>
          {form("First Name:", setFirstName, firstName)}
          {form("Last Name:", setLastName, lastName)}
          {form("Email:", setEmail, email)}
          <View style={styles.form}>
            <Text style={texts.label}>{"Phone"}</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(input) => setPhone(input)}
              defaultValue={phone}
            />
          </View>
          <View style={styles.form}>
            <Text style={texts.label}>{"Zip Code:"}</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(input) => setZip(input)}
              defaultValue={zip}
            />
          </View>

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
            <TouchableOpacity style={buttons.edit} onPress={handleSaveChanges}>
              <Text style={texts.button_label}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
}
