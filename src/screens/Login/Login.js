import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import navigationStrings from '../../constants/navigationStrings';
import WrapperContainer from '../../components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import TextInputComp from '../../components/TextInputComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonComp from '../../components/ButtonComp';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [emial, setEmail] = useState('');
  const [number, setNumber] = useState('');
  console.log(number, 'number', emial, 'emial');
  useEffect(() => {
    console.log('Initialized Firebase Apps', firebase.apps.length);
  });
  const userLoginUnnon = async () => {
    try {
      const userEmial = await auth().signInAnonymously();
      console.log('my uid :', userEmial.user.uid);
      if (userEmial.user.uid) {
        navigation.navigate(navigationStrings.OTP_SCREEN);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createAccountInfirebase = async () => {
    try {
      auth()
        .createUserWithEmailAndPassword('testOne@gmail.com', 'Test@12345')
        .then(res => {
          console.log(res);
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const loginCreatedUser = async () => {
    try {
      auth()
        .signInWithEmailAndPassword('testOne@gmail.com', 'Test@12345')
        .then(res => {
          console.log(res, 'login res');
        });
    } catch (error) {
      console.log(error, 'login error');
    }
  };

  const signOutUserCall = async() =>{
    try{
      auth().signOut().then((res)=>{

        console.log(res,'signout method call');
        
      })
    }catch(error){
      console.log(error,'signout error');
      
    }
  }
  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Image style={styles.imageStyle} source={imagePath.logoImage} />
        <View>
          <Text style={styles.textStyle}>OTP Verification</Text>
          <Text style={styles.enterEmailText}>
            Enter email and phone number to send one time Password
          </Text>
          <View style={styles.inputViewStyle}>
            <TextInputComp
              value={emial}
              onChangeText={text => setEmail(text)}
              keyboardType={'email-address'}
              placeholder={'Enter your email'}
              rightIcon={true}
            />
            <TextInputComp
              value={number}
              onChangeText={text => setNumber(text)}
              placeholder={'Phone number'}
              keyboardType={'number-pad'}
            />
            <ButtonComp
              // onPress={() => navigation.navigate(navigationStrings.OTP_SCREEN)}
              onPress={() => signOutUserCall()}
              buttonText={'Continue'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: textScale(22),
    fontWeight: '700',
    color: colors.black,
    marginTop: moderateScale(70),
  },
  enterEmailText: {
    fontSize: textScale(18),
    color: colors.black60,
    fontWeight: '500',
    marginTop: moderateScale(15),
  },
  inputViewStyle: {
    marginTop: moderateScale(50),
  },
});
