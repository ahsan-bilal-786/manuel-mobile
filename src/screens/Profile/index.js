import * as React from 'react';
import {FlatList, View, Text, ImageBackground, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from 'screens/Profile/styles';
import cover from '../../assets/images/cover.jpg';
import photo_1 from '../../assets/images/photo_1.jpg';
import photo_2 from '../../assets/images/photo_2.jpg';
import photo_3 from '../../assets/images/photo_3.jpg';
import photo_4 from '../../assets/images/photo_4.jpg';
import photo_5 from '../../assets/images/photo_5.jpg';
import photo_6 from '../../assets/images/photo_6.jpg';
import photo_7 from '../../assets/images/photo_7.jpg';
import photo_8 from '../../assets/images/photo_8.jpg';
import photo_9 from '../../assets/images/photo_9.jpg';
import photo_10 from '../../assets/images/photo_10.jpg';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.personName}>Renata Goncaives</Text>
        <View style={styles.coverArea}>
          <ImageBackground source={cover} style={styles.coverImage}>
            <Image source={photo_2} style={styles.userPhoto} />
          </ImageBackground>
        </View>
      </View>
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
            photo_10,
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
  );
};

export default ProfileScreen;
