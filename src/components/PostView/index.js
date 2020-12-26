import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {Text, Image, Button, Icon, Input} from 'react-native-elements';
import {createStaticURL} from 'api';

import {styles} from 'components/PostView/styles';

const PostView = ({
  id,
  photo,
  description,
  date,
  handleChangeDescription,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Icon
          name="timer"
          size={20}
          color="#CCC"
          containerStyle={styles.icon}
        />
        <Text style={styles.dateText}>
          {date ? moment(date).format('ll') : moment().format('ll')}
        </Text>
      </View>
      {id ? (
        <Image
          source={{uri: createStaticURL(photo)}}
          style={styles.thumbnail}
        />
      ) : (
        <Image source={{uri: photo}} style={styles.thumbnail} />
      )}

      <View>
        <Input
          placeholder="Description"
          value={description}
          onChangeText={(value) => handleChangeDescription(value)}
          inputStyle={styles.inputStyle}
        />
      </View>
      <View style={styles.saveContainer}>
        <Button
          title="Save"
          buttonStyle={styles.btnStyle}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default PostView;
