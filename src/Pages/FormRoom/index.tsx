import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { callLocalAPI } from '../../Utils/CallLocalAPI';
import { storeToken } from '../../Utils/AsyncStorage';


const FormRoom = ({navigation}) => {
    const [textInputValue, setTextInputValue] = useState('');

    // form 
    const [nameRoom, setnameRoom] = useState('');
    const [maxPerson, setmaxPerson] = useState('');
    const [Price, setPrice] = useState('');
    const [stockRoom, setstockRoom] = useState('');
    const [file, setfile] = useState(null);

    const refNameRoom = useRef(null);
    const refMaxPerson = useRef(null);
    const refPrice = useRef(null);
    const refStockRoom = useRef(null);
  
    const handleSubmit = async () => {
        if (!nameRoom) {
            showValidationAlert('Mohon untuk mengisi nama Room!', 'Nama Room belum terisi');
            if (refNameRoom.current != null) {
                refNameRoom.current.focus();
            }
            return;
        }
        if (!maxPerson) {
            showValidationAlert('Mohon untuk mengisi Max Person Room!', 'Max Person/Room belum terisi');
            if (refMaxPerson.current != null) {
                refMaxPerson.current.focus();
            }
            return;
        }

        if (!Price) {
            showValidationAlert('Mohon untuk mengisi Harga Room!', 'Harga Room belum terisi');
            if (refPrice.current != null) {
                refPrice.current.focus();
            }
            return;
        }

        let dataRoom = {
            name_room: nameRoom,
            maxperson: maxPerson,
            price: Price,
            stock: stockRoom,
            file: file,
        };
        // Perform form submission logic here
        console.log('DATA FOR SEND CREATE ROOM :', dataRoom);

        dataRoom = await callLocalAPI('room/create', 'POST', dataRoom);
        console.log('Data User : ', dataRoom);

        if (dataRoom.success) {
            showValidationAlert(
                'Berhasil melakukan pendaftaran Room!',
                'Berhasil',
            );
            console.log(dataUser.data.api_token);
            await storeToken(dataUser.data.api_token);
            return navigation.goBack();
        } else {
            showValidationAlert(
                'Pendaftaran Room gagal!, silahkan hubungi tim teknis terkait hal ini',
                'Gagal',
            );
            return;
        }        
    };  

    const showValidationAlert = (strMsg: string, strTitle: string) =>
        Alert.alert(strTitle, strMsg, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    const showConfirmAlert = (strMsg: string, strTitle: string) =>
        Alert.alert(strTitle, strMsg, [
            {text: 'OK', onPress: () => handleSubmit()},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);

    const pickImage = () => {
        launchImageLibrary({mediaType: 'photo'}, response => {
            console.log(response.assets[0].uri);
            if (!response.didCancel && !response.error) {
                setfile(response.assets[0]);
            } else {
                console.log('Image Picker err ', response.error);
            }
        });
    };
    return (
        <SafeAreaView style={stylesForm.container}>
            {/* Form */}
            <View>
                {/*  */}
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text>Room Name : </Text><TextInput
                        value={nameRoom}
                        onChangeText={setnameRoom}
                        placeholder="Please input room name..."
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text>Max Person/Room : </Text><TextInput
                        value={maxPerson}
                        onChangeText={setmaxPerson}
                        placeholder="Max person per room..."
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text>Price / Night : </Text><TextInput
                        value={Price}
                        onChangeText={setPrice}
                        placeholder='Place price room for stay..'
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text>Available Room : </Text><TextInput
                        value={stockRoom}
                        onChangeText={setstockRoom}
                        placeholder='Place price room for stay..'
                    />
                </View>

                <View style={{flexDirection: 'row', alignItems:'center', alignSelf: 'center'}}>
                    {file && (
                        <Image source={{ uri: file.uri }} style={stylesForm.image} />
                    )}
                </View>

                <View style={[stylesForm.button,{alignItems:'center', backgroundColor: '#81ecec'}]}>                    
                    <TouchableOpacity onPress={pickImage}> 
                        <Text>Select Image</Text> 
                    </TouchableOpacity>
                </View>
            </View>
            
            
            <TouchableOpacity onPress={() => showConfirmAlert('Want to save new room?','Save Room')}> 
                <View style={[{padding: 2,}, stylesForm.button]}>
                    <Text style={{color: 'white',alignSelf:'center'}}>Submit</Text> 
                </View> 
            </TouchableOpacity>                      
        </SafeAreaView>
    );
};

const stylesForm = StyleSheet.create({
    container : {
        padding: 50,
        alignContent: 'center',
    },
    button: {
        alignItems: 'center',
        width: '100%',
        margin: 10,
        backgroundColor: 'blue',
        borderRadius: 15,
        paddingVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});
export default FormRoom;
