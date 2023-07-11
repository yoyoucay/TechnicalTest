import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {nameApp, UrlAPI} from '../../Utils/consVar';

const showValidationAlert = (strMsg: string, strTitle : string) =>
    Alert.alert(strTitle, strMsg, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

const callLocalAPI = async (endpoint: any, method = 'GET', body:any = null) => {
    try {
        const apiUrl = UrlAPI; // Replace with your local API URL

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // console.log('BODY JSON RAW : ',body);
        if (body) {
            body ? options.body = JSON.stringify(body) : null;
        }

        const response = await fetch(`${apiUrl}/${endpoint}`, options);
        // console.log('Response ', response);
        const data = await response.json();
        // if (!response.ok) {
        //     console.log('ERROR RESPONSE !!!');
        //     // throw new Error(data.message);

        // }
        // console.log('Data JSON Received : ', data);
        return data;
    } catch (error) {
        console.error('Error calling local API:', error);
        throw error;
    }
};

const Register = () => {
    let dataUser = {};
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refFullname = useRef(null);
    const refEmail = useRef(null);
    const refPassword = useRef(null);

    const submitRegister = async () => {
        const data = {
            fullname,
            email,
            password,
        };

        if (!fullname) {
            showValidationAlert('Mohon untuk mengisi Nama Lengkap!', 'Nama Lengkap kosong');
            if (refFullname.current != null) {
                refFullname.current.focus();
            }            
            return;
        }

        if (!email) {
            showValidationAlert('Mohon untuk mengisi email!', 'Email kosong');
            if (refEmail.current != null) {
                refEmail.current.focus();
            }            
            return;
        }
        if (!email) {
            showValidationAlert('Mohon untuk mengisi email!', 'Email kosong');
            if (refEmail.current != null) {
                refEmail.current.focus();
            }            
            return;
        }

        if (!password) {
            showValidationAlert('Mohon untuk mengisi password!', 'Password kosong');
            if (refPassword.current != null) {
                refPassword.current.focus();
            }     
            return;
        }

        dataUser = await callLocalAPI('register', 'POST', data);
        console.log('Data User : ', dataUser);

        if (dataUser.success) {
            showValidationAlert('Berhasil melakukan Registrasi!', 'Registrasi berhasil');
            return;
        }else{
            showValidationAlert('Registrasi Gagal!, silahkan coba lagi nanti', 'Registrasi gagal');
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
                    value={fullname}
                    placeholder="Nama Lengkap"
                    onChangeText={fullname => setFullname(fullname)}
                    ref={refEmail}
                />
                <TextInput
                    value={email}
                    placeholder="Email"
                    onChangeText={email => setEmail(email)}
                    ref={refEmail}
                />
                <TextInput
                    value={password}
                    placeholder="Password"
                    onChangeText={password => setPassword(password)}
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
