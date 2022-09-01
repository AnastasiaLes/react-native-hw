import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Button, ImageBackground, StyleSheet, Text, TextInput, View, Platform } from 'react-native';

const initialState = {
  login: '',
  email: '', 
  password: ''
}


export default function App() {
  // console.log(Platform.OS);
  const [keyboardShown, setKeyboardShown] = useState(false)
  const [state, setState] = useState(initialState)
  const [active, setActive] = useState({
    login: false,
    email: false, 
    password: false})

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
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.image}>

        
          <View style={{...styles.formContainer, marginBottom: keyboardShown ? -200 : 0}}>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "margin" : "height"}
              > 
            <Text style={styles.text}>Регистрация</Text>
            <TextInput
                placeholder={'Логин'}
                style={
                  // styles.input
                  active.login ? ({ ...styles.input, borderColor: '#FF6C00' }) : ({ ...styles.input, borderColor: '#E8E8E8' })
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
                  active.email ? ({ ...styles.input, borderColor: '#FF6C00' }) : ({ ...styles.input, borderColor: '#E8E8E8' })
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
                  active.password ? ({ ...styles.input, borderColor: '#FF6C00' }) : ({ ...styles.input, borderColor: '#E8E8E8' })
                }
                onFocus={handlePasswordFocus}
                onBlur={handleInputBlur}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))}
                /> 
            </KeyboardAvoidingView>  
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
                style={styles.button}
              onPress={submitForm}>
                
              <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.login}>
              <Text style={styles.loginText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          
          
          </View>
        
      
         
        
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
  },
  formContainer: {

    backgroundColor: '#fff',
    borderTopRightRadius: 25, 
    borderTopLeftRadius: 25,
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    // fontStyle: 'bold',
    marginTop: 92,
    marginBottom: 33,
  },
  inputsGroup: {
    marginBottom: 32,
  },
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  login: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 66,
  },
  loginText: {
    color: '#1B4371',
    fontSize: 16,
  }
});
