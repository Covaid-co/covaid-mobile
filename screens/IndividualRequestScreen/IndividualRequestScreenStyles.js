import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
  },
  container2: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
  },
  container3: {
    marginTop: "5%",
    fontSize: 10,
    margin: "5%"
  },
  logo: {
    height: 150,
    width: 150,
    margin: 20,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    width: 350,
    height: 49,
    borderWidth: 3,
    borderColor: Colors.blue,
    borderRadius: 8,
    fontSize: 15,
    color: Colors.blue,
  },
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
  },
});

const buttons = StyleSheet.create({
  accept: {
    margin: 10,
    width: 150,
    height: 60,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "green",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  reject: {
    margin: 10,
    width: 150,
    height: 60,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    margin: 10, 
    width: 150,
    height: 60,
    backgroundColor: Colors.grey,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  }
});

const texts = StyleSheet.create({
  header: {
    marginBottom: 10,
    fontFamily: "Montserrat",
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
  label: {
    margin: "10%",
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  desc: {
    margin: "1%",
    fontSize: 18,
    color: "black",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  button_label_blue: {
    fontSize: 15,
    color: Colors.blue,
  },
  button_label_green: {
    fontSize: 15,
    color: "green",
  },
  button_label_red: {
    fontSize: 15,
    color: "red",
  },
  button_label_gray: {
    fontSize: 15,
    color: "gray",
  },
});

export { styles, buttons, texts };