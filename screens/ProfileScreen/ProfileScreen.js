import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  ActivityIndicator,
  AsyncStorage,
  Image
} from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./ProfileScreenStyles";
import { homeURL, storage_keys} from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import { NavigationEvents } from "react-navigation";
import Geocode from "react-geocode";
import EditOfferScreen from "../EditOfferScreen/EditOfferScreen.js"

/**
 * unactive volunteer request not sending?? nevermind, site was just laggy prolly
 * android fetching not working
 */

export default function ProfileScreen({ route, navigation }) {
  const [token, setToken] = useState();
  const [publish, setPublish] = useState(false);
  const [user, setUser] = useState();
  const [zip, setZip] = useState();
  const [initialZip, setInitialZip] = useState("");
  const [resources, setResources] = useState({});
  const [hasCar, setHasCar] = useState();
  const [details, setDetails] = useState();

  const [editOffer, setEditOffer] = useState(false);

  const [defaultResources, setDefaultResources] = useState([
    "Food/Groceries",
    "Medication",
    "Donate",
    "Emotional Support",
    "Academic/Professional",
    "Misc.",
  ]);

  const toggleSwitch = () => {
    handleUpdate(!publish);
    setPublish(!publish);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      /**
       * Hacky fix to the params not passing quick enough:???
       */
      // fetch_user_obj(route.params.userID);
      AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
        fetch_user_obj(data);
      });
      AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
        setToken(data)
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleUpdate = async (publish) => {
    let params = {
      availability: publish,
    };
    fetch_a(route.params.token, "token", homeURL + "/api/users/update?", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (response.ok) {
          //Change the state to refect offer update
          setTimeout(function () {
            console.log("update successful")
            fetch_user_obj(route.params.userID);
          }, 750);
        } else {
          console.log("Update not successful");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log("hulloooo")
            console.log(data[0])
            setUser(data[0]);
            setPublish(data[0].availability);
            setConstants(data[0])
          });
        } else {
          // alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        // alert(e);
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
            // setFirstName(data.first_name);
            // setLastName(data.last_name);
            // setEmail(data.email);
            // setPhone(data.phone);
            // setLatLong(data.latlong);
            // setNeighborhoods(data.offer.neighborhoods);
            // setFoundState(data.offer.state);
            getZip(data.latlong);
            // setAssociation(data.association);
            // setAssociationName(data.association_name);
            setDetails(data.offer.details);
            setHasCar(data.offer.car)
            // setCurrentUserObject(data.languages, languages, setLanguageChecked);
            // setCurrentUserObject(
            //   data.offer.timesAvailable,
            //   timeNames,
            //   setTimes
            // );
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

  function getZip(location) {
    var latlng = { lat: parseFloat(location[1]), lng: parseFloat(location[0]) };
    var latitude = latlng.lat;
    var longitude = latlng.lng;
    console.log(latitude)
    console.log(longitude)
    Geocode.fromLatLng(latitude, longitude).then((response) => {
      if (response.status === "OK") {
        console.log("worked")
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

  const handleCarUpdate = async (someshit) => {
    setHasCar(!hasCar)
    let params = {
      "offer.car": !hasCar,
    };
    fetch_a(route.params.token, "token", homeURL + "/api/users/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (response.ok) {
        } else {
            Alert.alert(
                "Update not successful",
                "Please check your network connection",
                [{ text: "OK" }],
                {
                  cancelable: false,
                }
              );
        }
      })
      .catch((e) => {
        Alert.alert(
            "Update not successful",
            "Please check your network connection",
            [{ text: "OK" }],
            {
              cancelable: false,
            }
          );
      });
  };
  if (user) {
    return (
      <ScrollView style={styles.container}>
         <View style={styles.info}>
         {(publish && (
          <Text style={texts.label_blue}> You are an active volunteer.</Text>
        )) || (
          <Text style={texts.label_bold}> You are an inactive volunteer.</Text>
        )}
          <Switch
            trackColor={{ false: Colors.blue, true: Colors.blue }}
            thumbColor={publish ? "#FFFFFF": "#FFFFFF"}
            ios_backgroundColor= {Colors.light_grey_font}
            onValueChange={toggleSwitch}
            value={publish}
            style = {{marginLeft: "auto"}}
          />
        </View>
        <View pointerEvents={publish ? 'auto' : 'none'} style={publish ? {opacity: 1} : {opacity: .5}}>
        <View style={styles.line} />
        <TouchableOpacity style={styles.info} onPress={() => navigation.navigate("Edit Offer", {token: token, resources: resources})}>
          <Text style={texts.label_bold}> Offer: </Text>
          <Text style={texts.label}>{user.offer.tasks.join(", ")}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.info} onPress={() => handleCarUpdate(hasCar)}>
          <Text style={texts.label_bold}> Drive Access: </Text>
          <Text style={texts.label}>{hasCar ? "Yes" : "No"}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.info} >
        <Text style={texts.label_bold}> Zip Code </Text>
        <Text style={texts.label}> {zip} </Text>
        </View>
        <View style={styles.line} />
        <TouchableOpacity style={styles.info} onPress={() => navigation.navigate("Edit Details", {token: token, details: details})}>
        <Text style={texts.label_bold}> Details </Text>
        <Image
          style={styles.arrow}
          source={require("../../assets/images/arrow.png")}
        />
        </TouchableOpacity>
        <View style={styles.line} />
        </View>
        {/* <View style={styles.line} />
        <View style={styles.info}>
          <Text style={texts.label_bold}> Name: </Text>
          <Text style={texts.label}>
            {user.first_name + " " + user.last_name}
          </Text>
        </View>
        {user.phone.length != 0 && (
          <View style={styles.info}>
            <Text style={texts.label_bold}> Phone: </Text>
            <Text style={texts.label}>{user.phone}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={texts.label_bold}> Email: </Text>
          <Text style={texts.label}>{user.email}</Text>
        </View>
        {user.association_name.length > 0 && (
          <View style={styles.info}>
            <Text style={texts.label_bold}> Mutual Aid: </Text>
            <Text style={texts.label}>{user.association_name}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={texts.label_bold}> Location: </Text>
          <Text style={texts.label}>{user.offer.neighborhoods.join(", ")}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Languages: </Text>
          <Text style={texts.label}>{user.languages.join(", ")}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Car: </Text>
          <Text style={texts.label}>{user.offer.car ? "Yes" : "No"}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Availability: </Text>
          <Text style={texts.label}>
            {user.offer.timesAvailable.join(", ")}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Tasks: </Text>
          <Text style={texts.label}>{user.offer.tasks.join(", ")}</Text>
        </View>
        <View style={styles.info}>
          <Text style={texts.label_bold}> Details: </Text>
          <Text style={texts.label}>{user.offer.details}</Text>
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
          onPress={() => navigation.navigate("Edit Profile", route.params)}
        >
          <Text style={texts.button_label}>Edit Profile</Text>
        </TouchableOpacity> */}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
}
