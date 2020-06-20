import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  dot: {
    borderRadius: 5,
    marginTop: 5,
    width: 10,
    height: 10,
    marginRight: 13,
    backgroundColor: "#EB5757",
  },
  container: {
    paddingLeft: 19,
    paddingTop: 21,
    paddingBottom: 16,
    paddingRight: 24,
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
    margin: 5,
  },
  input: {
    marginTop: 20,
    minHeight: 100,
    width: 375,
    paddingLeft: 10,
    fontSize: 17,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderRadius: 8,
    fontSize: 15,
  },
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 17,
    color: Colors.dark_grey,
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
  tasks: {
    fontSize: 14,
    color: "#7F7F7F",
    marginRight: 8,
  },
  distance: {
    fontSize: 14,
    color: "#7F7F7F",
    marginLeft: 8,
  },
  need_help: {
    fontWeight: "600",
    color: "#7F7F7F",
  },
  deadline: {
    fontSize: 14,
    color: "#EB5757",
  },
  timestamp: {
    fontSize: 14,
    color: "#7F7F7F",
    textAlign: "right",
    alignSelf: "flex-end",
  },
  header: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#4F4F4F",
    marginTop: 7,
  },
  footer: {
    fontSize: 14,
    color: "#7F7F7F",
  },
  details: {
    fontSize: 14,
    color: "#7F7F7F",
    marginTop: 7,
  },
});

export { styles, buttons, texts };
