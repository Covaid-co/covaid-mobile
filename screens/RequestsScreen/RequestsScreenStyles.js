import { StyleSheet, Image, Text } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  input: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    width: 350,
    height: 49,
    borderWidth: 3,
    borderColor: Colors.blue,
    borderRadius: 8,
    fontSize: 15,
    color: Colors.blue,
  },
  request: {
    margin: 5,
    padding: 5,
    height: 50,
    minWidth: 100,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  request_pending: {
    marginTop: 10,
    padding: 20,
    borderColor: Colors.grey,
    borderRadius: 4,
    width: 330,
  },
  request_active: {
    marginTop: 10,
    padding: 20,
    borderColor: Colors.grey,
    borderRadius: 4,
    width: 330,
  },
  request_completed: {
    margin: 5,
    padding: 5,
    height: 50,
    minWidth: 100,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
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
});

const buttons = StyleSheet.create({
  tabs: {
    margin: 5,
    width: "32%",
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",

  },
  pressed_tab: {
    margin: 5,
    width: "32%",
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.blue,
    borderColor: Colors.blue, 
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    marginBottom: 10,
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    marginBottom: 10,
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    marginBottom: 10,
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: Colors.grey,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  header: {
    // marginBottom: 10,
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  button_label_blue: {
    fontSize: 15,
    color: Colors.blue,
  },
  request_header: {
    marginBottom: 10,
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  request_title: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    fontWeight: "bold", 
  },
  no_request: {
    fontSize: 15,
    color: "grey",
    textAlign: "left",
  },
  request_text: {
    fontSize: 15,
    margin: "2%"
  },
  request_label: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "2%", 
  },
});

export { styles, buttons, texts };
