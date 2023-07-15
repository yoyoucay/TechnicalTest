import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (value : string) => {
    try {
        await AsyncStorage.setItem('tokenAPI', value);
    } catch (e) {
        // saving error
        console.log('Store Token Err : ', e);
    }
};

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('tokenAPI');
        if (value !== null) {
            return value;
        }else{
            return false;
        }
    } catch (e) {
        console.log('Get Token Err : ', e);
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('tokenAPI');
    } catch (e) {
        // remove error
        console.log('Remove Token Err : ', e);
    }
    console.log('Done Remove Token.');
};
