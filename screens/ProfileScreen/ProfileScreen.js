import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./ProfileScreenStyles";
import { homeURL, storage_keys} from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import { NavigationEvents } from "react-navigation";

export default function ProfileScreen({ route, navigation }) {
  const [publish, setPublish] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [user, setUser] = useState();

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
        console.log("GETTING USER ID " + data);
        fetchUser(data);
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
            fetch_user_obj(route.params.userI);
          }, 750);
        } else {
          console.log("Update not successful");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  };
  const fetchUser = async (id) => {
    let params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
            setPublish(data[0].availability);
          });
        } else {
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
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
          });
        } else {
          // alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        // alert(e);
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
        <View pointerEvents={publish ? 'auto' : 'none'} style={publish ? {opacity: 1} : {opacity: .8}}>
        <View style={styles.line} />

        <View style={styles.info}>
          <Text style={texts.label_bold}> Offer: </Text>
          <Text style={texts.label}>{user.offer.tasks.join(", ")}</Text>
        </View>
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
