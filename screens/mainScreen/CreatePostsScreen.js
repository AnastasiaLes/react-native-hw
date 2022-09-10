import React from "react";
import { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity, TextInput, View, Text, StyleSheet, Image, Button, KeyboardAvoidingView } from 'react-native';

const initialState = {
    photoUri: '',
    name: '',
    place: ''
}

const CreatePostsScreen = ({ navigation }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 20 * 2);
    const [camera, setCamera] = useState(null);
    const [postInfo, setPostInfo] = useState(initialState);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState('');
    
    useEffect(() => {
        
    const onChange = () => {
      const width = Dimensions.get('window').width- 20 * 2;
      console.log('width', width);
      setDimensions(width);
    }
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
    
    }, [])

    
    const takePhoto = async () => {
        // console.log('Click')
        // console.log("camera", camera)
        const photo = await camera.takePictureAsync({pictureSize: 250});
        // const location = await Location.getCurrentPositionAsync();
        // setLocation(location);
        // console.log("location", location);
        setPhoto(photo.uri);
        console.log("URI", photo.uri);
    }

    const addLocation = async () => {
        console.log('Click');
        const geoLocation = await Location.getCurrentPositionAsync({});
        setLocation(geoLocation);
        console.log("location", geoLocation);
    }

    const sendPhoto = () => {
        // navigation.navigate('DefaultScreen', { postInfo });
        console.log(postInfo);
    }

    return <View style={styles.container}>
        <View style={styles.addImgContainer}>
            <TouchableOpacity style={styles.camera} onPress={takePhoto}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Camera ref={setCamera}>
            {/* {photo && <View style={{...styles.imgContainer, width: 350, height: 240}}>
                <Image source={{ uri: photo }} style={{height: 240, width: 350}} />
            </View>}  */}
        </Camera>
        </View>
        
        <Text style={styles.loadImgText}>Загрузите фото</Text>

        {/* <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'margin' : 'height'}> */}

            <TextInput
        placeholder={'Название...'}
            style={styles.input}
            onChangeText={(value) =>
                  setPostInfo((prevState) => ({ ...prevState, name: value }))}
        />
        
        <View style={{position: 'relative'}}>
            <TextInput
                onFocus={addLocation}
                placeholder={'Местность...'}
                value={location}
                // onChangeText={(value) =>
                //   setPostInfo((prevState) => ({ ...prevState, place: value }))}
                style={{ ...styles.input, paddingLeft: 28,  }} />
            <SimpleLineIcons style={{position:'absolute', bottom: 15}} name="location-pin" size={24} color='#BDBDBD' />
        </View>
        
        <TouchableOpacity
            activeOpacity={0.7}
            style={{...styles.button, width: dimensions}}
            onPress={sendPhoto}
        >
            <Text style={{fontSize: 16, color: '#BDBDBD'}}>Опубликовать</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            activeOpacity={0.7}
            style={{...styles.button, width: 70}}
            // onPress={ }
        >
            <AntDesign name="delete" size={24} color='#BDBDBD' />
        </TouchableOpacity>
        {/* </KeyboardAvoidingView> */}

        
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingHorizontal: 16,
    },
    addImgContainer: {
        height: 240,
        backgroundColor: '#F6F6F6',
        // marginRight: 16,
        // marginLeft: 16,
        marginTop: 32,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        position: 'absolute',
        height: 240,
        top: 0,
        left: 0,
        borderWidth: 1,
        borderColor: 'red',
    },
    camera: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadImgText: {
        color: '#BDBDBD',
        marginTop: 8,
        // marginLeft: 16,
        fontSize: 16,
    },
    input: {
        marginTop: 48,
        paddingBottom: 15,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        placeholderTextColor: '#BDBDBD',
        fontSize: 16,
    },
    button: {
        // width: 100,
        marginTop: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: '#F6F6F6', 
        borderRadius: 100,
        alignItems: 'center',
    }
})

export default CreatePostsScreen;