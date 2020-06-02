import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  selected: {
    margin: 5,
    padding: 5,
    height: 50,
    minWidth: 100,
    borderRadius: 8,
    borderWidth: 3,
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  unselected: {
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
  selected_text: {
    fontSize: 17,
    color: "white",
  },
  unselected_text: {
    fontSize: 17,
    color: Colors.blue,
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
  center: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",

  }
});

export { styles };
