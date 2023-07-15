import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/Pages/Register';
import Login from './src/Pages/Login';
import HomeScreen from './src/Pages/HomeScreen';
import FormRoom from './src/Pages/FormRoom';

const App = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    options={{headerShown: false}}
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    options={{headerShown: false}}
                    component={Register}
                />
                <Stack.Screen
                    name="HomeScreen"
                    options={{headerShown: false}}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="FormRoom"
                    options={{headerShown: true, title:'Form Room', headerTitleAlign:'center'}}
                    component={FormRoom}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;
