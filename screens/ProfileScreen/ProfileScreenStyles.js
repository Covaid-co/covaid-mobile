import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  arrow: {
    height: 15,
    marginLeft: "auto",
    width: 15,
  },
  center: {
    alignItems: "center",
    backgroundColor: Colors.white,
    marginTop: "5%",
  },
  container: {
    backgroundColor: "white",
  },
  drive: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  line: {
    borderColor: "#EEEEEE",
    borderWidth: 1,
    marginTop: "5%",
  },
  loading: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});

const texts = StyleSheet.create({
  association: {
    color: Colors.light_grey_font,
    fontFamily: "Inter",
    fontSize: 17,
    marginBottom: "2%",
  },
  button_label_blue: {
    color: Colors.blue,
    fontSize: 15,
  },
  label: {
    color: Colors.grey_font,
    flex: 1,
    flexWrap: "wrap",
    fontFamily: "Inter",
    fontSize: 17,
    marginLeft: "auto",
    overflow: "visible",
    textAlign: "right",
  },
  label_blue: {
    color: Colors.blue,
    fontFamily: "Inter-bold",
    fontSize: 17,
  },
  label_bold: {
    color: Colors.grey_font,
    fontFamily: "Inter-bold",
    fontSize: 17,
  },
  name: {
    color: Colors.grey_font,
    fontFamily: "Inter-bold",
    fontSize: 22,
    marginBottom: "2%",
  },
});

export { styles, texts };
