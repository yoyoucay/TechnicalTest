import { getToken } from './AsyncStorage';
import {UrlAPI} from './consVar';

export const callLocalAPI = async (
    endpoint: any,
    method = 'GET',
    body: any = null,
) => {
    try {
        const apiUrl = UrlAPI; // Replace with your local API URL
        const res = await getToken();
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+res
            },
        };
        // console.log('BODY JSON RAW : ',body);
        if (body) {
            body ? (options.body = JSON.stringify(body)) : null;
        }

        const response = await fetch(`${apiUrl}/${endpoint}`, options);
        // console.log('Response ', response);
        const data = await response.json();
        // if (!response.ok) {
        //     console.log('ERROR RESPONSE !!!');
        //     // throw new Error(data.message);

        // }
        console.log('Data JSON Received : ', data);
        return data;
    } catch (error) {
        console.error('Error calling local API:', error);
        throw error;
    }
};
