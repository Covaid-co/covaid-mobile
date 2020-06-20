import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 0,
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
    fontFamily: "Inter",
    color: "#7F7F7F",
  },
  footer: {
    flex: 0.1,
    justifyContent: "flex-start",
    marginLeft: "12.5%",
    marginRight: "12.5%",
    textAlign: "left",
  },
});

const buttons = StyleSheet.create({
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
