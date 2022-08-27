import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Btn from "../comps/Btns";
import Module from "../comps/Module";
import colors from "../constants/colors";

export default function Signin({navigation}){

    return(
        <View style={styles.mainscreen}>
            <View style={styles.dummy}>
                <View style={styles.dummy2}></View>
            </View>
            <Text style={styles.pagename}>
                Nearby
            </Text>
            <ScrollView style={styles.loginmodulediv}>
                <Module issignup={false} />
            </ScrollView>
            <View style={styles.otherdiv}>
            <Text style={styles.othertext}>
                Not have an account ??
            </Text>
            <Btn onp={()=>navigation.navigate("signup")}>
            <Text style={[styles.othertext,{
                color:colors.blue6,
                fontSize:17,
                fontWeight:"700"
                }]}>
                    Create account
            </Text>
            </Btn>
            </View>
        <StatusBar style='dark'/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainscreen:{
        flex:1,
        // justifyContent:"center",
        // backgroundColor:"red",
    },dummy:{
        position:"absolute",
        right:0,left:0,top:0,bottom:0,
        backgroundColor:colors.blue1
    },dummy2:{
        width:"50%",
        backgroundColor:colors.blue4,
        height:"100%",
    },pagename:{
        backgroundColor:colors.blue4,
        fontSize:35,
        fontWeight:"bold",
        textAlign:"center",
        paddingVertical:20,
        paddingTop:130,
        borderBottomRightRadius:100,
        color:colors.blue1,
        letterSpacing:3,
    },loginmodulediv:{
        // flex:1,
        // justifyContent:"center",
        backgroundColor:colors.blue1,
        // backgroundColor:"red",
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderRadius:70,
        paddingTop:20,
    },otherdiv:{
        // flex:1,
        backgroundColor:colors.blue1,
        paddingVertical:20,
        paddingBottom:40,
    },othertext:{
        // backgroundColor:"red",
        flexDirection:"column",
        textAlign:"center",
        color:colors.blue5,
        fontSize:13,
    }
})