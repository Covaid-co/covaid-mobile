import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    minHeight: '100%',
    minWidth: '100%', 
  },
  individual_req_container: {
    fontSize: 10,
    backgroundColor: '#FFFFFF',
    minWidth: '0%',
    minHeight: '100%', 
  },
  requester_name_container: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.grey,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  input: {
    margin: '5%',
    paddingLeft: '3%',
    width: '90%',
    height: 49,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: '#CECECE',
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
    marginLeft: '3%',
    marginTop: '3%',
    width: '95%',
    height: '30%',
    backgroundColor: "#2670FF",
    borderColor: "#2670FF",
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
  label: {
    margin: "10%",
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  button_label: {
    padding: '3%',
    fontSize: 15,
    color: '#FFFFFF',
  },
  desc: {
    paddingLeft: '3%',
    color: '#4F4F4F',
    left: '5%',
    fontSize: 16, 
    marginTop: '3%'
  },
  header: {
    fontFamily: 'Montserrat-bold',
    color: '#333333',
    fontSize: 24, 
    margin: '5%'
  },
});

export { texts, styles, buttons };
