import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    height: "100%",
    padding: 20,
    backgroundColor: "white",
  },
=======
    padding: 20,
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
>>>>>>> dacfdd7ae71d6c6f163ceebc0e9b0890520a752e
  line: {
    borderWidth: 0.8,
    borderColor: Colors.grey,
    margin: "1%",
  },
<<<<<<< HEAD
  info: {
    flexDirection: "row",
    marginTop: 20,
=======
  form: {
    margin: 5,
  },
  input: {
    width: 350,
    height: 50,
    paddingLeft: 10,
    fontSize: 17,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderRadius: 8,
    fontSize: 15,
  },
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
>>>>>>> dacfdd7ae71d6c6f163ceebc0e9b0890520a752e
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
    fontSize: 17,
    color: "black",
<<<<<<< HEAD
    flex: 1,
    flexWrap: "wrap",
    overflow: "visible",
=======
>>>>>>> dacfdd7ae71d6c6f163ceebc0e9b0890520a752e
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  green_text: {
<<<<<<< HEAD
    color: "green",
  },
  red_text: {
=======
    fontSize: 17,
    color: "green",
  },
  red_text: {
    fontSize: 17,
>>>>>>> dacfdd7ae71d6c6f163ceebc0e9b0890520a752e
    color: "red",
  },
});

export { styles, buttons, texts };
