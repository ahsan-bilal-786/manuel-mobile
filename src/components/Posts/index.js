import React from 'react';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {createStaticURL} from 'api';
import {styles} from 'screens/Profile/styles';

const PostsPanel = ({addPost, postsList, openPost}) => {
  return (
    <>
      <View style={styles.addPostRow}>
        <Text style={styles.postTitle}>Posts</Text>
        <TouchableOpacity style={styles.addPost} onPress={addPost}>
          <Icon name="add" color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          scrollEnabled={true}
          data={postsList}
          renderItem={({item}) => (
            <View style={styles.galleryWrapper}>
              <TouchableOpacity onPress={() => openPost(item)}>
                <Image
                  style={styles.galleryImage}
                  source={{uri: createStaticURL(item.avatar)}}
                />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default PostsPanel;
