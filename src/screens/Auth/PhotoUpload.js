import * as React from 'react';
import {Text, Image, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from 'screens/Auth/styles';
import avatar from '../../assets/images/photo_1.jpg';

const PhotoUploadScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text h1 style={styles.heading}>
        Fiverr.
      </Text>
      <Image source={avatar} style={styles.thumbnail} />

      <Button
        title="Upload Photo"
        containerStyle={styles.submitBtn}
        onPress={() => navigation.navigate('Profile')}
      />
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;
