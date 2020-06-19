import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content_container: {
    flex: 0.62,
  },
  input_container: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30%",
  },
  input: {
    marginBottom: 48,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eeeeee",
    fontSize: 16,
    fontFamily: "Inter-semibold",
    color: "#4F4F4F",
  },
  footer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    textAlign: "left",
    flex: 0.05,
    flexDirection: "row",
  },
});

const buttons = StyleSheet.create({
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
  login: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: -5,
    height: 60,
    backgroundColor: "#2670FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: -5,
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
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Inter-semibold",
  },
  forgot_password: {
    marginTop: 16,
    fontFamily: "Inter",
    fontSize: 16,
    color: "#314CCE",
    textAlign: "center",
  },
  footer_text: {
    color: "#CECECE",
    fontFamily: "Inter",
    fontSize: 14,
  },
});

export { styles, buttons, texts };
