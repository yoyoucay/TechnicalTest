import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import React from 'react';

const Login = ({navigation}) => {
    return (
        <View style={{flex: 1, width: '100%'}}>
            <Text>Login screen</Text>
            <TouchableHighlight
                style={{width: '100%'}}
                onPress={() => navigation.goBack()}>
                <View style={styles.button}>
                    <Text style={styles.textButton}> go back </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
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
