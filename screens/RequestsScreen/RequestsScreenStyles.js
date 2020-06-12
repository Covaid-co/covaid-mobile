import { StyleSheet, Image, Text } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    backgroundColor: "white",
  },
  req_container: {
    padding: 0,
    height: "100%",
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
    margin: 20,
  },
  no_request: {
    margin: 5,
    padding: 5,
    minWidth: '100%',
    minHeight: '20%',
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  request_pending: {
    /*padding: 5,
    minWidth: '105%',
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderBottomColor: "white", 
    borderLeftColor: Colors.white, 
    borderRightColor: Colors.white,*/
    margin: 5,
    padding: 5,
    minWidth: '90%',
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderTopColor: "#FF5924",
  },
  request_active: {
    margin: 5,
    padding: 5,
    minWidth: '90%',
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderTopColor: "#DB9327",
  },
  request_completed: {
    margin: 5,
    padding: 5,
    minWidth: '90%',
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderTopColor: "#3ABD24",
  },
  requestContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
  },
  dropdown_style: {
    minWidth: '1000%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", 
  }
});

const buttons = StyleSheet.create({
  

});

const texts = StyleSheet.create({
  request_resource_text: {
    fontSize: 15,
    color: "#7F7F7F",
    textAlign: "left",
    padding: '2%',
    paddingBottom: '5%',
  },
  request_name_text: {
    fontSize: 20,
    color: "#4F4F4F",
    textAlign: "left",
    fontWeight: "bold",
    padding: '2%',
    fontFamily: "Montserrat-bold",
  },  
  request_date_text: {
    position: 'absolute', 
    right: '0%',
    top: '10%',
    fontSize: 15,
    color: "#7F7F7F",
    textAlign: "right",
    padding: '2%',
    fontWeight: 'normal'
  },
  request_general_text: {
    padding: '2%', 
  },
  no_request_text: {
    fontSize: 20,
    color: "#CECECE",
    fontWeight: "bold",
    textAlign: "center",
    padding: '2%',
    paddingBottom: '5%',
  },
  header: {
    // marginBottom: 10,
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
  no_request: {
    fontSize: 15,
    color: "grey",
    textAlign: "left",
  },
});

export { styles, buttons, texts };
