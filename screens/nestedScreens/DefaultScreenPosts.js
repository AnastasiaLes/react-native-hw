import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DefaultScreenPosts = ({ route, navigation }) => {
    const [posts, setPosts] = useState([
        {
        photoUri: '../../assets/images/forest.png',
        name: 'Forest',
        place: 'London'
        }, 
        {
        photoUri: '../../assets/images/sunset.png',
        name: 'Sunset',
        place: 'London'
    }
    ])
    useEffect(() => {
        if (route.params) {
            setPosts(prevState => [...prevState, route.params])
        }
        
    }, [route.params])

    const commentBtn = () => navigation.navigate('Comments')
     
    console.log(posts.length)
    return (
    <View style={styles.container}>
        {posts.length === 0  && <Text>PostsScreen</Text>}
        <FlatList
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) =>
                <View style={{}}>  
                    <Image style={styles.image}
                    source={{uri: item.photoUri,}}
                    />
                    <Text>{item.name}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                        <FontAwesome name="comment" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 240,
        width: 350,
        backgroundColor: '#F6F6F6',
        // marginRight: 16,
        // marginLeft: 16,
        marginTop: 32,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default DefaultScreenPosts;