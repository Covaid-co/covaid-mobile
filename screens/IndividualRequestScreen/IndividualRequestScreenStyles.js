import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  entire_request_container: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  completed_header: {
    position: 'absolute',
    top: '0%',
    bottom: '55%',
    fontSize: 10,
    backgroundColor: 'rgba(58, 189, 36, 0.2)',
    minWidth: '100%',
    justifyContent: "center"
  },
  pending_header: {
    position: 'absolute',
    top: '0%',
    bottom: '55%',
    fontSize: 10,
    backgroundColor: 'rgba(38, 112, 255, 0.2)',
    minWidth: '100%',
    justifyContent: "center"
  },
  active_header: {
    position: 'absolute',
    top: '0%',
    bottom: '55%',
    fontSize: 10,
    backgroundColor: 'rgba(219, 147, 39, 0.2)',
    minWidth: '100%',
    justifyContent: "center"
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
    marginLeft: '3%',
    marginTop: '3%',
    width: '95%',
    height: '10%',
    backgroundColor: "#2670FF",
    borderColor: "#2670FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  reject: {
    marginLeft: '3%',
    marginTop: '3%',
    width: '95%',
    height: '10%',
    borderColor: "#EB5757",
    borderRadius: 8,
    borderWidth: 2,
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
  button_label_white: { //
    fontSize: 15,
    color: '#FFFFFF',
  },
  button_label_blue: { //
    fontSize: 15,
    color: Colors.blue,
  },
  button_label_green: { //
    fontSize: 15,
    color: "green",
  },
  button_label_red: {
    fontSize: 15,
    color: "red",
  },
  button_label_gray: { //
    fontSize: 15,
    color: "gray",
  },
  button_accept_label: {
    fontWeight: "normal",
    fontSize: 16, 
    color: "white",
    margin: '5%',
    padding: '1%',
    
  },
  button_reject_label: {
    fontSize: 16, 
    color: "#EB5757",
    margin: '5%',
    padding: '1%'
  }, 
  individual_req_header: {
    fontFamily: 'Montserrat-bold',
    color: '#333333',
    fontSize: 24, 
    margin: '5%'
  },
  info_header: {
    color: '#000000',
    left: '5%',
    fontSize: 16, 
    fontWeight: 'bold',
    marginTop: '3%'
  },
  details_header: {
    color: '#4F4F4F',
    left: '5%',
    fontSize: 16, 
    fontWeight: 'bold'
  },
  request_details: {
    color: '#7F7F7F',
    left: '5%',
    fontSize: 16, 
  },
  completion_date: {
    color: '#7F7F7F',
    textAlign: 'center',
    fontSize: 14, 
  }
});

export { styles, buttons, texts };