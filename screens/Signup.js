import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Btn from "../comps/Btns";
import Module from "../comps/Module";
import colors from "../constants/colors";

export default function Signup({navigation}){
    
    return(
        <View style={styles.mainscreen}>
        <StatusBar style='dark'/>
        <View style={styles.dummy}>
            <View style={styles.dummy2}></View>
        </View>
            <Text style={styles.pagename}>
            Nearby 
            </Text>
            <ScrollView style={styles.loginmodulediv}>
                <Module issignup={true} />
            </ScrollView>
            
            <View style={styles.otherdiv}>
            <Text style={styles.othertext}>
                Already have an account ??
            </Text>
            <Btn onp={()=>navigation.navigate("signin")}>
            <Text style={[styles.othertext,{
                color:colors.blue6,
                fontSize:17,
                fontWeight:"700"
                }]}>
                    Sign in
            </Text>
            </Btn>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainscreen:{
        flex:1,
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
        paddingTop:100,
        borderBottomRightRadius:100,
        color:colors.blue1,
        letterSpacing:3,
    },loginmodulediv:{
        // flex:1,
        // justifyContent:"center",
        backgroundColor:"red",
        backgroundColor:colors.blue1,
        borderBottomRightRadius:0,
        borderBottomLeftRadius:0,
        borderRadius:70,
        overflow:"hidden"
        // paddingTop:10,
    },loginbtn:{
        backgroundColor:colors.blue4,
        color:colors.blue1,
        paddingVertical:5,
        marginHorizontal:120,
        textAlign:"center",
        borderRadius:20,
        fontSize:20,
        marginVertical:10,
        letterSpacing:1,
        elevation:10,
        // flex:3,
        // marginBottom:100,
    },otherdiv:{
        // backgroundColor:"blue",
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