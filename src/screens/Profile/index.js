import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Text>Login Screen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
