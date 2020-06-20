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
    borderColor: "#EEEEEE",
    borderWidth: 1,
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
