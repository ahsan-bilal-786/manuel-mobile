import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, textStyles} from 'screens/Auth/styles';

const VerifyAccountScreen = ({navigation}) => {
  return (
    <SafeAreaView style={[styles.wrapper, styles.alignTop]}>
      <Text h1 style={styles.heading}>
        Fiverr.
      </Text>

      <Input
        placeholder="Verification Code"
        errorMessage=""
        placeholderTextColor={textStyles.color}
        inputContainerStyle={textStyles}
        errorStyle={textStyles}
        style={textStyles}
      />

      <Button
        title="Verify"
        containerStyle={styles.submitBtn}
        onPress={() => navigation.navigate('PhotoUpload')}
      />
    </SafeAreaView>
  );
};

export default VerifyAccountScreen;
