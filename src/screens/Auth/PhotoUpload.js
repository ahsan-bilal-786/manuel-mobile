import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import {Text, Image, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {uploadUserPhoto, getUserProfile, createStaticURL} from 'api';
import {styles} from 'screens/Auth/styles';
import avatar from '../../assets/images/avatar.png';

const PhotoUploadScreen = ({navigation}) => {
  const [fileUri, handleFileURI] = useState('');
  const [showSave, handleShowSave] = useState(false);

  const chooseImage = () => {
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
        handleFileURI(response.uri);
        handleShowSave(true);
      }
    });
  };
  const savePhoto = () => {
    uploadUserPhoto(fileUri).then(() => {
      navigation.navigate('Profile');
    });
  };

  useEffect(() => {
    getUserProfile().then((resp) => {
      const {avatar} = resp.data;
      handleFileURI(createStaticURL(avatar));
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text h1 style={styles.heading}>
        Fiverr.
      </Text>
      {fileUri ? (
        <Image source={{uri: fileUri}} style={styles.thumbnail} />
      ) : (
        <Image source={avatar} style={styles.thumbnail} />
      )}
      {showSave ? (
        <Button
          title="Save"
          containerStyle={styles.submitBtn}
          onPress={savePhoto}
        />
      ) : (
        <></>
      )}
      <Button
        title="Upload"
        containerStyle={styles.submitBtn}
        onPress={chooseImage}
      />
      <Button
        title="Profile"
        containerStyle={styles.submitBtn}
        onPress={() => navigation.navigate('Profile')}
      />
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;
