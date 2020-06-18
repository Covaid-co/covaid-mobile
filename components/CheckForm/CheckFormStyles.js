import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  // selected: {
  //   margin: 5,
  //   padding: 5,
  //   height: 50,
  //   minWidth: 100,
  //   borderRadius: 8,
  //   borderWidth: 3,
  //   borderColor: Colors.blue,
  //   backgroundColor: Colors.blue,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // unselected: {
  //   margin: 5,
  //   padding: 5,
  //   height: 50,
  //   minWidth: 100,
  //   backgroundColor: "white",
  //   borderRadius: 8,
  //   borderWidth: 3,
  //   borderColor: Colors.blue,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // selected_text: {
  //   fontSize: 17,
  //   color: "white",
  // },
  // unselected_text: {
  //   fontSize: 17,
  //   color: Colors.blue,
  // },
  line: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginTop: "2%",
  },
  // form: {
  //   // flexDirection: "row",
  //   margin: 5,
  // },
  // input: {
  //   width: 350,
  //   height: 50,
  //   paddingLeft: 10,
  //   fontSize: 17,
  //   borderWidth: 2,
  //   borderColor: Colors.grey,
  //   borderRadius: 8,
  //   fontSize: 15,
  // },
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
