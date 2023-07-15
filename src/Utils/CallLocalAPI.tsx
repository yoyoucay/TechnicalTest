import axios from 'axios';
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
        console.log('BODY JSON RAW : ',body);
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


export const UploadFileAPI = async (
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
                'Content-Type':  'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'bearer '+res
            },
        };
        // console.log('BODY JSON RAW : ',body);

        
        const dataX = new FormData();

        if (body) {            
            dataX.append('name_room', body.name_room);
            dataX.append('maxperson', body.maxperson);
            dataX.append('price', body.price);
            dataX.append('stock', body.stock);
            dataX.append('file', body.file);
            // body ? (options.body = dataX) : null;
        }

        console.log('BODY JSON : ', options.body);
        console.log('DATA SUDAH SIAP, SIAP MELUNCUR');



        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: options.method,
            headers: options.headers,
            body: dataX,
        });
        console.log('Response ', response);
        const data = await response.json();
        if (!response.ok) {
            console.log('ERROR RESPONSE !!!', data);
            throw new Error('DATA ERROR');
        }
        console.log('Data JSON Received : ', data);
        return data;
    } catch (error) {
        console.error('Error uploading image:', error.message);
        console.error('Response:', error.response);
        // console.error('Error calling local API:', error);
        throw error;
    }
};