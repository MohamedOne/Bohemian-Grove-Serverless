import React from 'react';
import { StyleSheet, Text, SafeAreaView} from 'react-native';
import AnimatedTypeWriter from 'react-native-animated-typewriter';

const SplashScreen: React.FC = (props:any) => {
  function callback(){
    return console.log("hello");
  }

  function welcomeMessage(){
    const message:string = "Welcome to Bohemian Grove, the message app for those in the know.";
    return <AnimatedTypeWriter style={styles.message} text={`${message}`} timeBetweenLetters={60} onTypingEnd={callback} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.smallView}/>

      <SafeAreaView style={styles.smallView}>
        {welcomeMessage()}
      </SafeAreaView>

      <SafeAreaView style={styles.largeView}>
        <Text style={styles.text}>
          In the following example, the red, yellow, and green views are all children in
        </Text>
      </SafeAreaView>

      <SafeAreaView style={styles.smallView}/>
      
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: "column",
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallView:{
    flex:1,
    alignItems: 'center',
    paddingHorizontal:8,
    // backgroundColor: "yellow"
  },

  largeView:{
    flex: 3,
    // backgroundColor: "blue",
  },

  text:{
    color:"white",
    borderWidth:0,
    backgroundColor:"transparent",
  },

  message:{
    color: "white",
    fontSize: 18,
    backgroundColor: "black",
    textAlign:"center",
    borderColor: 'plum',
    borderWidth: 4,
    borderRadius: 4,
    paddingVertical:8,
    paddingHorizontal:8,
    // fontFamily: "BadScript-Regular"
  }
})