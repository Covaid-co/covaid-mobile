import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  ActivityIndicator,
  AsyncStorage,
  Image,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import Colors from "../../public/Colors";

import { styles, texts } from "./ProfileScreenStyles";
import { homeURL, storage_keys } from "../../constants";
import { generateURL } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import Geocode from "react-geocode";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader.js"

export default function ProfileScreen({ route, navigation }) {
  const [token, setToken] = useState();
  const [id, setID] = useState();
  const [publish, setPublish] = useState(false);
  const [user, setUser] = useState();
  const [zip, setZip] = useState();
  const [initialZip, setInitialZip] = useState("");
  const [resources, setResources] = useState(undefined);
  const [hasCar, setHasCar] = useState();
  const [details, setDetails] = useState();

  const [association, setAssociation] = useState("");
  const [associationName, setAssociationName] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [state, setFoundState] = useState([]);
  const [latlong, setLatLong] = useState([]);

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

  const toggleSwitch = () => {
    handleUpdate(!publish);
    setPublish(!publish);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      async function func() {
        //prevent offer from showing resources of a previous location after a change
        await setResources(null);
        AsyncStorage.getItem(storage_keys.SAVE_ID_KEY).then((data) => {
          setID(data);
          fetch_user_obj(data);
        });
        AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((data) => {
          setToken(data);
        });
      }
      func();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [user]);

  const _keyboardDidHide = () => {
    //hacky way of letting user know they need to press "done" to submit. If they close their keyboard, then the textinput will just go to original zipcode
    AsyncStorage.getItem(storage_keys.SAVE_ZIP).then((data) => {
      setZip(data);
    });
  };

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
          //Change the state to reflect offer update
          setTimeout(function () {
            console.log("update successful");
            fetch_user_obj(route.params.userID);
          }, 750);
        } else {
          console.log("Update not successful");
        }
      })
      .catch((e) => {
        //console.log("Error");
      });
  };

  const fetch_user_obj = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
            setPublish(data[0].availability);
            setConstants(data[0]);
          });
        } else {
        }
      })
      .catch((e) => {});
  };

  const setConstants = (data) => {
    let params = {};
    var url = generateURL(homeURL + "/api/apikey/google", params);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((key) => {
            Geocode.setApiKey(key["google"]);
            setLatLong(data.latlong);
            setNeighborhoods(data.offer.neighborhoods);
            setFoundState(data.offer.state);
            getZip(data.latlong);
            setAssociation(data.association);
            setAssociationName(data.association_name);
            setDetails(data.offer.details);
            setHasCar(data.offer.car);
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
          console.log("Error: User info not obtained");
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

  async function getZip(location) {
    try {
      var latlng = {
        lat: parseFloat(location[1]),
        lng: parseFloat(location[0]),
      };
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
                async function storeZip() {
                  await AsyncStorage.setItem(
                    storage_keys.SAVE_ZIP,
                    response.results[i].address_components[j].long_name
                  );
                }
                storeZip();
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
    } catch (e) {
      console.log(e);
    }
  }

  const handleCarUpdate = async (someshit) => {
    setHasCar(!hasCar);
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
          fetch_user_obj(route.params.userID);
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
  const updateLocation = async (e) => {
    if (!zip || zip.length != 5 || !/^\d+$/.test(zip)) {
      alert("Invalid Zipcode");
      return false;
    }
    if (initialZip !== zip) {
      if (handleChangedZip()) {
        setInitialZip(zip);
        return true;
      }
      alert("Invalid Zipcode");
      return false;
    }
    return false;
  };

  const handleChangedZip = () => {
    if (getLatLng(zip)) {
      return true;
    } else {
      return false;
    }
  };

  async function getLatLng(zip) {
    try {
      if (zip.length != 5 || !/^\d+$/.test(zip)) {
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
      var temp_resources = {};
      var association_name = "";
      var association = "";
      if (data.length === 0) {
        for (var i = 0; i < defaultTaskList.length; i++) {
          temp_resources[defaultTaskList[i]] = false;
        }
      } else {
        for (var i = 0; i < data[0].resources.length; i++) {
          temp_resources[data[0].resources[i]] = false;
        }
        association = data[0]._id;
        association_name = data[0].name;
      }

      let form = {
        "offer.neighborhoods": new_neighborhoods,
        "offer.state": foundState,
        association: association,
        association_name: association_name,
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };
      fetch_a(route.params.token, "token", homeURL + "/api/users/update", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((response) => {
          if (response.ok) {
            fetch_user_obj(route.params.userID);
            navigation.navigate("Edit Offer", {
              token: token,
              resources: temp_resources,
            });
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
      Alert.alert(
        "You have edited your location, please update your categories to help!",
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

  const handleLocationUpdate = async (huh) => {
    if (!(await updateLocation())) {
      return;
    }
  };

  if (user && initialZip) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <ProfileHeader user = {user}/>
          <Text style={texts.name}>
            {user.first_name + " " + user.last_name}
          </Text>

          {user.association_name.length > 0 && (
            <Text style={texts.association}>{user.association_name}</Text>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit Profile", route.params)}
          >
            <Text style={texts.button_label_blue}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          {(publish && (
            <Text style={texts.label_blue}> You are an active volunteer.</Text>
          )) || (
            <Text style={texts.label_bold}>
              {" "}
              You are an inactive volunteer.
            </Text>
          )}
          <Switch
            trackColor={{ false: Colors.blue, true: Colors.blue }}
            thumbColor={publish ? "#FFFFFF" : "#FFFFFF"}
            ios_backgroundColor={Colors.light_grey_font}
            onValueChange={toggleSwitch}
            value={publish}
            style={{ marginLeft: "auto" }}
          />
        </View>
        <View
          pointerEvents={publish ? "auto" : "none"}
          style={publish ? { opacity: 1 } : { opacity: 0.5 }}
        >
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.info}
            onPress={() =>
              navigation.navigate("Edit Offer", {
                token: token,
                resources: resources,
              })
            }
          >
            <Text style={texts.label_bold}> Offer: </Text>
            <Text style={texts.label}>{user.offer.tasks.join(", ")}</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.info}
            onPress={() => handleCarUpdate(hasCar)}
          >
            <Text style={texts.label_bold}> Drive Access: </Text>
            <Text style={texts.label}>{hasCar ? "Yes" : "No"}</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <View style={styles.info}>
            <Text style={texts.label_bold}> Zip Code </Text>
            <TextInput
              style={texts.label}
              placeholder="Zip Code"
              placeholderTextColor={Colors.grey}
              onChangeText={(text) => setZip(text)}
              onSubmitEditing={(text) => handleLocationUpdate(text)}
              defaultValue={zip}
              returnKeyType="done"
            />
          </View>

          <View style={styles.line} />
          <TouchableOpacity
            style={styles.info}
            onPress={() =>
              navigation.navigate("Edit Details", {
                token: token,
                details: details,
              })
            }
          >
            <Text style={texts.label_bold}> Details </Text>
            <Image
              style={styles.arrow}
              source={require("../../assets/images/arrow.png")}
            />
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
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
