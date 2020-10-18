import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, textStyles} from 'screens/Auth/styles';
import Signup from 'components/Signup';
import Details from 'components/Signup/Details';

const steps = {
  signup: 'signup',
  details: 'details',
};

const SignUpScreen = ({navigation}) => {
  const [stepId, handleStep] = useState(steps.signup);
  const [signupData, handleSignupData] = useState({});

  const onSubmitSignup = (data) => {
    handleStep(steps.details);
    handleSignupData(data);
  };

  const onSubmitDetails = () => navigation.navigate('VerifyAccount');

  const fieldProps = (formik, id) => {
    const {values, touched, errors, handleChange, setFieldTouched} = formik;
    return {
      placeholderTextColor: textStyles.color,
      inputContainerStyle: textStyles,
      errorStyle: textStyles,
      style: textStyles,
      value: values[id],
      errorMessage: touched[id] && errors[id],
      onChangeText: handleChange(id),
      onBlur: () => setFieldTouched(id),
    };
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text h1 style={styles.heading}>
        Fiverr.
      </Text>
      {stepId === steps.signup && (
        <Signup onSubmit={onSubmitSignup} fieldProps={fieldProps} />
      )}
      {stepId === steps.details && (
        <Details
          onSubmit={onSubmitDetails}
          signupData={signupData}
          fieldProps={fieldProps}
        />
      )}
    </SafeAreaView>
  );
};

export default SignUpScreen;
