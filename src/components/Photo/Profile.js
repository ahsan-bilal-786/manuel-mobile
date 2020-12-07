import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Icon} from 'react-native-elements';
import {styles} from 'screens/Profile/styles';

const PhotoUploadScreen = ({src, placeholder, callback}) => {
  const [fileUri, handleFileURI] = useState('');

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
        callback(response.uri);
      }
    });
  };

  useEffect(() => {
    if (src) {
      handleFileURI(src);
    }
  }, [src]);

  return (
    <>
      <Image
        source={fileUri ? {uri: fileUri} : placeholder}
        style={styles.userPhoto}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onPress={chooseImage}>
        <Icon raised name="edit" color="#000" size={15} />
      </TouchableOpacity>
    </>
  );
};

export default PhotoUploadScreen;
