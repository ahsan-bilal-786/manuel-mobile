import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import map from 'lodash/map';
import ImagePicker from 'react-native-image-picker';
import {
  updatePetProfile,
  getPetProfile,
  createStaticURL,
  createPost,
  updatePost,
  getPetPosts,
} from 'api';
import PostView from 'components/PostView';
import Modal from 'components/Modals';
import Form from 'components/Pets/Form';
import Layout from 'screens/Pets/Layout';
import PostsPanel from 'components/Posts';
import {styles} from 'screens/Pets/styles';

const initialValues = {
  avatar: '',
  petName: '',
  height: '',
  age: '',
  weight: '',
  race: '',
};

const initPostValues = {
  id: '',
  date: '',
  photo: '',
  description: '',
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
  const [post, handlePost] = useState(initPostValues);
  const [petPosts, handlePetPosts] = useState([]);

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
      fetchPosts();
    });
    // Return the function to fetchProfile from the event so it gets removed on unmount
    return fetchProfile;
  }, [navigation]);

  const handleSubmit = () => {
    formik.handleSubmit();
    handleSubmitted(true);
  };

  const handleChangeDescription = (value) =>
    handlePost({
      ...post,
      description: value,
    });

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

  const openPost = (item) => {
    const {avatar, createdAt, description, id} = item;
    handlePost({
      id,
      description,
      date: createdAt,
      photo: avatar,
    });
  };

  const addPost = () => {
    let options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        privateDirectory: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        handlePost({
          ...initPostValues,
          photo: response.uri,
        });
      }
    });
  };

  const closePostModal = () => {
    handlePost({
      ...initPostValues,
    });
  };

  const fetchPosts = async () => {
    const posts = await getPetPosts(route.params.petId);
    handlePetPosts(posts.data);
  };

  const savePost = async () => {
    const {id, photo, description} = post;
    if (id) {
      const updateResp = await updatePost(id, description);
      if (updateResp.status === 200) {
        closePostModal();
        fetchPosts();
      }
    } else {
      const createResp = await createPost(
        photo,
        description,
        'pet',
        route.params.petId,
      );
      if (createResp.status === 201) {
        closePostModal();
        fetchPosts();
      }
    }
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
      <PostsPanel postsList={petPosts} addPost={addPost} openPost={openPost} />
      {post.photo !== '' && (
        <Modal handleClose={closePostModal}>
          <PostView
            {...post}
            handleSubmit={savePost}
            handleChangeDescription={handleChangeDescription}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default ProfileScreen;
