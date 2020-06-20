import { StyleSheet, Image, Text } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 20,
  },
  input: {
    borderColor: Colors.blue,
    borderRadius: 8,
    borderWidth: 3,
    color: Colors.blue,
    fontSize: 15,
    height: 49,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    width: 350,
  },
  logo: {
    height: 150,
    margin: 20,
    width: 150,
  },
  request: {
    backgroundColor: Colors.grey,
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    width: 330,
  },
  requestContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
});

const buttons = StyleSheet.create({
  disabled: {
    alignItems: "center",
    backgroundColor: Colors.grey,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
    width: 350,
  },
  login: {
    alignItems: "center",
    backgroundColor: Colors.blue,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
    width: 350,
  },
  pressed_tab: {
    alignItems: "center",
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
    borderRadius: 8,
    height: 30,
    justifyContent: "center",
    margin: 5,
    width: "32%",
  },
  signup: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: Colors.blue,
    borderRadius: 8,
    borderWidth: 3,
    height: 60,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
    width: 350,
  },
  tabs: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    height: 30,
    justifyContent: "center",
    margin: 5,
    width: "32%",
  },
});

const texts = StyleSheet.create({
  button_label: {
    color: "white",
    fontSize: 15,
  },
  button_label_blue: {
    color: Colors.blue,
    fontSize: 15,
  },
  header: {
    // marginBottom: 10,
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
  no_request: {
    color: "grey",
    fontSize: 15,
    textAlign: "left",
  },
  request_header: {
    color: "black",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  request_label: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "2%",
  },
  request_text: {
    fontSize: 15,
    margin: "2%",
  },
  request_title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export { styles, buttons, texts };
