import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

export default function HomeScreen() {
    const [data, setdata] = useState({});
    const getData = async () => {
        const res = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
        });
        setdata(res.data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}> Beranda </Text>
            <TouchableHighlight onPress={() => getData()}>
                <View style={styles.button}>
                    <Text style={styles.textButton}> Get Data </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setdata({})}>
                <View style={styles.button}>
                    <Text style={styles.textButton}> Clear Data </Text>
                </View>
            </TouchableHighlight>
            <Text style={{marginVertical: 10}}> Data : </Text>
            <View>
                <Text style={styles.textTitle}> title : {data?.title} </Text>
                <Text style={styles.textTitle}>
                    {' '}
                    completed : {data?.completed?.toString()}{' '}
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {padding: 20, flex: 1, alignItems: 'center'},
    textTitle: {textAlign: 'center', fontSize: 18},
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#6527BE',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
});
