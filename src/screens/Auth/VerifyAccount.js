import * as React from 'react';
import {Button, View, Text} from 'react-native';

const VerifyAccountScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Verify Account Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default VerifyAccountScreen;
