import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    marginTop: 20,
    minHeight: 100,
    fontSize: 16,
    color: Colors.light_grey_font,
    fontFamily: "Inter",
    width: "100%",
  },
});

const texts = StyleSheet.create({
  label: {
    fontSize: 17,
    color: Colors.grey_font,
    fontFamily: "Inter-bold",
  },
});

export { styles, texts };
