import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BottomSheet, ListItem, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-picker';
import {
  flushToken,
  getUserProfile,
  uploadUserPhoto,
  createStaticURL,
  createUserPost,
  getUserPosts,
} from 'api';
import {deleteUserToken} from 'utils/asyncStorage';
import ProfilePhoto from 'components/Photo/Profile';
import PostView from 'components/PostView';
import Modal from 'components/Modals';
import {styles} from 'screens/Profile/styles';
import cover from '../../assets/images/cover.jpg';
import avatar from '../../assets/images/avatar.png';
import petAvatar from '../../assets/images/dogavatar.png';

const initalValues = {
  name: '',
  avatar: '',
  email: '',
};

const initPostValues = {
  id: '',
  date: '',
  photo: '',
  description: '',
};

const ProfileScreen = ({navigation}) => {
  const [profile, setUserProfile] = useState(initalValues);
  const [pets, setPetsProfile] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [post, handlePost] = useState(initPostValues);
  const [userPosts, handleUserPosts] = useState([]);
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
    const posts = await getUserPosts();
    handleUserPosts(posts.data);
  };

  useEffect(() => {
    const fetchProfile = navigation.addListener('focus', () => {
      fetchPosts();
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

  const handleChangeDescription = (value) =>
    handlePost({
      ...post,
      description: value,
    });

  const savePost = async () => {
    const {photo, description} = post;
    const resp = await createUserPost(photo, description);
    if (resp.status === 201) {
      closePostModal();
      fetchPosts();
    }
  };

  return (
    <>
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
              <View style={styles.userPhotoContainer}>
                <ProfilePhoto
                  src={profile.avatar}
                  placeholder={avatar}
                  callback={uploadUserPhoto}
                />
              </View>
            </ImageBackground>
            <View>
              <TouchableOpacity
                style={styles.eventsIcon}
                onPress={() => navigation.navigate('Events')}>
                <Icon raised name="event" color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
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
                          source={
                            item.avatar
                              ? {uri: createStaticURL(item.avatar)}
                              : petAvatar
                          }
                        />
                        <Text style={styles.alignCenter}>{item.name}</Text>
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
          <View style={styles.addPostRow}>
            <Text style={styles.postTitle}>Posts</Text>
            <TouchableOpacity style={styles.addPost} onPress={addPost}>
              <Icon name="add" color="#FFF" />
            </TouchableOpacity>
          </View>
          {post.photo !== '' && (
            <>
              <Modal handleClose={closePostModal}>
                <PostView
                  {...post}
                  handleSubmit={savePost}
                  handleChangeDescription={handleChangeDescription}
                />
              </Modal>
            </>
          )}

          <View>
            <FlatList
              data={userPosts}
              renderItem={({item}) => (
                <View style={styles.galleryWrapper}>
                  <Image
                    style={styles.galleryImage}
                    source={{uri: createStaticURL(item.avatar)}}
                  />
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
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;
