import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { styles, texts } from "./EditProfileScreenStyles";
import { homeURL } from "../../constants";
import { generateURL, validateEmail, extractTrueObj } from "../../Helpers";
import CheckForm from "../../components/CheckForm/CheckForm";
import Colors from "../../public/Colors";
import Geocode from "react-geocode";
import fetch_a from "../../util/fetch_auth";

export default function LoginScreen({ route, navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={{ margin: 10 }} onPress={() => handleSubmit()}>
        <Text style={{ color: Colors.blue, fontFamily: "Inter", fontSize: 16 }}>
          {" "}
          Done{" "}
        </Text>
      </TouchableOpacity>
    ),
  });

  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [languageChecked, setLanguageChecked] = useState({});

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
    const params = { id: id };
    var url = generateURL(homeURL + "/api/users/user?", params);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data[0]);
            setConstants(data[0]);
          });
        } else {
          // alert("Error obtaining user object");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const setConstants = (data) => {
    const params = {};
    var url = generateURL(homeURL + "/api/apikey/google", params);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          response.json().then((key) => {
            Geocode.setApiKey(key.google);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setEmail(data.email);
            setPhone(data.phone);
            setCurrentUserObject(data.languages, languages, setLanguageChecked);
          });
        } else {
          // console.log("Error");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  const setCurrentUserObject = (userList, fullList, setFunction) => {
    for (var i = 0; i < fullList.length; i++) {
      const curr = fullList[i];
      const include = userList.includes(curr);
      setFunction((prev) => ({
        ...prev,
        [curr]: include,
      }));
    }
  };

  const checkInputs = () => {
    var valid = true;
    if (Object.values(languageChecked).every((v) => v === false)) {
      alert("Need to select a language");
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

    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      languages: selectedLanguages,
    };

    fetch_a(route.params.token, "token", homeURL + "/api/users/update", {
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
        console.log("Edit Profile Screen Error");
      });
  }

  function form(header, change, value) {
    return (
      <View style={styles.form}>
        <Text style={texts.label}>{header}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => change(input.trim())}
          defaultValue={value}
        />
        <View style={styles.line} />
      </View>
    );
  }
  if (user) {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {form("First Name", setFirstName, firstName)}
          {form("Last Name", setLastName, lastName)}
          {form("Email", setEmail, email)}
          <View style={styles.form}>
            <Text style={texts.label}>{"Phone #"}</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(input) => setPhone(input.trim())}
              defaultValue={phone}
            />
            <View style={styles.line} />
          </View>
        </View>
        <CheckForm obj={languageChecked} setObj={setLanguageChecked} />
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
