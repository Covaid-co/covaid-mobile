import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DeprecatedViewPropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewPropTypes';

export default class ProfilePicturePicker extends React.Component {
  state = {
    image: null,
    select: true, 
  };

  render() {
    let { image } = this.state;
    if (this.props.openCameraRoll) {
      console.log("Picking image")
      this._pickImage(); 
    } /*else {
      console.log("Taking picture")
      this._takeImage(); 
    }*/
    return (
      <></>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios /*&& this.props.openCameraRoll*/) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        this.props.setShowImagePicker(false); 
        this.props.setOpenCameraRoll(false);
      }
    } /*else if (Constants.platform.ios && !this.props.openCameraRoll) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        this.props.setShowImagePicker(false); 
      }
    }*/
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result);
      
        //this.props.setImageUrl(result.uri); 
        this.props.setShowImagePicker(false); 
        this.props.uploadProfilePic(result.uri); 
      }
      //this.setState({ select: false });
      this.props.setShowImagePicker(false); 

      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  /*_takeImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.props.setImageUrl(result.uri); 
        this.props.uploadProfilePic(results.uri); 
      }
      //this.setState({ select: false });
      this.props.setShowImagePicker(false); 

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };*/
}
