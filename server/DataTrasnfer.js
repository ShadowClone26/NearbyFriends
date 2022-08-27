import axios from "axios";
import { firebasecfg } from "../constants/firebasecfg";

export async function sendlocation(obj,username) {
    try {
        let send = await axios.put(`${firebasecfg.realtime}/locations/${username}.json`,{...obj,username});
        return send.data;
    } catch (error) {
        if (error.toString()=="AxiosError: Network Error") {
            return "no internet";
        }else{
            return "error instore";
        }
    }
}

export async function getallusers(username) {
    try {
        let users = await axios.get(`${firebasecfg.realtime}/users.json`);
        let userarr=[];
        for (const key in users.data) {
            if (key==username) {
                continue;
            }
            userarr.push({...users.data[key]});
        }
        return userarr;
    } catch (error) {
        if (error.toString()=="AxiosError: Network Error") {
            return "no internet";
        }else{
            return "error instore";
        }
    }
}

export async function sendToken(token,username) {
    try {
        let sendres = await axios.put(`${firebasecfg.realtime}/users/${username}/token.json`,{...token,username:username});
    } catch (error) {
        if (error.toString()=="AxiosError: Network Error") {
            return "no internet";
        }else{
            return "error instore";
        }
    }
}

export async function gettoken(username) {
    try {
        let token = await axios.get(`${firebasecfg.realtime}/users/${username}/token.json`);
        return token.data;
    } catch (error) {
        if (error.toString()=="AxiosError: Network Error") {
            return "no internet";
        }else{
            return "notoken";
        }
    }
}

export async function removeToken(username) {
    try {
        let token = await axios.delete(`${firebasecfg.realtime}/users/${username}/token.json`);
        return token.data;
    } catch (error) {
        if (error.toString()=="AxiosError: Network Error") {
            return "no internet";
        }else{
            return "error instore";
        }
    }
}