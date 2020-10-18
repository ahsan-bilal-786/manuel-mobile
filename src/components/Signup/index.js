import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import get from 'lodash/get';
import {styles} from 'screens/Auth/styles';
import {validateSignupCredentials} from 'api';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your Email.')
    .email('Please enter valid Email.'),
  password: Yup.string().required('Please enter the password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password field is required.'),
});

const SignUp = ({onSubmit, fieldProps}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {setSubmitting, setErrors}) => {
      const {email, password} = values;
      validateSignupCredentials(email, password)
        .then((resp) => {
          setSubmitting(false);
          onSubmit(values);
        })
        .catch((e) => {
          setSubmitting(false);
          if (get(e, 'response.data.errors')) setErrors(e.response.data.errors);
        });
    },
  });

  const {errors, isSubmitting, handleSubmit} = formik;
  return (
    <>
      <Input placeholder="Email *" {...fieldProps(formik, 'email')} />

      <Input
        placeholder="Password *"
        secureTextEntry={true}
        {...fieldProps(formik, 'password')}
      />

      <Input
        placeholder="Confirm Password"
        secureTextEntry={true}
        {...fieldProps(formik, 'confirmPassword')}
      />
      {errors.message && (
        <Text style={styles.errorMessage}>{errors.message}</Text>
      )}
      <Button
        title="Next"
        containerStyle={styles.submitBtn}
        disabled={isSubmitting}
        onPress={handleSubmit}
      />
    </>
  );
};

export default SignUp;
