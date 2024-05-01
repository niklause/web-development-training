
import axios, { AxiosPromise } from 'axios'

const APi_URL = 'http://localhost:3010/user/'

export const registerUser: (username: string, password: string) => AxiosPromise<any> = async (username: string, password: string) => {
    const paylaod = {
        username, password
    }
    const apiurl = `${APi_URL}signup`;
    return axios.post(apiurl, paylaod);
}

export const signInUser: (username: string, password: string) => AxiosPromise<any> = async (username: string, password: string) => {
    const headers = {
        username, password
    }
    const apiurl = `${APi_URL}signin`;
    return axios.get(apiurl, { headers });
}
