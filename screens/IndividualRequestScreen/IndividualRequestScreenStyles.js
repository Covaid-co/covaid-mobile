import { StyleSheet } from "react-native";
import Colors from "../../public/Colors";

const styles = StyleSheet.create({
  modal_background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  completed_modal_view: {
    backgroundColor: "white",
    minWidth: '100%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: '#3ABD24',
    borderWidth: 3,
  },
  rejected_modal_view: {
    backgroundColor: "white",
    minWidth: '100%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: '#7F7F7F',
    borderWidth: 3,
  },
  accepted_modal_view: {
    backgroundColor: "white",
    minWidth: '100%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: '#2670FF',
    borderWidth: 3,
  },
  pending_modal_view: {
    backgroundColor: "white",
    minWidth: '100%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: '#EB5757',
    borderWidth: 3,
  },
  active_modal_view: {
    backgroundColor: "white",
    minWidth: '100%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: '#E2A952',
    borderWidth: 3,
  },
  done_req_modal_view: {
    backgroundColor: "white",
    minWidth: '100%',
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '0%',   
    textAlign: 'left',
    borderTopColor: '#3ABD24',
    borderWidth: 3,
  },
  header_container: {
    minWidth: '100%',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    textAlign: 'left',
  }, /*comment out stuff below this*/
  info_container: {
    minWidth: '100%',
    textAlign: 'left',
  }, 
  complete_date_container: {
    minWidth: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderTopColor: "rgba(0, 0, 0, 0.2)",
    margin: '5%',
  },
  confirm_modal_view: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    top: "20%",
  },
  
  /*entire_request_container: {
    position: "absolute",
    margin: "50%", 
    backgroundColor: '#000000',
  },
  individual_req_container: {
    fontSize: 10,
    backgroundColor: '#FFFFFF',
    minWidth: '0%',
    minHeight: '100%', 
  },
  info_container: {
    left: '5%',
    marginRight: '5%',
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
  },*/
  row: {
    margin: 10,
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
  },
  resource_list: {
    margin: '5%', 
    maxHeight: '10%',
    position: 'absolute',
  },
  resource_badge: {
    backgroundColor: '#2670FF',
    borderRadius: 20,
    margin: '1%',
    justifyContent: "center",
    alignItems: "center",
  },
});

const buttons = StyleSheet.create({
  accept: {
    width: '105%',
    height: '12%',
    backgroundColor: "#2670FF",
    borderColor: "#2670FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  reject: {
    marginTop: '3%',
    width: '105%',
    height: '12%',
    borderColor: "#EB5757",
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15, 
  },
  back: {
    width: '105%',
    height: '40%',
    backgroundColor: "#FFFFFF",
    borderWidth: 2, 
    borderColor: "#2670FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  confirm: {
    minWidth: '105%', 
    height: '50%',
    backgroundColor: "#2670FF",
    borderColor: "#2670FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

const texts = StyleSheet.create({
  individual_req_header: {
    fontFamily: 'Montserrat-bold',
    color: '#333333',
    fontSize: 24, 
    marginBottom: '2%',
  },
  info_header: {
    fontFamily: 'Inter-bold',
    color: '#000000',
    fontSize: 16, 
    marginTop: '3%'
  },
  details_header: {
    fontFamily: 'Inter',
    color: '#4F4F4F',
    fontSize: 16, 
    fontWeight: 'bold'
  },
  request_details: {
    fontFamily: 'Inter',
    color: '#7F7F7F',
    fontSize: 16, 
  },
  completion_date: {
    fontFamily: 'Inter',
    color: '#7F7F7F',
    textAlign: 'center',
    fontSize: 14, 
  },
  button_label_red: {
    fontSize: 15,
    color: "red",
  },
  button_label_white: {
    fontSize: 15,
    color: "white",
  },
  button_label_blue: {
    fontSize: 15,
    color: "#2670FF",
  }


  /*

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
  
  resource_text: { // fix font 
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingBottom: '2%',
    margin: '2%', 
    fontSize: 13, 
  },
  resource_text2: { // fix font 
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#000000',
    paddingBottom: '2%',
    margin: '2%', 
    fontSize: 30, 
  }*/
});

export { styles, buttons, texts };
