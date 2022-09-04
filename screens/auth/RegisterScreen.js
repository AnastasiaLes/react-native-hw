import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Button, ImageBackground, StyleSheet, Text, TextInput, View, Platform } from 'react-native';

const initialState = {
  login: '',
  email: '', 
  password: ''
}


export default function RegisterScreen({navigation}) {
//   console.log(navigation);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [state, setState] = useState(initialState);
  const [active, setActive] = useState({
    login: false,
    email: false,
    password: false
  });
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 20 * 2);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width- 20 * 2;
      console.log(width);
      setDimensions(width);
    }
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])
  
  const hideKeyboard = () => {
    setKeyboardShown(false)
    Keyboard.dismiss()
  }

  const submitForm = () => {
    Keyboard.dismiss()
    console.log(state)
    setState(initialState)
  }
  //  const [loginActive, setLoginActive] = useState(false)

  const handleLoginFocus = () => {
    setActive(() => ({ login: true }))
    setKeyboardShown(true)
  }
  const handleEmailFocus = () => {
    setActive(() => ({ email: true }))
    setKeyboardShown(true)
  }
  const handlePasswordFocus = () => {
    setActive(() => ({ password: true }))
    setKeyboardShown(true)
  }
  const handleInputBlur = () => setActive({
    login: false,
    email: false, 
    password: false})
  
  
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
    <View style={styles.container}>
     
      <ImageBackground
        source={require('../../assets/images/background.png')}
        // resizeMode='cover'
        style={styles.image}>

        <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              > 
          <View style={{
            ...styles.formContainer,
            marginBottom: keyboardShown ? 50 : 0,
          }}>
            <View>
                <View style={styles.imageAdd}>
                                  <View style={styles.plusSign}>
                                      <Image source={require('../../assets/images/Union.png')} />
                                  </View>        
                </View>
            <Text style={styles.text}>Регистрация</Text>
            <TextInput
                placeholder={'Логин'}
                style={
                  // styles.input
                   ({ ...styles.input, borderColor: active.login ?'#FF6C00' : '#E8E8E8', width: dimensions })
                }
                onFocus={handleLoginFocus}
                onBlur={handleInputBlur}
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))}
            />
            <TextInput
              placeholder={'Адрес электронной почты'}
                style={
                   ({ ...styles.input, borderColor: active.email ? '#FF6C00' : '#E8E8E8', width: dimensions })
                }
                onFocus={handleEmailFocus}
                onBlur={handleInputBlur}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))}
            />
            <TextInput
              placeholder={'Пароль'}
              secureTextEntry={true}
                style={
                  ({ ...styles.input, borderColor:  active.password ? '#FF6C00' : '#E8E8E8', width: dimensions })
                }
                onFocus={handlePasswordFocus}
                onBlur={handleInputBlur}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))}
                /> 
             
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
                style={{...styles.button, width: dimensions}}
              onPress={submitForm}>
                
              <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.login}
                onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          
          
          </View>
            </KeyboardAvoidingView> 
    </ImageBackground>
   
    </View>
    </TouchableWithoutFeedback> 
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        resizeMode: 'cover',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderTopRightRadius: 25, 
        borderTopLeftRadius: 25,
        alignItems: 'center',
        // padding: 16,
    },
    imageAdd: {
        width: 120,
        height: 120,
        position: 'relative',
        backgroundColor: '#F6F6F6',
        marginTop: -60,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 16,
    },
    plusSign: {
        position: 'absolute',
        right: -12,
        bottom: 14,
        width: 25,
        height: 25,
        borderColor: '#FF6C00',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
  text: {
    textAlign: 'center',
    fontSize: 30,
    // fontStyle: 'bold',
    marginTop: 32,
      marginBottom: 33,
  },
  // inputsGroup: {
  //   marginBottom: 32,
  // },
  input: {
    borderWidth: 1,
    backgroundColor: '#F6F6F6',
    // borderColor: '#E8E8E8',
    marginBottom: 16,
    borderRadius: 8,
    height: 50,
    color: '#212121',
    padding: 16,
    placeholderTextColor: '#BDBDBD',
  },
  button: {
    borderWidth: 1,
    marginTop: 27,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    borderColor: 'transparent',
    alignItems: 'center',
    padding: 16,
    // cursor: 'pointer',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  login: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 66,
    // cursor: 'pointer',
  },
  loginText: {
    color: '#1B4371',
    fontSize: 16,
  }
});
