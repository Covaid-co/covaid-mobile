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
  loading: {
    height: "100%",
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
    color: Colors.black
  },
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

const buttons = StyleSheet.create({
  edit: {
    marginTop: 15,
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
    fontSize: 15,
    color: Colors.grey_font,
    fontFamily: "Inter-bold"
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
