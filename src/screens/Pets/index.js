import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import {Header, Icon,Input } from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Col, Row, Grid } from "react-native-easy-grid";
import { getUserProfile, createStaticURL} from 'api';
import {styles} from 'screens/Pets/styles';
import avatar from '../../assets/images/dogavatar.png';
import photo_1 from '../../assets/images/pets/1.jpg';
import photo_3 from '../../assets/images/pets/3.jpg';
import photo_4 from '../../assets/images/pets/4.jpg';
import photo_5 from '../../assets/images/pets/5.jpg';
import photo_6 from '../../assets/images/pets/6.jpg';
import photo_7 from '../../assets/images/pets/7.jpg';
import photo_8 from '../../assets/images/pets/8.jpg';
import photo_9 from '../../assets/images/pets/9.jpg';

const LeftComponent = ({link}) => {
  return (
    <TouchableOpacity onPress={link}>
      <Icon name="arrow-back" color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const RightComponent = ({link, icon}) => {
  return (
    <TouchableOpacity onPress={link}>
      <Icon name={icon} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

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
    <>
    <Header
        placement="left"
        leftComponent={
          <LeftComponent link={() => navigation.push('Profile')} />
        }
        centerComponent={{text: 'Pug The Thug', style: {color: '#fff'}}}
      />
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.profileInfo}>
        <Grid>
          <Col size={35} style={styles.avatarWrapper}>
            <Image
              source={profile.avatar ? {uri: profile.avatar} : avatar}
              style={styles.userPhoto}
            />
          </Col>
          <Col size={65} style={styles.petNameWrapper}>
            <Text style={styles.personName}>
              {profile.name || 'Pug The Thug'}
            </Text>
          </Col>
        </Grid>
      </View>

      <Grid style={{marginHorizontal: 30}}>
        <Row>
          <Col size={50}>
            <Text>Height: <Text style={styles.petFormVal}>22''</Text></Text>
          </Col>
          <Col size={50}>
            <Text>Age: <Text style={styles.petFormVal}>3 years</Text></Text>
          </Col>
        </Row>
        <Row>
          <Col size={50}>
            <Text>Weight: <Text style={styles.petFormVal}>12 Kg</Text></Text>
          </Col>
          <Col size={50}>
            <Text>Race: <Text style={styles.petFormVal}>Animal</Text></Text>
          </Col>
        </Row>
        </Grid>
      
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
    </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
