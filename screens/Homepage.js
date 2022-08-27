import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Btn, { Icbtn } from "../comps/Btns";
import { Nearbyctx } from "../comps/Nearbyctx";
import { commoncss } from "../constants/commoncss";
import {requestBackgroundPermissionsAsync,requestForegroundPermissionsAsync,getCurrentPositionAsync, startLocationUpdatesAsync, Accuracy} from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import * as TaskManager from "expo-task-manager";
import colors from "../constants/colors";

export default function Homepage({navigation}) {

    let isfc = useIsFocused();
    const [location, setlocation] = useState();
    
    const nearbyctxx = useContext(Nearbyctx);

    async function getCurrentlocation() {
        let locationtask = TaskManager.defineTask("getLocationForNearby", ({ data: { locations }, error }) => {
            if (error) {
              return;
            }
            setlocation({
                latitude:locations[0].coords.latitude,
                longitude:locations[0].coords.longitude,
            });
            nearbyctxx.addcurrentlocation({
                latitude:locations[0].coords.latitude,
                longitude:locations[0].coords.longitude,
            });
           });


        let bgPermission = await requestBackgroundPermissionsAsync();
        let fgPermission = await requestForegroundPermissionsAsync();
        
        // let loc  = await getCurrentPositionAsync();
        let start = await startLocationUpdatesAsync("getLocationForNearby",{accuracy: Accuracy.Balanced})

    }

    useEffect(() => {
        getCurrentlocation()
    }, [isfc])
    
    

    return(
        <View style={styles.mainscreen}>
            <View style={styles.headingdiv}>
                <Text style={styles.pagename}>
                    Nearby
                </Text>
                <View style={styles.icondiv}>
                <Icbtn name={"exit-outline"} onp={nearbyctxx.logout} mh={10} />
                </View>
            </View>
            {nearbyctxx.isAuthenticated&&!!nearbyctxx.userdata.username&&<Text style={styles.welcometext}>
                Welcome, {nearbyctxx.userdata.username}
            </Text>}
            {!!nearbyctxx.allusers&&
                <Btn onp={()=>navigation.navigate("allusers")}>
                    <Text style={styles.textbtn}>Show all Users</Text>
                </Btn>
            }
            {!!location&&<MapView style={styles.locationdiv}
            region={{
                longitude:location.longitude,
                latitude:location.latitude,
                longitudeDelta:0.0100,
                latitudeDelta:0.0100
            }}
            >
                <Marker
                coordinate={{...location}}
                title={"Your current location"}
                />
            </MapView>}
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
    },locationdiv:{
        flex:1,
        marginVertical:20,
        // borderWidth:1,
        // borderColor:"black",
        // backgroundColor:"red",
        // backgroundColor:"red",
    },textbtn:{
        letterSpacing:0.5,
        fontWeight:"bold",
        color:colors.blue4,
        marginBottom:5,
    }
})