import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  AsyncStorage,
  Image,
  Alert,
} from "react-native";
import * as Permissions from "expo-permissions";
import fetch_a from "../../util/fetch_auth";
import { homeURL, storage_keys } from "../../constants";
import ProfilePicturePicker from "./ProfilePicturePicker.js";

export default function ProfileHeader(props) {
  const [association, setAssociation] = useState("");
  const [image, setImage] = useState(
    "https://www.csfences.com/wp-content/uploads/2016/08/profile-placeholder.jpg"
  );
  const [uploadingImage, setUploadingImage] = useState({});
  //const [isUploaded, setIsUploaded] = useState(false);
  //const [showUploader, setShowUploader] = useState(false);
  const [imageUrl, setImageUrl] = useState("/api/image/" + props.user._id);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [openCameraRoll, setOpenCameraRoll] = useState();

  const fetchProfilePic = (id) => {
    fetch(homeURL + "/api/image/" + id).then((response) => {
      if (response.ok) {
        setImageUrl(homeURL + "/api/image/" + props.user._id);
      } else {
        setImageUrl(
          "https://www.csfences.com/wp-content/uploads/2016/08/profile-placeholder.jpg"
        );
      }
    });
  };

  function uploadProfilePic(uri) {
    let formData = new FormData();
    formData.append("file", {
      uri: uri.replace("file://", ""),
      name: "file",
      type: "image/jpg",
    });

    AsyncStorage.getItem(storage_keys.SAVE_TOKEN_KEY).then((token) => {
      fetch_a(token, "token", homeURL + "/api/image", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          response.json().then((data) => {
            setImageUrl(uri);
          });
        })
        .catch((err) => alert("Error: " + err));
    });
  }

  function handleUpdatePicture() {
    Alert.alert(
      "Would you like to upload an existing photo from camera roll?",
      "",
      [
        /*{  
          text: 'Take Photo',  
          onPress: () => {
            setOpenCameraRoll(false); 
            setShowImagePicker(true);
          },   
        },  */
        {
          text: "Upload",
          onPress: () => {
            setOpenCameraRoll(true);
            setShowImagePicker(true);
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            setOpenCameraRoll(false);
            setShowImagePicker(false);
          },
        },
      ]
    );
  }

  useEffect(() => {
    setShowImagePicker(false);
    fetchProfilePic(props.user._id);
  }, [props.user]);

  return (
    <>
      <View>
        {showImagePicker && (
          <ProfilePicturePicker
            setImageUrl={setImageUrl}
            setShowImagePicker={setShowImagePicker}
            uploadProfilePic={uploadProfilePic}
            openCameraRoll={openCameraRoll}
            setOpenCameraRoll={setOpenCameraRoll}
          />
        )}

        {/* <TouchableOpacity
          onPress={() => {
            console.log("bring up edit options!!!");
            handleUpdatePicture();
          }}
        > */}
          <Image
            source={{ uri: imageUrl }}
            id="profile-pic"
            style={{
              height: 115,
              width: 115,
              borderRadius: 107,
              resizeMode: "stretch",
              margin: 5,
            }}
          />
        {/* </TouchableOpacity> */}
      </View>
    </>
  );
}
