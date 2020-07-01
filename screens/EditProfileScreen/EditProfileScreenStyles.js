import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    backgroundColor: "white",
  },
  line: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  form: {
    margin: 5,
  },
  input: {
    color: Colors.black,
    fontFamily: "Inter",
    fontSize: 17,
    height: 40,
    width: 350,
  },
  line: {
    borderColor: "#EEEEEE",
    borderWidth: 1,
  },
  loading: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});

const texts = StyleSheet.create({
  label: {
    color: Colors.grey_font,
    fontFamily: "Inter-bold",
    fontSize: 15,
  },
  label_bold: {
    color: "black",
    fontFamily: "Montserrat-bold",
    fontSize: 17,
  },
});

export { styles, texts };
