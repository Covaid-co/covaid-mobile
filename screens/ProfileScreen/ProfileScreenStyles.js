import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  line: {
    borderWidth: 0.8,
    borderColor: Colors.grey,
    margin: "1%",
  },
});

const buttons = StyleSheet.create({
  edit: {
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  header: {
    margin: "1%",
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  label_bold: {
    fontFamily: "Montserrat-bold",
    fontSize: 17,
    color: "black",
  },
  label: {
    fontSize: 17,
    color: "black",
    flex: 1,
    flexWrap: "wrap",
    overflow: "visible",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
});

export { styles, buttons, texts };
