import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, Switch} from "react-native";
import Colors from "../../public/Colors";

import { styles, buttons, texts } from "./SettingsScreenStyles";
import { homeURL } from "../../constants";
import { generateURL, validateEmail } from "../../Helpers";
import fetch_a from "../../util/fetch_auth";
import { NavigationEvents } from 'react-navigation';

export default function ProfileScreen({ route, navigation }) {
  const [publish, setPublish] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [user, setUser] = useState();

  const toggleSwitch = () => {
    handleUpdate(!publish);
    setPublish(!publish);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch_user_obj(route.params.userID);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleUpdate = async (publish) => {
    let params = {
      availability: publish,
    };
    var url = generateURL(homeURL + "/api/users/update?", params);
    fetch_a(route.params.token, "token", url, {
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
          alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
    return (
      <View style={styles.container}>
          <TouchableOpacity>
              <Text>LOGOUT BITCH</Text>
          </TouchableOpacity>       
      </View>
    );
}
