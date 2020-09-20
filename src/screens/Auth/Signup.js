import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, textStyles} from 'screens/Auth/styles';

const SignUpScreen = ({navigation}) => {
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

      <Input
        placeholder="Confirm Password"
        secureTextEntry={true}
        errorMessage=""
        placeholderTextColor={textStyles.color}
        errorStyle={textStyles}
        style={textStyles}
      />

      <Input
        placeholder="First Name"
        errorMessage=""
        placeholderTextColor={textStyles.color}
        inputContainerStyle={textStyles}
        errorStyle={textStyles}
        style={textStyles}
      />

      <Input
        placeholder="Last Name"
        errorMessage=""
        placeholderTextColor={textStyles.color}
        inputContainerStyle={textStyles}
        errorStyle={textStyles}
        style={textStyles}
      />

      <Button
        title="Signup"
        containerStyle={styles.submitBtn}
        onPress={() => navigation.navigate('VerifyAccount')}
      />
    </SafeAreaView>
  );
};

export default SignUpScreen;
