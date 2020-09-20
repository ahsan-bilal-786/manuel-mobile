import * as React from 'react';
import {Button, View, Text} from 'react-native';

const SigupScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Sigup Screen</Text>
      <Button
        title="Go to VerifyAccount"
        onPress={() => navigation.navigate('VerifyAccount')}
      />
    </View>
  );
};

export default SigupScreen;
