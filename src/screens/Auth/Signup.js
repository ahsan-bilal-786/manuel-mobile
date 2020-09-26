import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import get from 'lodash/get';
import {storeUserToken} from 'utils/asyncStorage';
import {styles, textStyles} from 'screens/Auth/styles';
import {signup, registerToken} from 'api';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  contact: '',
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your Email.')
    .email('Please enter valid Email.'),
  password: Yup.string().required('Please enter the password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password field is required.'),
  name: Yup.string().required('Please enter your Name.'),
  contact: Yup.string().required('Please enter your Contact Number.'),
});

const SignUpScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {setSubmitting, setErrors}) => {
      const {email, password, name, contact} = values;
      signup(email, password, name, contact)
        .then((resp) => {
          setSubmitting(false);
          const {token} = resp.data;
          storeUserToken(token);
          registerToken(token);
          navigation.navigate('VerifyAccount');
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
      <Input placeholder="Name *" {...fieldProps('name')} />

      <Input placeholder="Contact Number *" {...fieldProps('contact')} />
      <Input placeholder="Email *" {...fieldProps('email')} />

      <Input
        placeholder="Password *"
        secureTextEntry={true}
        {...fieldProps('password')}
      />

      <Input
        placeholder="Confirm Password"
        secureTextEntry={true}
        {...fieldProps('confirmPassword')}
      />
      {errors.message && (
        <Text style={styles.errorMessage}>{errors.message}</Text>
      )}
      <Button
        title="Signup"
        containerStyle={styles.submitBtn}
        disabled={isSubmitting}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default SignUpScreen;
