import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    color: Colors.light_grey_font,
    fontFamily: "Inter",
    fontSize: 17,
    fontSize: 16,
    marginTop: 20,
    minHeight: 100,
    width: "100%",
  },
});

const texts = StyleSheet.create({
  label: {
    color: Colors.grey_font,
    fontFamily: "Inter-bold",
    fontSize: 17,
  },
});

export { styles, texts };
