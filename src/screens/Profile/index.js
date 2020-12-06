import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BottomSheet, ListItem, Icon} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flushToken, getUserProfile, createStaticURL} from 'api';
import {deleteUserToken} from 'utils/asyncStorage';
import {styles} from 'screens/Profile/styles';
import cover from '../../assets/images/cover.jpg';
import avatar from '../../assets/images/avatar.png';
import photo_1 from '../../assets/images/photo_1.jpg';
import photo_3 from '../../assets/images/photo_3.jpg';
import photo_4 from '../../assets/images/photo_4.jpg';
import photo_5 from '../../assets/images/photo_5.jpg';
import photo_6 from '../../assets/images/photo_6.jpg';
import photo_7 from '../../assets/images/photo_7.jpg';
import photo_8 from '../../assets/images/photo_8.jpg';
import photo_9 from '../../assets/images/photo_9.jpg';
import photo_10 from '../../assets/images/photo_10.jpg';
import petAvatar from '../../assets/images/dogavatar.png';

const samplePhotos = [
  photo_1,
  photo_3,
  photo_4,
  photo_5,
  photo_9,
  photo_6,
  photo_7,
  photo_8,
  photo_10,
];

const initalValues = {
  name: '',
  avatar: '',
  email: '',
};
const ProfileScreen = ({navigation}) => {
  const [profile, setUserProfile] = useState(initalValues);
  const [pets, setPetsProfile] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: 'Back to Profile',
      onPress: () => {
        setIsVisible(false);
      },
    },
    {
      title: 'Change Photo',
      onPress: () => {
        navigation.navigate('PhotoUpload');
        setIsVisible(false);
      },
    },
    {
      title: 'Logout',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => {
        setIsVisible(false);
        flushToken(null);
        deleteUserToken();
        navigation.navigate('Login');
      },
    },
  ];

  useEffect(() => {
    const fetchProfile = navigation.addListener('focus', () => {
      getUserProfile()
        .then((resp) => {
          const {name, avatar, email, pets} = resp.data;
          setUserProfile({name, avatar: createStaticURL(avatar), email});
          setPetsProfile(pets);
        })
        .catch((e) => {
          console.log(JSON.stringify(e));
        });
    });
    // Return the function to fetchProfile from the event so it gets removed on unmount
    return fetchProfile;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.personName}>{profile.name || ''}</Text>
        <Text
          style={{position: 'absolute', top: 20, right: 0, zIndex: 1}}
          onPress={() => setIsVisible(true)}>
          <Icon raised name="cog" type="font-awesome" color="#f50" />
        </Text>
        <View style={styles.coverArea}>
          <ImageBackground source={cover} style={styles.coverImage}>
            <Image
              source={profile.avatar ? {uri: profile.avatar} : avatar}
              style={styles.userPhoto}
            />
          </ImageBackground>
          <View>
            <TouchableOpacity
              style={{position: 'absolute', right: 0, zIndex: 1}}
              onPress={() => navigation.navigate('Events')}>
              <Icon raised name="event" color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.petListWrapper}>
        <FlatList
          data={[...pets, 'addBtn']}
          renderItem={({item, index}) => (
            <>
              {index < pets.length ? (
                <View style={styles.galleryWrapper}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PetProfile', {petId: item.id})
                    }>
                    <Image
                      style={styles.petThumb}
                      source={item.avatar || petAvatar}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.galleryWrapper}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddPetProfile')}>
                    <Icon raised name="add" color="#000" />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View>
        <FlatList
          data={samplePhotos}
          renderItem={({item}) => (
            <View style={styles.galleryWrapper}>
              <Image style={styles.galleryImage} source={item} />
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ProfileScreen;
