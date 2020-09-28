import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'screens/Auth/Login';
import SignupScreen from 'screens/Auth/Signup';
import AuthLoadingScreen from 'screens/Auth/AuthLoading';
import VerifyAccountScreen from 'screens/Auth/VerifyAccount';
import PhotoUpload from 'screens/Auth/PhotoUpload';
import ProfileScreen from 'screens/Profile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
              name="AuthLoading"
              component={AuthLoadingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccountScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PhotoUpload"
              component={PhotoUpload}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default App;
