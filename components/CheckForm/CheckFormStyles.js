import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  center: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
  },
  circle_blue: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    margin: 10,
    width: 30,
  },
  circle_grey: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    margin: 10,
    width: 30,
  },
  checkbox: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  label: {
    color: Colors.grey_font,
    flex: 1,
    flexWrap: "wrap",
    fontFamily: "Inter",
    fontSize: 17,
    overflow: "visible",
  },
});

export { styles };
