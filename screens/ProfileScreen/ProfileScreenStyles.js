import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  center: {
    marginTop: "5%",
    backgroundColor: Colors.white,
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
    marginTop: "5%",
  },
  info: {
    flexDirection: "row",
    marginTop: 26,
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: -4,
  },
  drive: {
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

const texts = StyleSheet.create({
  label_bold: {
    fontFamily: "Inter-bold",
    fontSize: 18,
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
  label_blue: {
    fontFamily: "Inter-bold",
    fontSize: 18,
    color: Colors.blue,
  },
  button_label_blue: {
    fontFamily: "Inter",
    marginTop: 15,
    fontSize: 14,
    color: Colors.blue,
  },
  name: {
    fontFamily: "Montserrat-bold",
    fontSize: 24,
    letterSpacing: -0.04,
    color: Colors.grey_font,
    marginTop: 9,
  },
  association: {
    fontSize: 14,
    marginTop: 2,
    color: Colors.light_grey_font,
    fontFamily: "Inter",
  },
});

export { styles, texts };
