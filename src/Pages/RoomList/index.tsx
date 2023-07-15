import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
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

    const getRoomList = async () => {
        try {
            const resGetRoomList = await callLocalAPI('room/list', 'GET', null);
            console.log(resGetRoomList);

            return resGetRoomList;
        } catch (error) {
            console.log(error);
        }
    };

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
                    <TouchableOpacity style={stylesContainerRooms.buttonClose}>
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
            <FlatList data={roomList} renderItem={renderRoomListCard} />
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


