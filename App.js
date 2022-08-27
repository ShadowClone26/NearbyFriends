import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import { Nearbyctx, Nearbyctxp } from './comps/Nearbyctx';
import { useContext, useEffect } from 'react';
import Homepage from './screens/Homepage';
import { firebaseappcfg } from './constants/firebasecfg';
import {initializeApp} from "firebase/app";
import Allusers from './screens/Allusers';
import * as Notifications from "expo-notifications";

let fireapp = initializeApp(firebaseappcfg);

let stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  let nearbyctxx = useContext(Nearbyctx);

  async function getperms() {
    let status = await Notifications.requestPermissionsAsync();
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
      
  }

  useEffect(() => {
    getperms();
  }, [])
  

  function Unauthed() {
    return(
      <stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <stack.Screen name='signin' component={Signin} />
        <stack.Screen name='signup' component={Signup} />
      </stack.Navigator>
    )
  }

  function Authed() {
    return(
      <stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <stack.Screen name='homepage' component={Homepage} />
        <stack.Screen name='allusers' component={Allusers} />
      </stack.Navigator>
    )
  }

  function Mainstack() {

  let nearbyctxx2 = useContext(Nearbyctx);
    return(
      <NavigationContainer>
        {!nearbyctxx2.isAuthenticated&&<Unauthed />}
        {nearbyctxx2.isAuthenticated&&<Authed />}
        {/* <Authed /> */}
      </NavigationContainer>
    )
  }

  return (
    <>
    <Nearbyctxp>
      <Mainstack />
    </Nearbyctxp>
    <StatusBar style='dark' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
