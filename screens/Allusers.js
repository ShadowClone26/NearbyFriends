import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Btn, { Icbtn } from "../comps/Btns";
import { Nearbyctx } from "../comps/Nearbyctx";
import { commoncss } from "../constants/commoncss";
import {requestBackgroundPermissionsAsync,requestForegroundPermissionsAsync,getCurrentPositionAsync, startLocationUpdatesAsync, Accuracy} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import * as TaskManager from "expo-task-manager";
import colors from "../constants/colors";

export default function Allusers({navigation}) {

    let isfc = useIsFocused();
    const nearbyctxx = useContext(Nearbyctx);
    const [users, setusers] = useState([]);
    // console.log("users");
    // console.log(users);


    useEffect(() => {
        let userarr=[];
        for (const key in nearbyctxx.allusers) {
        userarr.push({
            ...nearbyctxx.allusers[key]
        })
      }
      setusers([...userarr]);
    }, [isfc])
    

    return(
        <View style={styles.mainscreen}>
            <View style={styles.headingdiv}>
                {/* <Text style={styles.pagename}>
                    Nearby
                </Text> */}
                <View style={styles.icondiv}>
                <Icbtn name={"arrow-back"} onp={()=>navigation.goBack()} mh={5} />
                </View>
            </View>
            
           <Text style={styles.welcometext}>
                All users
            </Text>
            <FlatList
            data={users}
            renderItem={(item)=>{
                return(
                    <Text style={styles.username}>{item.item.username}</Text>
                )
            }}
            keyExtractor={(data,index)=>index}
            />
            

        </View>
    )
}

const styles = StyleSheet.create({
    ...commoncss,mainscreen:{
        flex:1,
        paddingHorizontal:25,
    },welcomediv:{
        // paddingHorizontal:25,
    },welcometext:{
        fontSize:30,
        fontWeight:"bold",
        paddingVertical:10,
        paddingLeft:10,
    },username:{
        fontSize:18,
        paddingLeft:10,
        letterSpacing:0.5,
    }
})