import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderWidth: 0.8,
    borderColor: Colors.grey,
    margin: "1%",
  },
  form: {
    // flexDirection: "row",
    margin: 5,
  },
  input: {
    width: 350,
    height: 50,
    paddingLeft: 10,
    fontSize: 17,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderRadius: 8,
    fontSize: 15,
  },
});

const buttons = StyleSheet.create({
  edit: {
    marginTop: 15,
    width: 350,
    height: 60,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  header: {
    margin: "1%",
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  label_bold: {
    fontFamily: "Montserrat-bold",
    fontSize: 17,
    color: "black",
  },
  label: {
    fontSize: 17,
    color: "black",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  green_text: {
    color: "green",
  },
  red_text: {
    color: "red",
  },
});

export { styles, buttons, texts };
