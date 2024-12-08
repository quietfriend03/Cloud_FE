import axios from 'axios';

const BE_ROUTE = 'http://cloudendterm-env.eba-tsuii5pq.ap-southeast-1.elasticbeanstalk.com/';

export const axiosPost = async (endpoint = '', body = {}) => {
    const apiRoute = BE_ROUTE + endpoint;
    try {
        const response = await axios.post(apiRoute, body);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
