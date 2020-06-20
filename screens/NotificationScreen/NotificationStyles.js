import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 16,
    paddingLeft: 19,
    paddingRight: 24,
    paddingTop: 21,
  },
  dot: {
    backgroundColor: "#EB5757",
    borderRadius: 5,
    height: 10,
    marginRight: 13,
    marginTop: 5,
    width: 10,
  },
  grow: {
    flexGrow: 1,
  },
  resources: {
    flexDirection: "row",
    marginTop: 6,
  },
  rhs: {
    alignItems: "flex-end",
  },
  screen: {
    flex: 1,
  },
});

const texts = StyleSheet.create({
  deadline: {
    color: "#EB5757",
    fontSize: 14,
  },
  details: {
    color: "#7F7F7F",
    fontSize: 14,
    marginTop: 7,
  },
  distance: {
    color: "#7F7F7F",
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    color: "#7F7F7F",
    fontSize: 14,
  },
  header: {
    color: "#4F4F4F",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    marginTop: 7,
  },
  need_help: {
    color: "#7F7F7F",
    fontWeight: "600",
  },
  tasks: {
    color: "#7F7F7F",
    fontSize: 14,
    marginRight: 8,
  },
  timestamp: {
    alignSelf: "flex-end",
    color: "#7F7F7F",
    fontSize: 14,
    textAlign: "right",
  },
});

export { styles, texts };
