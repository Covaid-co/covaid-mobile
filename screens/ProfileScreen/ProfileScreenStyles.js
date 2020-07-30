import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
    borderColor: Colors.standard,
    marginTop: "5%",
  },
  info: {
    flexDirection: "row",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
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
  label_blue: {
    fontFamily: "Inter-bold",
    fontSize: 17,
    color: Colors.blue,
  },
  button_label_blue: {
    fontSize: 15,
    color: Colors.blue,
  },
  name: {
    fontFamily: "Inter-bold",
    fontSize: 22,
    color: Colors.grey_font,
    marginBottom: "2%",
  },
  association: {
    fontFamily: "Inter",
    fontSize: 17,
    color: Colors.light_grey_font,
    marginBottom: "2%",
  },
});

export { styles, texts };
