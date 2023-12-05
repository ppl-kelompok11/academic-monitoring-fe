import axios from "axios";
import { notifications } from "@mantine/notifications";
import Router from "next/router";
import Cookies from "js-cookie";
// Membuat instance Axios dengan konfigurasi default
const API_URL = process.env.API_URL;
const api = axios.create({
    baseURL: "http://ppl-api.next-innovate.tech/api", // Ganti dengan URL API Anda
    timeout: 10000, // Timeout dalam milidetik
});
api.interceptors.request.use(
    (config) => {
        // Mendapatkan token dari tempat penyimpanan Anda (misalnya local storage, state, atau cookie)
        const token = Cookies.get("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        // console.log(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => {
        if (response.data.message) {
            notifications.show({
                color: "green",
                title: "Success",
                message: response.data.message,
                styles: (theme) => ({
                    root: {
                        backgroundColor: "white",
                    },
                }),
            });
        }
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            notifications.show({
                color: "red",
                title: "Unauthorized",
                message: "Please login to access this page",
                styles: (theme) => ({
                    root: {
                        backgroundColor: "white",
                    },
                }),
            });
            Cookies.remove("token");
            Cookies.remove("user");
            Router.push("/auth/signin");
        }
        if (error.response.status === 403) {
            notifications.show({
                color: "red",
                title: "Forbidden",
                message: "You cannot do this action",
                styles: (theme) => ({
                    root: {
                        backgroundColor: "white",
                    },
                }),
            });
        }
        if (error.response.status === 422) {
            notifications.show({
                color: "red",
                title: "Error",
                message: error.response.data.message,
                styles: (theme) => ({
                    root: {
                        backgroundColor: "white",
                    },
                }),
            });
        }
        return Promise.reject(error);
    }
);

export default api;
