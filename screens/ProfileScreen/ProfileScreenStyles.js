import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
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
    marginTop: 20,
    display: "flex",
    alignItems: "center",
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
    marginLeft: "auto"
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  label_blue: {
    fontFamily: "Inter-bold",
    fontSize: 17,
    color: Colors.blue,
  }
  
});

export { styles, buttons, texts };
