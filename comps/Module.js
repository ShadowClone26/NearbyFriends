import { useContext, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native"
import colors from "../constants/colors"
import Btn from "./Btns";
import { Nearbyctx } from "./Nearbyctx";

export default function Module({issignup}){

    let nearbyctxx = useContext(Nearbyctx);

    const [details, setdetails] = useState();

    function signup() {
        if (!details||!details.email||!details.conemail||!details.password||!details.conpassword) {
            // ToastAndroid.show("hello",ToastAndroid.SHORT)
            nearbyctxx.setNotification("Enter all Details !!");
            return;
            // setTimeout(() => {
            //     setnoti("");
            // }, 7000);
        }else{
            // console.log(details);
            let ind1 = details.email.indexOf("@");
            let ind2 = details.email.indexOf(".");
            if (ind1==-1||ind2==-1||ind2-ind1<2) {
                nearbyctxx.setNotification("Enter valid Email !!");
                return;
            }
            if (details.email!=details.conemail) {
                nearbyctxx.setNotification("Email confirmation wrong !!");
                return;
            }
            if (details.password.length<8) {
                nearbyctxx.setNotification("Minimum 8 characters required in password");
                return;
            }
            else{
                if (details.password!=details.conpassword) {
                    nearbyctxx.setNotification("Password confirmation wrong !!");
                    return;
                }
            }
            // console.log("ok, valid perform login")
            nearbyctxx.signup({...details});
        }
    }
    function signin() {
        if (!details||!details.email||!details.password) {
            // ToastAndroid.show("hello",ToastAndroid.SHORT)
            nearbyctxx.setNotification("Enter all Details !!");
            return;

            // setTimeout(() => {
            //     setnoti("");
            // }, 7000);
        }else{
            // console.log(details);
            let ind1 = details.email.indexOf("@");
            let ind2 = details.email.indexOf(".");
            if (ind1==-1||ind2==-1||ind2-ind1<2) {
                nearbyctxx.setNotification("Enter valid Email !!");
                return;
            }
            if (details.password.length<8) {
                nearbyctxx.setNotification("Minimum 8 characters are there in password");
                return;
            }
            // console.log("ok, valid perform login");
            nearbyctxx.signin({...details});

        }
    }

    function changefield(field,value) {
        nearbyctxx.setNotification("");
        !!details
        ?setdetails({...details,[field]:value})
        :setdetails({[field]:value})
        // return;
        
    }


    // console.log(details);
    
    return(
        <ScrollView style={styles.mainscreen}>
            
            {nearbyctxx.isLoading&&<Modal visible={nearbyctxx.isLoading} transparent={true}>
                <ActivityIndicator size={100} color={colors.blue6} style={styles.loadingspin} />
            </Modal>}
           {!!nearbyctxx.notification&& <Modal visible={!!nearbyctxx.notification} animationType="slide" onRequestClose={()=>nearbyctxx.setNotification("")} transparent={true}>
                <Modal visible={!!nearbyctxx.notification} onRequestClose={()=>nearbyctxx.setNotification("")} transparent={true} animationType="fade">
                    <Pressable style={styles.dummy} onPress={()=>nearbyctxx.setNotification("")}></Pressable>
                </Modal>
                <View style={styles.notidiv}>
                    <Text style={styles.noti}>
                        {nearbyctxx.notification}
                    </Text>
                    <Btn><Text style={styles.okbtn} onPress={()=>nearbyctxx.setNotification("")}>ok</Text></Btn>
                </View>
            </Modal>}
                <View style={styles.ipbardiv}>
                <TextInput placeholderTextColor={colors.blue1} style={styles.ipbar} placeholder="Email" onChangeText={changefield.bind(this,"email")} />

                {issignup&&
                    <TextInput placeholderTextColor={colors.blue1} style={styles.ipbar} placeholder="Confirm email" onChangeText={changefield.bind(this,"conemail")} />}
                
                <TextInput placeholderTextColor={colors.blue1} style={styles.ipbar} placeholder="Password" secureTextEntry={true} onChangeText={changefield.bind(this,"password")} />
                
                {issignup&&
                    <TextInput placeholderTextColor={colors.blue1} style={styles.ipbar} placeholder="Confirm password" secureTextEntry={true} onChangeText={changefield.bind(this,"conpassword")} />}

                

                <Btn onp={issignup?signup:signin}>
                    <Text style={styles.loginbtn}>
                        {issignup?"Signup":"Signin"}
                    </Text>
                </Btn>

                </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainscreen:{
        // flex:1,
        // justifyContent:"center"
        // backgroundColor:"red",
    },loadingspin:{
        flex:1,
        opacity:0.5,
        backgroundColor:colors.blue1
    },ipbardiv:{
        // backgroundColor:"red",
        paddingTop:30,
    },ipbar:{
        backgroundColor:colors.blue5,
        marginHorizontal:40,
        marginVertical:5,
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:25,
        elevation:7,
        fontSize:18,
        letterSpacing:2,
        color:colors.blue1,
    },loginbtn:{
        backgroundColor:colors.blue4,
        color:colors.blue1,
        paddingVertical:5,
        paddingHorizontal:35,
        marginHorizontal:100,
        textAlign:"center",
        borderRadius:20,
        fontSize:20,
        marginVertical:10,
        letterSpacing:1,
        elevation:10,
        // flex:3,
        // marginBottom:100,
    },notidiv:{
        // backgroundColor:"red",
        position:"absolute",
        alignItems:"center",
        bottom:0,
        left:10,
        right:10,
        backgroundColor:colors.skin,
        paddingVertical:20,
        paddingBottom:30,
        borderRadius:55,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
    },noti:{
        // width:"90%",
        // textAlign:"center",
        // marginHorizontal:20,
        fontSize:18,
        letterSpacing:0.5,
        paddingHorizontal:30,
        textAlign:"center",
        
        // justifyContent:"center",
        // marginVertical:7,
        // opacity:0.7,
        // fontWeight:"500"
    },dummy:{
        top:0,right:0,left:0,bottom:0,
        backgroundColor:colors.blue1,
        position:"absolute",
        opacity:0.4,
    },okbtn:{
        backgroundColor:colors.blue3,
        color:colors.blue5,
        fontSize:18,
        textTransform:"uppercase",
        fontWeight:"bold",
        paddingHorizontal:40,
        marginVertical:10,
        paddingVertical:3,
        borderRadius:20,
        elevation:4,
    }
})