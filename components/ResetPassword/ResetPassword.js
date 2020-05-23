import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    TextInput
  } from "react-native";

  import { passwordStyles} from "./ResetPasswordStyles";
  import {styles, buttons, texts} from "../../screens/LoginScreen/LoginScreenStyles"
import { useSafeArea } from 'react-native-safe-area-context';
// import { validateEmail } from '../Helpers'

/**
 * Reset Password modal
 */
export default function ResetPassword(props) {
    const [email, setEmail] = useState();

    function handleClose() {
        props.modalVisible(false)
    }
    return (
        <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={false}
        >
            <View style={passwordStyles.centeredView}>
            <View style={passwordStyles.modalView}>
            <Text style = {passwordStyles.descriptTest}> Reset your password </Text>

            <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7F7F7F"
          onChangeText={(text) => setEmail(text)}
          defaultValue={email}
        />

            <TouchableOpacity 
            disabled = {false}
            style = {buttons.login}
            >
            <Text style = {texts.button_label}> Send me a password reset link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose}>
    <Text style={texts.button_label_blue}>Close {"\n"}</Text>
            </TouchableOpacity>
            </View>
            </View>
            {/* <Modal.Header>
                <Modal.Title>Reset your password</Modal.Title>
            </Modal.Header> */}
            {/* <Modal.Body>
                <Form onSubmit={props.handleSubmitForgot}>
                    <Row>
                        <Col xs={12}>
                            <Form.Group controlId="email" bssize="large">
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter your email"
                                    value={props.fields.email}
                                    onChange={props.handleFieldChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button style={{marginTop: 10}} id="large-button" disabled={!validateEmail(props.fields.email)} type="submit">
                        Send me a password reset link
                    </Button>
                    <Button id="large-button-empty" onClick={props.hideModal}>Back to login</Button>
                </Form>
            </Modal.Body> */}
        </Modal>
        </View>
    )
}

// ResetPassword.propTypes = {
//     showModal: PropTypes.bool,
//     handleSubmitForgot: PropTypes.func,
//     handleFieldChange: PropTypes.func,
//     hideModal: PropTypes.func,
//     fields: PropTypes.object
// }