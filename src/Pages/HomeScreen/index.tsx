import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {getToken, removeValue} from '../../Utils/AsyncStorage';

const showValidationAlert = (strMsg: string, strTitle: string) =>
    Alert.alert(strTitle, strMsg, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

export default function HomeScreen({navigation}) {
    const [token, setToken] = useState('');

    // Function __Contruct
    useEffect(() => {
        async function checkToken() {
            const res = await getToken();
            if (!res) {
                showValidationAlert(
                    'Sesi akun anda telah habis! harap login kembali.',
                    'Sesi telah habis',
                );
                doLogout();
            }
        }
        checkToken();
    }, []);

    
    const doLogout = () => {
        removeValue();
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Container Square */}
            <View style={stylesContainerSquare.container}>
                <Text style={styles.textTitle}> Room List </Text>
                {/* Container Rooms */}
                <View style={stylesContainerRooms.container}></View>
            </View>
            {/* Logout Button */}
            <TouchableHighlight
                style={{width: '100%'}}
                onPress={() => doLogout()}>
                <View style={styles.button}>
                    <Text style={styles.textButton}> Logout </Text>
                </View>
            </TouchableHighlight>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {padding: 20, flex: 1, alignItems: 'center'},
    textTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        marginBottom: 10,
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ecf0f1',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
});

const stylesContainerSquare = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#bdc3c7',
        borderRadius: 8,
        width: 400,
        height: 200,
    },
});

const stylesContainerRooms = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        width: 360,
        height: 300,
        alignContent: 'center',
    },
});
