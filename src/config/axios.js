import axios from 'axios';

const BE_ROUTE = 'http://localhost:8080/';

export const axiosPost = async (endpoint = '', body = {}) => {
    const apiRoute = BE_ROUTE + endpoint;
    try {
        const response = await axios.post(apiRoute, body);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
