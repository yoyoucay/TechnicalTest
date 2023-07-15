import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getToken, removeValue} from '../../Utils/AsyncStorage';
import {callLocalAPI} from '../../Utils/CallLocalAPI';
import { addThousandSeparator } from '../../Utils/ThousandSeparator';
import CircleFloatButton from '../../CircleButton';

const showValidationAlert = (strMsg: string, strTitle: string) =>
    Alert.alert(strTitle, strMsg, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

export default function HomeScreen({navigation}) {
    const [roomList, setroomList] = useState([]);

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
            const resGetRoomList = await callLocalAPI('room/list', 'GET', null);
            if (resGetRoomList) {
                setroomList(resGetRoomList.data);
                console.log('Berhasil dapat data room list');
            } else {
                console.log('Set room list tidak ada data.');
            }
        }
        checkToken();
    }, []);

    const renderRoomListCard = i => {
        return (
            <View style={stylesContainerRooms.container}>
                <View style={[                    
                    {flexDirection: 'row'},
                ]}>
                    <Text style={[stylesContainerRooms.textItems, {paddingRight: 120}]}>
                        {i.item.name_room} Room
                    </Text>
                    <TouchableOpacity
                        style={stylesContainerRooms.buttonClose}>
                        <Text style={stylesContainerRooms.buttonCloseContent}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={stylesContainerRooms.buttonClose}>
                        <Text style={stylesContainerRooms.buttonCloseContent}>Remove</Text>
                    </TouchableOpacity>
                </View>
                <Image source={{uri:i.item.urlToImage, width: 100, height: 100}} />
                <View style={stylesContainerRooms.containerText}>
                    <Text style={{ color: '#c7ecee'}}>Price : Rp. {addThousandSeparator(parseFloat(i.item.price))}</Text>
                    <Text style={{ color: '#c7ecee'}}>Max Person : {i.item.maxperson}</Text>
                    <Text style={{ color: '#c7ecee'}}>Available Room : {i.item.stock}</Text>
                </View>
            </View>
        );
    };

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
                <View style={{flexDirection: 'row'}}>                    
                    <Text style={styles.textTitle}> Room List </Text>
                    {/* Logout Button */}
                    <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => doLogout()}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}> Logout </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList data={roomList} renderItem={renderRoomListCard} />
            </View>
            
            <CircleFloatButton />
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
        padding: 8,
        width: 100,
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
        flex: 1,
        padding: 20,
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        width: 360,
        // height: 300,
        alignContent: 'flex-end',        
        // justifyContent: 'center',   
    },
    containerHeader:{
        justifyContent: 'center', 
    },
    containerText:{
        marginTop: 10,
        padding: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    textItems: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#c7ecee',
    },
    buttonClose: {
        height: 25,
        borderRadius: 8,
        backgroundColor: '#e53935',
        justifyContent: 'center',
        alignItems: 'center',
        margin:5     
    },
    buttonCloseContent: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
