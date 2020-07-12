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
} from "react-native";
import fetch_a from "../../util/fetch_auth";
import { homeURL } from "../../constants";

export default function ProfileHeader(props) {
  const [association, setAssociation] = useState("");
  const [image, setImage] = useState(
    "https://www.csfences.com/wp-content/uploads/2016/08/profile-placeholder.jpg"
  );
  const [uploadingImage, setUploadingImage] = useState({});
  const [isUploaded, setIsUploaded] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [imageUrl, setImageUrl] = useState("/api/image/" + props.user._id);

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

  useEffect(() => {
    fetchProfilePic(props.user._id);
  }, [props.user]);

  return (
    <>
      {/* <div style={{ marginLeft: 35, maxWidth: 2000 }}>
        <Row>
          <Col> */}
          <View>
            <Image
              source= {{uri:imageUrl}}
              //source={require("../../assets/images/C-LOGO.png")}
              id="profile-pic"
              style = {{height: 115, width: 115, borderRadius: 107, resizeMode : 'stretch', margin: 5 }}
              // style={{
              //   marginRight: 30,
              //   boxShadow:
              //     "0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
              //   cursor: "pointer",
              // }}
              onClick={() => setShowUploader(true)}
            />
            </View>

            {/* <Row>
              <h1
                id="home-heading"
                style={{
                  marginTop: 20,
                  marginBottom: 0,
                  display: "inline-block",
                  fontSize: 28,
                  color: "#4F4F4F",
                }}
              >
                {props.user.first_name} {props.user.last_name}
              </h1>
            </Row> */}
            {/* <Row>
              <p
                id="regular-text"
                style={{
                  marginLeft: 1,
                  marginTop: 4,
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                {association && association.length > 0
                  ? association
                  : "Covaid Volunteer"}{" "}
              </p>
            </Row> */}
            {/* <Row>
              <Button
                id="medium-button"
                style={{
                  paddingLeft: 34,
                  paddingRight: 34,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onClick={() => {
                  props.setShowAccountModal(true);
                }}
              >
                Edit Profile
              </Button>{" "}
            </Row> */}
          {/* </Col>
        </Row>
      </div> */}
      {/* <Modal
        show={showUploader}
        onHide={() => {
          setShowUploader(false);
          setIsUploaded(false);
          setUploadingImage({});
        }}
        style={{ marginTop: 10, paddingBottom: 50 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload a new profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageUploader
            withIcon={true}
            buttonText="Choose an image"
            onChange={onDrop}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            singleImage={true}
            withPreview={true}
          />
          <Button disabled={!isUploaded} id="large-button" onClick={upload}>
            Upload
          </Button>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
