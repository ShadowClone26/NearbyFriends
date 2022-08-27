import { createContext, useEffect, useState } from "react";
import {signintoserver, signuptoserver } from "../server/Authentications";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {requestBackgroundPermissionsAsync,getBackgroundPermissionsAsync,getForegroundPermissionsAsync,requestForegroundPermissionsAsync,getCurrentPositionAsync, startGeofencingAsync, GeofencingEventType, stopLocationUpdatesAsync, stopGeofencingAsync} from "expo-location";
import { getallusers, gettoken, removeToken, sendlocation, sendToken } from "../server/DataTrasnfer";
import * as TaskManager from "expo-task-manager";
import {ref,onChildChanged,getDatabase, get, onValue} from "firebase/database";
import * as Notifications from "expo-notifications";
import { sendNoti } from "../server/Noti";
import { Alert } from "react-native";

export const Nearbyctx = createContext({
    signup:(details)=>{},
    signin:(details)=>{},
    logout:()=>{},
    isAuthenticated:false,
    isLoading:false,
    setIsLoading:(value)=>{},
    setIsAuthenticated:(value)=>{},
    notification:"",
    setNotification:(notification)=>{},
    userdata:{},
    addcurrentlocation:(obj)=>{},
    allusers:{},
    setallusers:(users)=>{}
})


