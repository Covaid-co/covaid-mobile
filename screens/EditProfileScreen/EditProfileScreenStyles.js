import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    paddingTop: "5%",
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
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
});

const buttons = StyleSheet.create({
  edit: {
    alignItems: "center",
    backgroundColor: Colors.blue,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginTop: 15,
    width: 350,
  },
});

const texts = StyleSheet.create({
  header: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    margin: "1%",
  },
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
  // button_label: {
  //   fontSize: 15,
  //   color: "white",
  // },
  // green_text: {
  //   fontSize: 17,
  //   color: "green",
  // },
  // red_text: {
  //   fontSize: 17,
  //   color: "red",
  // },
});

export { styles, buttons, texts };
