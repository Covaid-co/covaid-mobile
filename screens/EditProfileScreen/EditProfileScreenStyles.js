import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  form: {
    margin: 5,
  },
  input: {
    width: 350,
    height: 40,
    fontSize: 17,
    fontFamily: "Inter",
    color: Colors.black,
  },
});

const texts = StyleSheet.create({
  label: {
    fontSize: 15,
    color: Colors.grey_font,
    fontFamily: "Inter-bold",
  },
});

export { styles, texts };
