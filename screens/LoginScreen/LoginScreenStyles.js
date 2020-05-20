import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flexWrap: "wrap",
  },
});

const buttons = StyleSheet.create({
  primary: {
    flex: 1,
    height: 70,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

const texts = StyleSheet.create({
  header: {
    fontFamily: "Montserrat-Black",
    fontSize: 48,
    marginLeft: 20,
    color: "blue",
  },
});

export { styles, buttons, texts };
