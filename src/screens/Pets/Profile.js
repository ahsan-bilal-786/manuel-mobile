import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import {Header, Icon, Input} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getUserProfile, createStaticURL} from 'api';
import {styles} from 'screens/Pets/styles';
import Form from 'components/Pets/Form';
import Layout from 'screens/Pets/Layout';
import avatar from '../../assets/images/dogavatar.png';
import photo_1 from '../../assets/images/pets/1.jpg';
import photo_3 from '../../assets/images/pets/3.jpg';
import photo_4 from '../../assets/images/pets/4.jpg';
import photo_5 from '../../assets/images/pets/5.jpg';
import photo_6 from '../../assets/images/pets/6.jpg';
import photo_7 from '../../assets/images/pets/7.jpg';
import photo_8 from '../../assets/images/pets/8.jpg';
import photo_9 from '../../assets/images/pets/9.jpg';

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

  const handleLinkClick = () => {
    handleActiveView(activeView === view.form ? view.list : view.form);
    handleEventData(null);
  };

  return (
    <Layout
      title="Pug The Thug"
      handleLeftClick={() => navigation.navigate('Profile')}>
      <Form profile={profile} />
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
