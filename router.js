import React from "react";
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const MainTab = createBottomTabNavigator();

const AuthStack = createStackNavigator();

import RegisterScreen from './screens/auth/RegisterScreen';
import LoginScreen from './screens/auth/LoginScreen';
import PostsScreen from './screens/mainScreen/PostsScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen';
// icons imports
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

export const useRoute = (isAuth) => {
  if (!isAuth) {
  return  <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
          headerShown: false
        }}
          name='Register'
          component={RegisterScreen} />
        <AuthStack.Screen
          options={{
          headerShown: false
        }}
          name='Login'
          component={LoginScreen} />
      </AuthStack.Navigator> 
  }
    return <MainTab.Navigator
        tabBarOptions={{ showLabel: false }}
        screenOptions={{
        tabBarActiveTintColor: '#FF6C00',
      }}
    >
        <MainTab.Screen
            options={{
                headerTitle: 'Публикации',
                headerRight: () => <Ionicons
                    onPress={() => alert('Logout')}
                    name="exit-outline" size={24} color='#BDBDBD' />,
                tabBarIcon: ({focused, size, color}) =>
                    <AntDesign
                        name="appstore-o" size={size} color={color} />
            }}
            name='Posts' component={PostsScreen} />
        <MainTab.Screen
            options={{
                headerTitle: 'Создать публикацию',
                headerLeft: () => <Ionicons
                    onPress={() => alert('This is a button!')}
                    name="arrow-back" size={24} color="#212121" />,
                tabBarIcon: ({focused, size, color}) =>
                <AntDesign name="pluscircle" size={size} color={color} />
            }}
            name='Create'
            component={CreatePostsScreen} />
        <MainTab.Screen
            options={{
                headerShown: false,
                tabBarIcon: ({focused, size, color}) =>
                <Feather name="user" size={size} color={color} />
            }}
            name='Profile'
            component={ProfileScreen} />
      </MainTab.Navigator>

}