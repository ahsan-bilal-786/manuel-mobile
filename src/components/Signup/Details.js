import * as React from 'react';
import {Text, Input, Button} from 'react-native-elements';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import get from 'lodash/get';
import {storeUserToken} from 'utils/asyncStorage';
import {styles} from 'screens/Auth/styles';
import {signup, registerToken} from 'api';

const initialValues = {
  name: '',
  contact: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your Name.'),
  contact: Yup.string().required('Please enter your Contact Number.'),
});

const Details = ({signupData, onSubmit, fieldProps}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, {setSubmitting, setErrors}) => {
      const {name, contact} = values;
      const {email, password} = signupData;
      signup(email, password, name, contact)
        .then((resp) => {
          setSubmitting(false);
          const {token} = resp.data;
          storeUserToken(token);
          registerToken(token);
          onSubmit();
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
      <Input placeholder="Name *" {...fieldProps(formik, 'name')} />

      <Input
        placeholder="Contact Number *"
        {...fieldProps(formik, 'contact')}
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
    </>
  );
};

export default Details;
