import axios from 'axios';
import secrets from '../secrets';
import JwtService from './JwtService';

const useAxios = (type = "application/json") => {
    let api = null;
    if (JwtService.getToken()) {
        api = axios.create({
            baseURL: secrets.URL_DRF,
            headers: {
                "Content-type": type,
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });

    } else {
        api = axios.create({
            baseURL: secrets.URL_DRF,
            headers: {
                "Content-type": type,
            }
        });
    }

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 403) {
                sessionStorage.removeItem("time")
                JwtService.destroyToken();
                window.location.reload();
            }
            return Promise.reject(error);
        }
    );

    return api;
}
export default useAxios;