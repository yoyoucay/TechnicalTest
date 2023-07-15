import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const CircleFloatButton = ({onPress}) => {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CircleFloatButton;
