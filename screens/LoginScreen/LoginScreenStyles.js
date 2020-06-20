import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  content_container: {
    flex: 0.62,
  },
  footer: {
    flex: 0.1,
    justifyContent: "flex-start",
    marginLeft: "12.5%",
    marginRight: "12.5%",
    textAlign: "left",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#eeeeee",
    color: "#7F7F7F",
    fontFamily: "Inter",
    fontSize: 16,
    marginBottom: 48,
    paddingBottom: 10,
  },
  input_container: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30%",
  },
  screen: {
    flex: 1,
    paddingBottom: 0,
  },
});

const buttons = StyleSheet.create({
  disabled: {
    alignItems: "center",
    backgroundColor: Colors.grey,
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginTop: -5,
    paddingBottom: 15,
    paddingTop: 15,
  },
  login: {
    alignItems: "center",
    backgroundColor: "#2670FF",
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    marginTop: -5,
    paddingBottom: 15,
    paddingTop: 15,
  },
});

const texts = StyleSheet.create({
  button_label: {
    color: "#FFFFFF",
    fontFamily: "Inter-semibold",
    fontSize: 16,
  },
  footer_text: {
    color: "#CECECE",
    fontFamily: "Inter",
    fontSize: 14,
  },
  forgot_password: {
    color: "#314CCE",
    fontFamily: "Inter",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  header: {
    color: "#2670ff",
    fontFamily: "Baloo Chettan 2 Medium",
    fontSize: 50,
    marginBottom: -20,
    textAlign: "center",
  },
  subheader: {
    color: "#2670ff",
    fontFamily: "Baloo Chettan 2 Medium",
    fontSize: 29,
    textAlign: "center",
  },
});

export { styles, buttons, texts };
