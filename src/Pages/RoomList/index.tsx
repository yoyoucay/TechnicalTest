import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addThousandSeparator} from '../../Utils/ThousandSeparator';
import {callLocalAPI} from '../../Utils/CallLocalAPI';

export default function RoomList() {
    const [roomList, setroomList] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await getRoomList();
            if (res) {
                setroomList(res.data);
                console.log('Berhasil dapat data room list');
            } else {
                console.log('Set room list tidak ada data.');
            }
        }
        getData();
    }, []);

    const handleRefreshData =async () => {
        const res = await getRoomList();
        if (res) {
            setroomList(res.data);
            console.log('Berhasil dapat data room list');
        } else {
            console.log('Set room list tidak ada data.');
        }
    };

    const getRoomList = async () => {
        try {
            const resGetRoomList = await callLocalAPI('room/list', 'GET', null);
            console.log(resGetRoomList);

            return resGetRoomList;
        } catch (error) {
            console.log(error);
        }
    };

    const removeRoom = async (idRoom : string) => {
        console.log('removeRoom Pressed. ID ROOM : ', idRoom);
        
        try {
            const data = {
                id_room: idRoom
            };
            const resRemoveList = await callLocalAPI('room/remove', 'POST', data);
            console.log(resRemoveList);

            await handleRefreshData();

            return;
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const showConfirmAlert = (strMsg: string, strTitle: string, id:string) =>
        Alert.alert(strTitle, strMsg, [
            {text: 'OK', onPress: () => removeRoom(id)},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);
    

    const renderRoomListCard = i => {
        return (
            <View style={stylesContainerRooms.container}>
                <View style={[{flexDirection: 'row'}]}>
                    <Text
                        style={[
                            stylesContainerRooms.textItems,
                            {paddingRight: 120},
                        ]}>
                        {i.item.name_room} Room 
                    </Text>
                    <TouchableOpacity style={stylesContainerRooms.buttonClose}>
                        <Text style={stylesContainerRooms.buttonCloseContent}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesContainerRooms.buttonClose} onPress={() => showConfirmAlert('Apakah kamu yakin ingin menghapus Room ini?', 'Hapus Room',i.item.id)}>
                        <Text style={stylesContainerRooms.buttonCloseContent}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={{uri: i.item.urlToImage, width: 100, height: 100}}
                />
                <View style={stylesContainerRooms.containerText}>
                    <Text style={{color: '#c7ecee'}}>
                        Price : Rp.{' '}
                        {addThousandSeparator(parseFloat(i.item.price))}
                    </Text>
                    <Text style={{color: '#c7ecee'}}>
                        Max Person : {i.item.maxperson}
                    </Text>
                    <Text style={{color: '#c7ecee'}}>
                        Available Room : {i.item.stock}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={stylesContainerSquare.container}>
            <FlatList data={roomList} renderItem={renderRoomListCard} onRefresh={handleRefreshData} refreshing={false}/>
        </View>
    );
}

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
        marginVertical: 10
    },
    containerHeader: {
        justifyContent: 'center',
    },
    containerText: {
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
        margin: 5,
    },
    buttonCloseContent: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


