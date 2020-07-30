import React, { useEffect, useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
// import Modal from "react-bootstrap/Modal";
import { generateURL } from "../../Helpers";
//import ImageUploader from "react-images-upload";
//import ImagePicker from 'react-native-image-picker'
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Modal,
  TextInput,
  Alert,
  Keyboard,
  Button,
} from "react-native";
import * as Permissions from "expo-permissions";
import fetch_a from "../../util/fetch_auth";
import { homeURL } from "../../constants";
import {
  styles,
  buttons,
  texts,
} from "../../screens/ProfileScreen/ProfileScreenStyles";
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

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setUploadingImage(pictureFiles[0]);
    setIsUploaded(true);
  };

  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadingImage);

    fetch_a("token", "/api/image", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json().then((data) => {
          window.location.reload(false);
        });
      })
      .catch((err) => alert("Error: " + err));
  };

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
    const formData = new FormData();
    console.log("It's supposed to upload " + uri + " to their profile here");
  }

  function handleUpdatePicture() {
    Alert.alert(
      "Would you like to take a new photo or upload an existing photo from camera roll?",
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

        <TouchableOpacity
          onPress={() => {
            console.log("bring up edit options!!!");
            handleUpdatePicture();
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            //source={require("../../assets/images/C-LOGO.png")}
            id="profile-pic"
            style={{
              height: 115,
              width: 115,
              borderRadius: 107,
              resizeMode: "stretch",
              margin: 5,
            }}
            // style={{
            //   marginRight: 30,
            //   boxShadow:
            //     "0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
            //   cursor: "pointer",
            // }}
            onClick={() => {
              handleUpdatePicture();
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
