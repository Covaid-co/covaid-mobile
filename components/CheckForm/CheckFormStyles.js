import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  center: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: Colors.white,
    flex: 1,
  },
  circle_blue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.blue,
    borderWidth: 1,
    borderColor: Colors.blue,
    margin: 10,
  },
  circle_grey: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey,
    margin: 10,
  },
  checkbox: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  label: {
    fontFamily: "Inter",
    fontSize: 17,
    color: Colors.grey_font,
    flex: 1,
    flexWrap: "wrap",
    overflow: "visible",
  },
});

export { styles };
