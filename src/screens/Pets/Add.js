import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {getUserProfile, createStaticURL} from 'api';
import Form from 'components/Pets/Form';
import Layout from 'screens/Pets/Layout';
import {styles} from 'screens/Pets/styles';

const initalValues = {
  name: '',
  avatar: '',
  email: '',
};

const ProfileScreen = ({navigation}) => {
  const [profile, setUserProfile] = useState(initalValues);

  useEffect(() => {
    const fetchProfile = navigation.addListener('focus', () => {
      getUserProfile().then((resp) => {
        const {name, avatar, email} = resp.data;
        setUserProfile({name, avatar: createStaticURL(avatar), email});
      });
    });
    // Return the function to fetchProfile from the event so it gets removed on unmount
    return fetchProfile;
  }, [navigation]);

  return (
    <Layout
      title="Add The Pet"
      handleLeftClick={() => navigation.navigate('Profile')}>
      <Form profile={profile} />
      <View style={styles.submitBtn}>
        <Button title="Save" />
      </View>
    </Layout>
  );
};

export default ProfileScreen;
