import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    padding: 20,
  },
  info: {
    flexDirection: "row",
    marginTop: 20,
  },
  line: {
    borderColor: Colors.grey,
    borderWidth: 0.8,
    margin: "1%",
  },
});

const buttons = StyleSheet.create({
  logout: {
    alignItems: "center",
    backgroundColor: Colors.grey,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginBottom: 100,
    marginTop: 15,
    width: 350,
  },
});

const texts = StyleSheet.create({
  button_label: {
    color: "white",
    fontSize: 15,
  },
  green_text: {
    color: "green",
  },
  header: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    margin: "1%",
  },
  label: {
    color: "black",
    flex: 1,
    flexWrap: "wrap",
    fontSize: 17,
    overflow: "visible",
  },
  label_bold: {
    color: "black",
    fontFamily: "Montserrat-bold",
    fontSize: 17,
  },
  red_text: {
    color: "red",
  },
});

export { styles, buttons, texts };
