import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    fontSize: 10,
    justifyContent: "center",
    marginTop: 100,
  },
  container2: {
    alignItems: "center",
    fontSize: 10,
    justifyContent: "center",
    marginTop: "5%",
  },
  container3: {
    fontSize: 10,
    marginTop: "5%",
    margin: "5%",
  },
  input: {
    borderColor: Colors.blue,
    borderRadius: 8,
    borderWidth: 3,
    color: Colors.blue,
    fontSize: 15,
    height: 49,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    width: 350,
  },
  logo: {
    height: 150,
    margin: 20,
    width: 150,
  },
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
});

const buttons = StyleSheet.create({
  accept: {
    alignItems: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "green",
    borderRadius: 8,
    borderWidth: 3,
    height: 60,
    justifyContent: "center",
    justifyContent: "center",
    margin: 10,
    width: 150,
  },
  disabled: {
    alignItems: "center",
    backgroundColor: Colors.grey,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
    width: 350,
  },
  reject: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "red",
    borderRadius: 8,
    borderWidth: 3,
    height: 60,
    justifyContent: "center",
    margin: 10,
    width: 150,
  },
});

const texts = StyleSheet.create({
  button_label: {
    color: "white",
    fontSize: 15,
  },
  button_label_blue: {
    color: Colors.blue,
    fontSize: 15,
  },
  button_label_green: {
    color: "green",
    fontSize: 15,
  },
  button_label_red: {
    color: "red",
    fontSize: 15,
  },
  desc: {
    color: "black",
    fontSize: 18,
    margin: "1%",
  },
  header: {
    color: "black",
    fontFamily: "Montserrat",
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    margin: "10%",
  },
});

export { styles, buttons, texts };
