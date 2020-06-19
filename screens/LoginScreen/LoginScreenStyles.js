import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    fontSize: 10,
    backgroundColor: "#FFFFFF",
  },
  input_container: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 80,
  },
  logo: {
    height: 150,
    width: 150,
    margin: 20,
  },
  input: {
    marginBottom: 36,
    paddingTop: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    fontSize: 16,
    color: "#7F7F7F",
  },
});

const buttons = StyleSheet.create({
  login: {
    marginBottom: 10,
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    marginBottom: 10,
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: Colors.blue,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    marginBottom: 10,
    marginTop: 10,
    width: 350,
    height: 60,
    backgroundColor: Colors.grey,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  header: {
    fontFamily: "Baloo Chettan 2 Medium",
    marginBottom: -20,
    fontSize: 50,
    color: "#2670ff",
    textAlign: "center",
  },
  subheader: {
    fontFamily: "Baloo Chettan 2 Medium",
    fontSize: 29,
    color: "#2670ff",
    textAlign: "center",
  },
  input_label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#4F4F4F",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  button_label_blue: {
    fontSize: 15,
    color: Colors.blue,
  },
});

export { styles, buttons, texts };
