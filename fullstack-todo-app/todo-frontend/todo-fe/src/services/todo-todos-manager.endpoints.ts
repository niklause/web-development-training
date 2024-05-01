
import axios, { AxiosPromise } from 'axios'

const APi_URL = 'http://localhost:3010/todo/';

export const addTodo: (todoData: any) => AxiosPromise<any> = async (todoData: any) => {
    const headers = {
        authorization: localStorage.getItem('token')
    }
    const paylaod = { ...todoData };
    const apiurl = `${APi_URL}add/todo`;
    return axios.post(apiurl, paylaod, { headers })
}

export const fetchTodo: () => AxiosPromise<any> = async () => {
    const headers = {
        authorization: localStorage.getItem('token')
    }
    const apiurl = `${APi_URL}get/todos`;
    return axios.get(apiurl, { headers })
}

export const updateTask: (todotitle: string, completed: boolean) => AxiosPromise<any> = async (todotitle: string, completed: boolean) => {
    const headers = {
        authorization: localStorage.getItem('token')
    }
    const paylaod = {
        todotitle, completed
    }
    const apiurl = `${APi_URL}update/todo`;
    return axios.put(apiurl, paylaod, { headers })
}

export const deleteTask: (title: string) => AxiosPromise<any> = async (title: string) => {
    const headers = {
        authorization: localStorage.getItem('token')
    }
    const paylaod = {
        todotitle: title
    }
    const apiurl = `${APi_URL}delete/todo`;
    return axios.put(apiurl, paylaod, { headers })
}