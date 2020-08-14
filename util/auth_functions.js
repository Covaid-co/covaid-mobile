import AsyncStorage from "@react-native-community/async-storage";
import { homeURL, storage_keys, volunteer_status } from "../constants";
import { Alert } from "react-native";
import fetch_a from "./fetch_auth";
import React, { useState, useEffect } from "react";
import { generateURL } from "../Helpers";

async function storeZip(new_zip) {
  try {
    await AsyncStorage.setItem(storage_keys.SAVE_ZIP, new_zip);
  } catch (err) {
    console.log("Zip could not be stored!");
    alert(err);
  }
}

async function fetchZip() {
  try {
    return await AsyncStorage.getItem(storage_keys.SAVE_ZIP);
  } catch (err) {
    console.log("Zip does not exist in storage!");
  }
}
async function storeToken(token) {
  try {
    await AsyncStorage.setItem(storage_keys.SAVE_TOKEN_KEY, token);
  } catch (err) {
    console.log("Token could not be stored!");
    alert(err);
  }
}
async function fetchToken() {
  try {
    return await AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY);
  } catch (err) {
    console.log("Token does not exist in storage!");
  }
}
async function storeRefresh(refresh) {
  try {
    await AsyncStorage.setItem(storage_keys.SAVE_REFRESH_KEY, refresh);
  } catch (e) {
    console.log("Refresh token could not be stored!");
    alert(e);
  }
}
async function fetchRefresh() {
  try {
    return await AsyncStorage.getItem(storage_keys.SAVE_REFRESH_KEY);
  } catch (err) {
    console.log("Refresh token does not exist in storage!");
  }
}
async function storeID(id) {
  try {
    await AsyncStorage.setItem(storage_keys.SAVE_ID_KEY, id);
  } catch (e) {
    console.log("ID could not be stored!");
    alert(e);
  }
}
async function fetchID() {
  try {
    return await AsyncStorage.getItem(storage_keys.SAVE_ID_KEY);
  } catch (err) {
    console.log("ID does not exist in storage!");
  }
}
async function fetchAllTokens() {
  try {
    const results = await AsyncStorage.multiGet([
      storage_keys.SAVE_ID_KEY,
      storage_keys.SAVE_TOKEN_KEY,
      storage_keys.SAVE_REFRESH_KEY,
      storage_keys.SAVE_ZIP,
    ]);
    return {
      id: results[0][1],
      token: results[1][1],
      refresh: results[2][1],
      zip: results[3][1],
    };
  } catch (err) {
    throw err;
  }
}

async function handleLogout(navigation, route) {
  const refreshToken = await AsyncStorage.getItem(
    storage_keys.SAVE_REFRESH_KEY
  );
  if (!refreshToken) {
    console.log("Refresh token could not be retrieved from async storage.");
    navigation.navigate("Login", route.params);
  }
  const form = {
    refresh: refreshToken,
  };

  fetch(homeURL + "/api/users/logoutMobile/", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  })
    .then((response) => {
      if (response.ok) {
        AsyncStorage.multiRemove([
          storage_keys.SAVE_ID_KEY,
          storage_keys.SAVE_TOKEN_KEY,
          storage_keys.SAVE_REFRESH_KEY,
        ]);
        navigation.navigate("Login", route.params);
      } else if (response.status === 403) {
        navigation.navigate("Login", route.params);
      } else {
        console.log(
          "An unknown error has occured and your authorization has expired. Redirecting to login anyway."
        );
        navigation.navigate("Login", route.params);
      }
    })
    .catch((e) => {
      alert("ERROR: " + e);
    });
}

