import { axiosPost } from "@/config/axios";

export const signup = async (email, password) => {
    try {
        const response = await axiosPost('auth/signup', {
            email,
            password,
        });
        console.log(response)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axiosPost('auth/signin', {
            email,
            password,
        });

        return response.AuthenticationResult;
    } catch (error) {
        console.error(error);
    }
};

export const verify = async (email, code) => {
    try {
        const response = await axiosPost('auth/confirm', {
            email,
            code,
        });

        return response
    } catch (error) {
        console.error(error);
    }
}

export const resend = async (email) => {
    try {
        const response = await axiosPost('auth/resend', {
            email,
        });

        return response
    } catch (error) {
        console.error(error);
    }
}

export const refresh = async (sub, refreshToken) => {
    try {
        const response = await axiosPost('auth/refresh', {
            sub,
            refreshToken,
        });

        return response
    } catch (error) {
        console.error(error);
    }
}