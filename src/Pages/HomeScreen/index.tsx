import {
    StyleSheet,
    Alert,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CircleFloatButton from '../../CircleButton';
import RoomList from '../RoomList';
import { getToken, removeToken } from '../../Utils/AsyncStorage';

export default function HomeScreen({navigation}) {

    const showValidationAlert = (strMsg: string, strTitle: string) =>
        Alert.alert(strTitle, strMsg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    const showConfirmAlert = (strMsg: string, strTitle: string) =>
        Alert.alert(strTitle, strMsg, [
            {text: 'OK', onPress: () => doLogout()},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);
    
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
        removeToken();
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    };
    
    return (
        <SafeAreaView style={styles.container}>    
            <View style={{flexDirection: 'row'}}>                    
                <Text style={styles.textTitle}> Room List </Text>
                {/* Logout Button */}
                <TouchableOpacity style={styles.button} onPress={() => showConfirmAlert('Do you want logout?','Logout')}>
                    <Text style={styles.textButton}> Logout </Text>
                </TouchableOpacity>
            </View>       
            <RoomList />
            <CircleFloatButton onPress={() => navigation.navigate('FormRoom')} />
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
        marginLeft: 120,
        backgroundColor: '#e74c3c',
        marginBottom: 15,
        padding: 8,
        flex: 1,
        width: 100,
        borderRadius: 4,
        alignItems: 'center',
    },
});