export function Nearbyctxp({children}) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [notification, setNotification] = useState("");
    const [userdata, setUserdata] = useState();
    const [location, setlocation] = useState();
    const [usersinrange, setusersinrange] = useState([]);
    const [allusers, setallusers] = useState();
    const [token, settoken] = useState();
    // console.log("allusers");
    // console.log(allusers);

    useEffect(() => {
        
        async function getpermissions() {
            let bgPermissionStatus = await getBackgroundPermissionsAsync();
            let fgPermissionStatus = await getForegroundPermissionsAsync();
            if (bgPermissionStatus.granted=="false"||fgPermissionStatus.granted=="false") {
            let bgPermission = await requestBackgroundPermissionsAsync();
            let fgPermission = await requestForegroundPermissionsAsync();
            }
        }
        autologin();
        getpermissions();
        
    //     if (!!userdata.user&&userdata.user.role=="driver") {
    //   }
    }, [])

    useEffect(() => {
        // console.log("ran userdata useeff")
        if (!!userdata) {
            let db = getDatabase();
            let locatioRef = ref(db,"/locations/");
            
            onValue(locatioRef,(res)=>{
                let value = res.val();
                setallusers({...value});
            })
        }
    }, [userdata])
    
    async function notify(msg,rgname) {
        await Notifications.scheduleNotificationAsync({
            content: {
              title: msg,
              body: rgname,
            },
            trigger: { seconds: 1}
          }
        )
        console.log("rgname");
        console.log(rgname);
        let tokengot = await gettoken(rgname);
        if (tokengot=="notoken") {
            return;
        }
        let sendress = await sendNoti(tokengot.token,userdata.username)

    }

    async function startwatching(usersgot,taskname) {
        TaskManager.defineTask(taskname, (data) => {
            // console.log("data");
            // console.log(data);
            if (data.data.eventType === GeofencingEventType.Enter) {
                console.log("You've entered region:");
                console.log(data.data);
                // console.log(data.data.taskName);
                notify("You've entered region:",taskname.replace("geofencingOf",""));
              } else if (data.data.eventType === GeofencingEventType.Exit) {
                console.log("You've left region:");
                // console.log(taskname.replace("geofencingOf",""));
                // notify("You've entered region:","aditya");
              }
           });
        let start = await startGeofencingAsync(taskname,[{...usersgot}]);
        // console.log(tasks);
    }
    async function stopall(newtask) {
        let taskname = "geofencingOf"+newtask.username.toString();
        // return;
        // let isReg = await TaskManager.isTaskRegisteredAsync(taskname);
        // if (isReg) {
        //     await stopGeofencingAsync(taskname);
        // }
        startwatching({...newtask},taskname);
        // let tasks = await TaskManager.getRegisteredTasksAsync();
        // console.log("tasks");
        // console.log(tasks);
    }

    useEffect(() => {
        // console.log("users");
        // console.log(users);
        // arr.push({
        //     latitude:users[i].location.latitude,
        //     longitude:users[i].location.longitude,
        //     notifyOnExit:true,
        //     notifyOnEnter:true,
        //     radius:5,
        //     user:users[i].username
        // })
        let newobj={...allusers}
        for (const key in allusers) {
            if (newobj[key].username == userdata.username) {
                continue;
            }
            newobj[key].radius=15;
            stopall(newobj[key]);
        }
        
        // console.log("new will be");
        // console.log(arr);
      
      
    }, [allusers])
    
    

    async function signup(details) {
        setIsLoading(true);
        // console.log(details);
        let username = details.email.split("@")[0];
        let register = await signuptoserver({...details});
        if (register=="no internet") {
            setNotification("No Internet !!");
            setIsLoading(false);
            return;
        }
        if (register=="error instore") {
            setNotification("Error in storing data !!");
            setIsLoading(false);
            return;
        }
        if (register=="already exist") {
            setNotification("User already registered !!");
            setIsLoading(false);
            return;
        }
        setUserdata(register);
        setTimeout(() => {
            Alert.alert("user stored");
        }, 1000);
        let sendres = await sendToken(token,username);
        setTimeout(() => {
            Alert.alert("token sent");
        }, 15000);
        let json = JSON.stringify(register);
        setTimeout(() => {
            Alert.alert("json done");
        }, 5000);
        let storetoken = await AsyncStorage.setItem("nearbyuser",json);
        setTimeout(() => {
            Alert.alert("json stored");
        }, 10000);
        
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    async function signin(details) {
        setIsLoading(true);
        // console.log(details);
        let register = await signintoserver({...details});
       
        if (register=="no internet") {
            setNotification("No Internet !!");
            setIsLoading(false);
            return;
        }
        if (register=="error instore") {
            setNotification("Error in storing data !!");
            setIsLoading(false);
            return;
        }
        if (register=="already exist") {
            setNotification("User already registered !!");
            setIsLoading(false);
            return;
        }
        setUserdata(register);
        setTimeout(() => {
            Alert.alert("user stored");
        }, 1000);
        let json = JSON.stringify(register);
        setTimeout(() => {
            Alert.alert("json done");
        }, 5000);
        let store = await AsyncStorage.setItem("nearbyuser",json);
        setTimeout(() => {
            Alert.alert("json stored");
        }, 10000);
        let sendres = await sendToken(token,details.email.split("@")[0]);
        setTimeout(() => {
            Alert.alert("token sent");
        }, 15000);
        setIsAuthenticated(true);
        setIsLoading(false);
    }
    async function autologin() {
        let tokenget = await Notifications.getExpoPushTokenAsync();
        settoken(tokenget.data);
        setIsLoading(true);
        let storeduser = await AsyncStorage.getItem("nearbyuser");
        if (!storeduser) {
            setIsLoading(false);
            return;
        }
        let user = JSON.parse(storeduser);
        setUserdata({...user});
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    async function logout() {
        setIsLoading(true);
        await stopLocationUpdatesAsync("getLocationForNearby");
        let tasks = await TaskManager.getRegisteredTasksAsync();
        for (let ii = 0; ii < tasks.length; ii++) {
            await stopGeofencingAsync(tasks[ii].taskName);
        }
        let removetok = await removeToken(userdata.username);
        let removeuser = await AsyncStorage.removeItem("nearbyuser");
        setIsAuthenticated(false);
        setUserdata();
        setlocation();
        // settoken();
        setIsLoading(false);
    }

    async function addcurrentlocation(obj) {
        setlocation({...obj});
        // console.log("userdata.username");
        // console.log(userdata.username);
        let sendtoserver = await sendlocation({...obj},userdata.username)
    }

    const contextvalues = {
        signup,signin,logout,
        isLoading,isAuthenticated,
        setIsLoading,setIsAuthenticated,
        notification,setNotification,
        userdata,addcurrentlocation,
        allusers,setallusers
    }
    return <Nearbyctx.Provider value={contextvalues}>{children}</Nearbyctx.Provider>
}