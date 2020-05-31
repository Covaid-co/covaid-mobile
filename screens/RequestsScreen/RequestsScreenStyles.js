import { StyleSheet, Image, Text } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5, 
    marginTop: 10, // TODO: standardize margin for each page 
    marginLeft: 10, 
    marginRight: 10, 
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
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
  request: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#D0D0D0', 
    borderRadius: 15,
    marginLeft: 10, 
    marginRight: 10, 
    width: 332,
    justifyContent: "center",
  },
  requestContainer: {
    position: 'absolute',
    top: 300, // change this when finalized 
    marginTop: 600, 
    justifyContent: "center",
    alignItems: "center",
  }
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
    marginBottom: 10,
    fontFamily: "Montserrat",
    fontSize: 40,
    color: "black",
    textAlign: "center",
  },
  button_label: {
    fontSize: 15,
    color: "white",
  },
  button_label_blue: {
    fontSize: 15,
    color: Colors.blue,
  },
  request_header: {
    marginBottom: 10,
    fontFamily: "Montserrat",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  request_title: {
    marginBottom: 10,
    marginLeft: 15, 
    marginRight: 15,
    marginTop: 10, 
    fontFamily: "Montserrat",
    fontSize: 20,
    color: "black",
    textAlign: "left",
  },
  request_text: {
    marginBottom: 10, 
    marginLeft: 15, 
    marginRight: 15, 
    fontSize: 15,
  },
});

export { styles, buttons, texts };
