import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import get from 'lodash/get';
import {storeUserToken} from 'utils/asyncStorage';
import {login, registerToken} from 'api';
import {styles, textStyles} from 'screens/Auth/styles';

const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your Email.')
    .email('Please enter valid Email.'),
  password: Yup.string().required('Please enter the password.'),
});

const LoginScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {setSubmitting, setErrors}) => {
      const {email, password} = values;
      login(email, password)
        .then((resp) => {
          setSubmitting(false);
          const {token, isVerified} = resp.data;
          if (isVerified) {
            storeUserToken(token);
            registerToken(token);
            navigation.navigate('Profile');
          } else {
            storeUserToken(token);
            registerToken(token);
            navigation.navigate('VerifyAccount');
          }
        })
        .catch((e) => {
          setSubmitting(false);
          if (get(e, 'response.data.errors')) setErrors(e.response.data.errors);
        });
    },
  });
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    isSubmitting,
    handleSubmit,
  } = formik;
  const fieldProps = (id) => {
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

      <Input placeholder="Email" {...fieldProps('email')} />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        {...fieldProps('password')}
      />
      {errors.message && (
        <Text style={styles.errorMessage}>{errors.message}</Text>
      )}
      <Button
        title="Login"
        containerStyle={styles.submitBtn}
        disabled={isSubmitting}
        onPress={handleSubmit}
      />
      <Text style={styles.join} onPress={() => navigation.navigate('Signup')}>
        Not a member yet? Join Now
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
