import React, { useState, FormEvent}from 'react';
import { StyleSheet, TextInput, SafeAreaView,  TouchableOpacity, Text } from 'react-native';
import { IAppState } from '../redux/store';
import { screenWidth } from '../constants/Layout';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { AppAction } from '../redux/actions';
import { IUser } from '../models/User';
import Toast from 'react-native-toast-message';
const LoginScreen: React.FC = (props:any) => {
  const user = useSelector((state: IAppState) => state.user);
  const dispatch = useDispatch();

  const [working, setWorking] = useState(false);
  const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    });

  const navigation = useNavigation();

  const submit = async () => {
    if (working) return;
    
    console.log("Logging in");

    let authResult;
    try {
      setWorking(true);
      authResult = await axios.post('https://w822121nz1.execute-api.us-east-2.amazonaws.com/Prod/auth/signin', {
        userName: userInfo.userName,
        password: userInfo.password
      });
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Error",
        text2: "Invalid username or password"
      });
      setWorking(false);
      return;
    }

    dispatch({
      type: AppAction.LOGIN,
      payload: {auth: authResult.data[0]},
    });

    let userResult;
    try {
      userResult = await axios.get('https://w822121nz1.execute-api.us-east-2.amazonaws.com/Prod/user/' + userInfo.userName, {
        headers: {
          "Authorization": authResult.data[0].AccessToken
        }
      });
      setWorking(false);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Error",
        text2: "Failed to fetch user data, contact an administrator"
      });
      setWorking(false);
      return;
    }

    const user: IUser = {
      userName: userResult.data[0].dataKey.S,
      displayName: userResult.data[0].displayName.S,
      email: userResult.data[0].email.S,
      profileImg: userResult.data[0].profileImg.S,
      followers: userResult.data[0].followers?.SS || [],
      following: userResult.data[0].following?.SS || []
    }

    dispatch({
      type: AppAction.UPDATE_USER,
      payload: {user: user}
    });
  }

  const redirect = () => {
    navigation.navigate('Home');
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {user !== undefined && redirect()}
      <SafeAreaView style={styles.safeArea}>
        <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white" 
        onChangeText={text => setUserInfo({ ...userInfo, userName: text})}
        keyboardType="ascii-capable"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUserInfo({ ...userInfo, password: text})}
        placeholderTextColor="white" 
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.button, working ? styles.working : styles.notWorking]}
        // onPress={(e) => submitForm(e)}>
        onPress={() => submit()}>
        <Text
          style={styles.text}>Submit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        // onPress={(e) => submitForm(e)}>
        onPress={() => reduxChecker()}>
        <Text
          style={styles.text}>redux</Text>
      </TouchableOpacity> */}
      </SafeAreaView>
      <SafeAreaView style={styles.fillArea}/>
    </SafeAreaView>
  )
    
};

const styles = StyleSheet.create({
  input: {
    width:screenWidth - 100,
    paddingBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: 'purple',
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    paddingHorizontal:25
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'purple',
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  notWorking:{
    backgroundColor: 'purple'
  },

  working:{
    backgroundColor: 'grey'
  },

  safeArea: {
    flex: 3,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  fillArea:{
    flex: 1
  }
});

export default LoginScreen;