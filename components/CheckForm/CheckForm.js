import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
  } from "react-native";
import { styles } from './CheckFormStyles';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';

export default function CheckForm(props) {

    const handleObjChange = (key) => {
        props.setObj(prev => ({ 
            ...prev,
            [key]: !props.obj[key],
        }));
    }

    const sortedObj = Object.keys(props.obj);
    sortedObj.sort();

    return (
        <>  
            <ScrollView contentContainerStyle={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: "wrap",
                }}> 
            {sortedObj.map((key) => {
                const isTranslated = props.translations ? true : false;
                const taskString = isTranslated && props.translations[props.language][key]
                                    ? props.translations[props.language][key] : key
                return <TouchableOpacity
                key={key} disabled={props.disabled}
                               style={props.obj[key] ? styles.selected : styles.unselected}
                               onClick = {() => handleObjChange(key)}
                >
                    <Text style={props.obj[key] ? styles.selected_text : styles.unselected_text}>{taskString}</Text>
                </TouchableOpacity>
                // return  <Button key={key} disabled={props.disabled}
                //                id={props.obj[key] ? "selected" : "notSelected"}
                //                onClick = {() => handleObjChange(key)}>
                //                {taskString}
                //         </Button>
            })}
            </ScrollView>
        </>
    );
}