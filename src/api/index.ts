import axios from "axios";
import Cookies from "js-cookie";

const axiosInstace = axios.create({
    baseURL: "http://138.68.140.88/api/v1/"
});

axiosInstace.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get("auth-token");
        if (config.headers && authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        console.error("clientApi failed to make regular request: ", error);
        return Promise.reject(error);
    }
);

export default axiosInstace;