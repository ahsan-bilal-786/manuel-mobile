import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useFormik} from 'formik';
import map from 'lodash/map';
import * as Yup from 'yup';
import {Button} from 'react-native-elements';
import Form from 'components/Pets/Form';
import Layout from 'screens/Pets/Layout';
import {styles} from 'screens/Pets/styles';
import {addPetProfile} from 'api';

const initialValues = {
  avatar: '',
  petName: '',
  height: '',
  age: '',
  weight: '',
  petType: '',
};

const validationSchema = Yup.object().shape({
  // avatar: Yup.string().required('Please upload avatar.'),
  petName: Yup.string().required('Please enter Name.'),
  height: Yup.number()
    .typeError('Height should be a number.')
    .required('Please enter height.'),
  dob: Yup.string().required('Please enter DOB.'),
  weight: Yup.number()
    .typeError('Weight should be a number.')
    .required('Please enter Weight.'),
  petType: Yup.string().required('Please enter Race.'),
});

const AddPetScreen = ({navigation}) => {
  const [hasSubmitted, handleSubmitted] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, {setSubmitting, setErrors}) => {
      const {avatar, petName, height, weight, dob, petType} = values;
      addPetProfile(avatar, petName, height, weight, dob, petType)
        .then((resp) => {
          navigation.navigate('Profile');
        })
        .catch((e) => {
          console.log('Error', e);
        });
    },
  });

  const handleChange = (fieldId, value) => formik.setFieldValue(fieldId, value);
  const handleSubmit = () => {
    formik.handleSubmit();
    handleSubmitted(true);
  };
  return (
    <Layout
      title={formik.values.petName || 'Add Pet'}
      handleLeftClick={() => navigation.navigate('Profile')}>
      <Form values={formik.values} onChange={handleChange} />
      {hasSubmitted && (
        <View style={{marginHorizontal: 15, marginBottom: 6}}>
          {map(formik.errors, (error, i) => (
            <Text key={i} style={styles.error}>
              {error}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.submitBtn}>
        <Button
          title="Save"
          disabled={formik.isSubmitting}
          onPress={handleSubmit}
        />
      </View>
    </Layout>
  );
};

export default AddPetScreen;
