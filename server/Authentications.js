import axios from "axios";
import { firebasecfg } from "../constants/firebasecfg";

export async function signuptoserver(details) {
    try {
        // console.log(details);

        let res = await axios.post(`${firebasecfg.signup}`,{
            email:details.email,
            password:details.password
        });
        // console.log(res.data);
        let username = details.email.split("@")[0];
        try {
            let store = await axios.put(`${firebasecfg.realtime}/users/${username}.json`,{
                email:details.email,username
            })
        return {email:details.email,username};
        } catch (error2) {
            if (error2.toString()=="AxiosError: Network Error") {
                return "no internet";
            }else{
                return "error instore";
            }
        }

    } catch (error) {
        if (error.toString()=="AxiosError: Network Error") {
            return "no internet";
        }else{
            return "already exist";
        }
    }
}

export async function signintoserver(details) {
        let username = details.email.split("@")[0];
        try {
            let storeddata = await axios.get(`${firebasecfg.realtime}/users/${username}.json`)
            return storeddata.data;
        } catch (error2) {
            if (error2.toString()=="AxiosError: Network Error") {
                return "no internet";
            }else{
                return "error instore";
            }
        }
}