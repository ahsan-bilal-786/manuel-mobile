import React from 'react';
import {View, Text, Image} from 'react-native';
import {Input} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {styles} from 'screens/Pets/styles';
import avatar from '../../assets/images/dogavatar.png';

const Form = ({profile}) => {
  return (
    <>
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
      <View style={styles.formContainer}>
        <Grid>
          <Row>
            <Col size={15}>
              <Text style={styles.inputLabel}>Height:</Text>
            </Col>
            <Col size={25}>
              <Input />
            </Col>
            <Col size={15}>
              <Text style={styles.inputLabel}>Age:</Text>
            </Col>
            <Col size={25}>
              <Input style={styles.inputField} />
            </Col>
          </Row>
          <Row>
            <Col size={15}>
              <Text style={styles.inputLabel}>Weight:</Text>
            </Col>
            <Col size={25}>
              <Input style={styles.inputField} />
            </Col>
            <Col size={15}>
              <Text style={styles.inputLabel}>Race:</Text>
            </Col>
            <Col size={25}>
              <Input style={styles.inputField} />
            </Col>
          </Row>
        </Grid>
      </View>
    </>
  );
};

export default Form;
