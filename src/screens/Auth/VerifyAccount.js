import React, {useState, useEffect} from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, textStyles} from 'screens/Auth/styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import get from 'lodash/get';
import {verifyUserAccount, registerToken} from 'api';
import {getUserToken} from 'utils/asyncStorage';

const initialValues = {
  verificationCode: '',
};

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required(
    'Please enter the token sent to your Email.',
  ),
});

const VerifyAccountScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {setSubmitting, setErrors}) => {
      const {verificationCode} = values;
      verifyUserAccount(verificationCode)
        .then((resp) => {
          setSubmitting(false);
          navigation.navigate('Profile');
        })
        .catch((e) => {
          setSubmitting(false);
          if (get(e, 'response.data.errors')) {
            setErrors(e.response.data.errors);
          }
        });
    },
  });
  useEffect(() => {
    getUserToken().then((resp) => {
      registerToken(resp);
    });
  }, []);

  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    isSubmitting,
    handleSubmit,
  } = formik;
  return (
    <SafeAreaView style={[styles.wrapper, styles.alignTop]}>
      <Text h1 style={styles.heading}>
        Fiverr.
      </Text>
      <Input
        placeholder="Verification Code"
        placeholderTextColor={textStyles.color}
        inputContainerStyle={textStyles}
        errorStyle={textStyles}
        style={textStyles}
        value={values.verificationCode}
        errorMessage={touched.verificationCode && errors.verificationCode}
        onChangeText={handleChange('verificationCode')}
        onBlur={() => setFieldTouched('verificationCode')}
      />

      <Button
        title="Verify"
        containerStyle={styles.submitBtn}
        disabled={isSubmitting}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default VerifyAccountScreen;
