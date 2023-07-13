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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import { storeToken } from '../../Utils/AsyncStorage';
import { callLocalAPI } from '../../Utils/CallLocalAPI';

const showValidationAlert = (strMsg: string, strTitle: string) =>
    Alert.alert(strTitle, strMsg, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

const Login = ({navigation}) => {
    let dataUser = {};
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refEmail = useRef(null);
    const refPassword = useRef(null);

    const submitRegister = async () => {
        const data = {
            email,
            password,
        };

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
            showValidationAlert(
                'Mohon untuk mengisi password!',
                'Password kosong',
            );
            if (refPassword.current != null) {
                refPassword.current.focus();
            }
            return;
        }

        dataUser = await callLocalAPI('login', 'POST', data);
        console.log('Data User : ', dataUser);

        if (dataUser.success) {
            showValidationAlert(
                'Berhasil melakukan Login!',
                'Login berhasil',
            );
            console.log(dataUser.data.api_token);
            await storeToken(dataUser.data.api_token);
            return navigation.navigate('HomeScreen');
        } else {
            showValidationAlert(
                'Login Gagal!, silahkan coba lagi nanti',
                'Login gagal',
            );
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
                        <Text style={stylesBody.textButton}> Login </Text>
                    </View>
                </TouchableHighlight>

                <View style={[styleFooter.container, {flexDirection: 'row'}]}>
                    <Text style={styleFooter.text}>Didnt have account?</Text>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={styleFooter.textLink}> Register </Text>
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
export default Login;
