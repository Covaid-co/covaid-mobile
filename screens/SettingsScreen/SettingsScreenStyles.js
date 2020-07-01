import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
  },
});

const buttons = StyleSheet.create({
  logout: {
    marginTop: 30,
    marginBottom: 100,
    width: "100%",
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.blue,
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 15,
    width: 350,
  },
});

const texts = StyleSheet.create({
  label_bold: {
    fontFamily: "Inter-bold",
    fontSize: 17,
    color: Colors.grey_font,
  },
});

export { styles, buttons, texts };
