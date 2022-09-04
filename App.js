import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';


export default function App() {
  
  const routing = useRoute({})
  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer> 
  )
}

