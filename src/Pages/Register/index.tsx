import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {nameApp} from '../../Utils/consVar';

const showValidationAlert = (strMsg: string, strTitle : string) =>
    Alert.alert(strTitle, strMsg, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const refEmail = useRef(null);
    const refPassword = useRef(null);

    const submitRegister = () => {
        if (!email) {
            showValidationAlert('Please fill email!', 'Email Empty');
            if (refEmail.current != null) {
                refEmail.current.focus();
            }            
            return;
        }

        if (!password) {
            showValidationAlert('Please fill password!', 'Password Empty');
            if (refPassword.current != null) {
                refPassword.current.focus();
            }     
            return;
        }
    };
    return (
        <View style={{flex: 1, paddingTop: 80, backgroundColor: 'blue'}}>
            <View style={stylesHeader.container}>
                <Text style={stylesHeader.text}>{nameApp}</Text>
            </View>
            <View style={stylesBody.container}>
                <TextInput
                    value={email}
                    placeholder="Email"
                    onChangeText={a => setEmail(a)}
                    ref={refEmail}
                />
                <TextInput
                    value={password}
                    placeholder="Password"
                    onChangeText={a => setpassword(a)}
                    ref={refPassword}
                />
                <TouchableHighlight
                    style={{width: '100%'}}
                    onPress={() => submitRegister()}>
                    <View style={stylesBody.button}>
                        <Text style={stylesBody.textButton}> Register </Text>
                    </View>
                </TouchableHighlight>

                <View style={[styleFooter.container, {flexDirection: 'row'}]}>
                    <Text style={styleFooter.text}>Already have account?</Text>
                    <TouchableHighlight onPress={() => []}>
                        <Text style={styleFooter.textLink}> Sign in</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const stylesHeader = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#3498db',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#ecf0f1',
    },
});

const stylesBody = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: 'black',
    },
    button: {
        backgroundColor: '#6527BE',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
});

const styleFooter = StyleSheet.create({
    container: {
        padding: 8,
    },
    text: {
        fontSize: 10,
        color: 'black',
        alignItems: 'center',
    },
    textLink: {
        fontSize: 10,
        color: '#3498db',
        alignItems: 'center',
    },
});
export default Register;
