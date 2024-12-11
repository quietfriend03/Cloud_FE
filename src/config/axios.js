import axios from 'axios';

const BE_ROUTE = 'http://cloudendterm-env.eba-tsuii5pq.ap-southeast-1.elasticbeanstalk.com/';

export const axiosGet = async (endpoint = '') => {
    const apiRoute = BE_ROUTE + endpoint;
    try {
        const response = await axios.get(apiRoute);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const axiosPost = async (endpoint = '', body = {}) => {
    const apiRoute = BE_ROUTE + endpoint;
    try {
        const response = await axios.post(apiRoute, body);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const axiosPut = async (endpoint = '', body = {}) => {
    const apiRoute = BE_ROUTE + endpoint;
    try {
        const response = await axios.put(apiRoute, body);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const axiosDelete = async (endpoint = '') => {
    const apiRoute = BE_ROUTE + endpoint;
    try {
        const response = await axios.delete(apiRoute);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};