async function fetchUser(navigation, route) {
  const token = await AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY);
  if (!token) {
    console.log("Token could not be retrieved from async storage.");
    return null;
  }
  var url = homeURL + "/api/users/currentMobile";
  try {
    const res = await fetch_a(token, "token", url, {
      method: "get",
    });
    if (res.ok) {
      let userObj = await res.json();
      if (userObj._id && userObj._id.length !== 0) {
        return userObj;
      } else {
        console.log("----***AUTH_FUNCTIONS*** User NOT returned ----\n");
        if (navigation) {
          handleRefresh(navigation, route);
        } else {
          return null;
        }
      }
    } else if (res.status === 403) {
      console.log("----***AUTH FUNCTIONS***  Token Expired! ----\n");
      if (navigation) {
        console.log("YES NAV EXISTS");
        handleRefresh(navigation, route);
      } else {
        return null;
      }
    }
  } catch (e) {
    throw e;
  }
}
async function handleRefresh(navigation, route) {
  // dont actually pass refresh in as a parameter lol
  const refreshToken = await AsyncStorage.getItem(
    storage_keys.SAVE_REFRESH_KEY
  );
  if (!refreshToken) {
    console.log("Refresh token could not be retrieved from async storage.");
    return null;
  }
  const form = {
    refresh: refreshToken,
  };
  console.log("MADE IT HERE: ", refreshToken);
  fetch(homeURL + "/api/users/refresh/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Refresh " + refreshToken,
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (data.accessToken) {
            console.log("New token is stored in : ", data.accessToken);
            storeToken(data.accessToken);
          }
          return data;
        });
      } else if (navigation) {
        handleLogout(navigation, route);
      } else if (response.status === 403) {
        console.log(
          "Refresh token is expired OR invalid. Your session has expired. You will now be logged out."
        );
        return null;
      } else if (response.status === 401) {
        console.log("Refresh token is invalid");
        return null;
      } else if (response.status === 400) {
        console.log("No user found with id retrieved from refresh token");
        return null;
      }
      console.log(
        "An unknown error has occured (refresh token probs invalid)."
      );
      return null;
    })
    .catch((e) => {
      alert("ERROR: " + e);
      return null;
    });
}

const fetchPendingRequests = async function (navigation, route) {
  try {
    const token = await fetchToken();
    if (!token) {
      console.log("Token could not be retrieved from async storage.");
      navigation.navigate("Login", route.params);
    }
    const params = { status: volunteer_status.PENDING };
    var url = generateURL(
      homeURL + "/api/request/volunteerRequestsMobile?",
      params
    );
    const res = await fetch_a(token, "token", url, {
      method: "get",
    });
    if (res.ok) {
      const requests = await res.json();
      if (requests) {
        return requests;
      } else {
        console.log("Requests fetched but data not parsed or DNE");
      }
    } else {
      console.log("Request Fetch Error");
      if (navigation) {
        console.log("navigation exists");
        handleRefresh(navigation, route);
      }
    }
  } catch (err) {
    console.log("Fetching pending requests error: ", err);
  }
};
async function fetchActiveRequests(navigation, route) {
  try {
    const token = await fetchToken();
    if (!token) {
      console.log("Token could not be retrieved from async storage.");
      navigation.navigate("Login", route.params);
    }
    const params = { status: volunteer_status.IN_PROGRESS };
    var url = generateURL(
      homeURL + "/api/request/volunteerRequestsMobile?",
      params
    );
    const res = await fetch_a(token, "token", url, {
      method: "get",
    });
    if (res.ok) {
      const requests = await res.json();
      if (requests) {
        return requests;
      } else {
        console.log("Requests fetched but data not parsed or DNE");
      }
    } else {
      console.log("Notification Request Fetch Error");
    }
  } catch (err) {
    console.log("Fetching active requests error: ", err);
  }
}

const fetchCompletedRequests = async (navigation, route) => {
  try {
    const token = await fetchToken();
    if (!token) {
      console.log("Token could not be retrieved from async storage.");
      navigation.navigate("Login", route.params);
    }
    const params = { status: volunteer_status.COMPLETE };
    var url = generateURL(
      homeURL + "/api/request/volunteerRequestsMobile?",
      params
    );
    const res = await fetch_a(token, "token", url, {
      method: "get",
    });
    if (res.ok) {
      const requests = await res.json();
      if (requests) {
        return requests;
      } else {
        console.log("Requests fetched but data not parsed or DNE");
      }
    } else {
      console.log("Notification Request Fetch Error");
    }
  } catch (err) {
    console.log("Fetching completed requests error: ", err);
  }
};

const updateUser = async (navigation, route, params) => {
  try {
    const token = await fetchToken();
    fetch_a(token, "token", homeURL + "/api/users/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User updated! Accepted changes: ", params);
        } else {
          console.log("User NOT updated! Rejected changes", params);
          if (navigation) {
            handleRefresh(navigation, route);
          }
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  } catch (err) {
    console.log("Updating user error: ", err);
  }
};
export {
  handleRefresh,
  handleLogout,
  fetchUser,
  storeZip,
  fetchZip,
  storeToken,
  fetchToken,
  fetchAllTokens,
  fetchPendingRequests,
  fetchActiveRequests,
  fetchCompletedRequests,
  updateUser,
};
