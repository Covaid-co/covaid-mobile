import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 10,
  },
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  info: {
    flexDirection: "row",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  arrow: {
    height: 15,
    width: 15,
    marginLeft: "auto",
  },
});

const buttons = StyleSheet.create({
  edit: {
    marginTop: 15,
    marginBottom: 100,
    width: 350,
    height: 60,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  label_bold: {
    fontFamily: "Inter-bold",
    fontSize: 17,
    color: Colors.grey_font,
  },
  label: {
    fontFamily: "Inter",
    fontSize: 17,
    color: Colors.grey_font,
    flex: 1,
    flexWrap: "wrap",
    overflow: "visible",
    marginLeft: "auto",
    textAlign: "right",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  label_blue: {
    fontFamily: "Inter-bold",
    fontSize: 17,
    color: Colors.blue,
  },
});

export { styles, buttons, texts };
