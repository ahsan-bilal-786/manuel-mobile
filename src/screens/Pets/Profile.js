import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import map from 'lodash/map';
import {updatePetProfile, getPetProfile, createStaticURL} from 'api';
import {styles} from 'screens/Pets/styles';
import Form from 'components/Pets/Form';
import Layout from 'screens/Pets/Layout';
import photo_1 from '../../assets/images/pets/1.jpg';
import photo_3 from '../../assets/images/pets/3.jpg';
import photo_4 from '../../assets/images/pets/4.jpg';
import photo_5 from '../../assets/images/pets/5.jpg';
import photo_6 from '../../assets/images/pets/6.jpg';
import photo_7 from '../../assets/images/pets/7.jpg';
import photo_8 from '../../assets/images/pets/8.jpg';
import photo_9 from '../../assets/images/pets/9.jpg';

const initialValues = {
  avatar: '',
  petName: '',
  height: '',
  age: '',
  weight: '',
  race: '',
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

const ProfileScreen = ({navigation, route}) => {
  const [hasSubmitted, handleSubmitted] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, {setSubmitting, setErrors}) => {
      const {petName, height, weight, dob, petType} = values;
      updatePetProfile(
        route.params.petId,
        petName,
        height,
        weight,
        dob,
        petType,
        '',
      )
        .then((resp) => {
          fetchPetProfile();
        })
        .catch((e) => {
          console.log('Error', e);
        });
    },
  });

  const fetchPetProfile = () => {
    getPetProfile(route.params.petId)
      .then((resp) => {
        const {id, avatar, dob, height, name, petType, weight} = resp.data;
        const payload = {
          id,
          avatar: avatar ? createStaticURL(avatar) : '',
          dob,
          height,
          petType,
          weight,
          petName: name,
        };
        formik.setValues({
          ...payload,
        });
      })
      .catch((e) => {
        console.log('Error:::', e);
      });
  };

  useEffect(() => {
    const fetchProfile = navigation.addListener('focus', () => {
      fetchPetProfile();
    });
    // Return the function to fetchProfile from the event so it gets removed on unmount
    return fetchProfile;
  }, [navigation]);

  const handleSubmit = () => {
    formik.handleSubmit();
    handleSubmitted(true);
  };
  const handleChange = (fieldId, value) => {
    if (fieldId === 'avatar') {
      handleChangeAvatar(value);
      return;
    }
    formik.setFieldValue(fieldId, value);
    handleSubmit();
  };

  const handleChangeAvatar = (value) => {
    const {petName, height, weight, dob, petType} = formik.values;
    updatePetProfile(
      route.params.petId,
      petName,
      height,
      weight,
      dob,
      petType,
      value,
    )
      .then((resp) => {
        fetchPetProfile();
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  return (
    <Layout
      title={formik.values.petName}
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
      <View>
        <FlatList
          data={[
            photo_1,
            photo_3,
            photo_4,
            photo_5,
            photo_9,
            photo_6,
            photo_7,
            photo_8,
            photo_9,
          ]}
          renderItem={({item}) => (
            <View style={styles.galleryWrapper}>
              <Image style={styles.galleryImage} source={item} />
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Layout>
  );
};

export default ProfileScreen;
