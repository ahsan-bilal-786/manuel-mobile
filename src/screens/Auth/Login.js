import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, textStyles} from 'screens/Auth/styles';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text h1 style={styles.heading}>
        Fiverr.
      </Text>

      <Input
        placeholder="Email"
        errorMessage=""
        placeholderTextColor={textStyles.color}
        inputContainerStyle={textStyles}
        errorStyle={textStyles}
        style={textStyles}
      />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        errorMessage=""
        placeholderTextColor={textStyles.color}
        errorStyle={textStyles}
        style={textStyles}
      />

      <Button
        title="Login"
        containerStyle={styles.submitBtn}
        onPress={() => {}}
      />
      <Text style={styles.join} onPress={() => navigation.navigate('Signup')}>
        Not a member yet? Join Now
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
