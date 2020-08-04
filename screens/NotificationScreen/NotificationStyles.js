import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingBottom: 16,
    paddingLeft: 19,
    paddingRight: 24,
    paddingTop: 21,
    borderBottomColor: "rgba(206, 206, 206,0.7)",
    borderBottomWidth: 0.25,
    // borderTopColor: Colors.grey,
    // borderTopWidth: 0.75,
  },
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: Colors.deadlineRed,
    borderRadius: 5,
    height: 10,
    marginRight: 13,
    marginTop: 5,
    width: 10,
  },
  flexrow: {
    flexDirection: "row",
  },
  grow: {
    flexGrow: 1,
  },
  nonewnotifs: {
    paddingTop: 12,
    paddingLeft: 8,
    paddingRight: 10,
  },
  pleft: {
    paddingLeft: 23,
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
    color: Colors.deadlineRed,
    fontSize: 14,
  },
  details: {
    color: Colors.light_grey_font,
    fontSize: 14,
    marginTop: 7,
  },
  distance: {
    color: Colors.light_grey_font,
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    color: Colors.light_grey_font,
    fontSize: 14,
  },
  header: {
    color: Colors.grey_font,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    marginTop: 7,
  },
  need_help: {
    color: Colors.light_grey_font,
    fontWeight: "600",
  },
  nonewnotifs: {
    alignItems: "center",
    color: Colors.blue,
    fontSize: 14,
    textAlign: "center",
  },
  tasks: {
    color: Colors.light_grey_font,
    fontSize: 14,
    marginRight: 8,
  },
  timestamp: {
    alignSelf: "flex-end",
    color: Colors.light_grey_font,
    fontSize: 14,
    textAlign: "right",
  },
});

export { styles, texts };
