import React, {useState} from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {styles} from 'screens/Pets/styles';
import avatar from '../../assets/images/dogavatar.png';

const petTypes = ['cats', 'dogs', 'birds', 'rabbits', 'guinea pigs', 'fish'];

const TimeIcon = ({onPress, type}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={type === 'date' ? 'calendar-today' : 'timer'}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

const Form = ({values, onChange}) => {
  const [datePicker, toggleDate] = useState(false);
  const getVal = (key) => {
    return get(values, key, '') ? `${get(values, key)}` : '';
  };
  const onChangeTimePicker = (event, selectedDate) => {
    if (Platform.OS !== 'ios') {
      toggleDate(false);
    }
    onChange('dob', selectedDate);
  };
  const getDateValue = (key) => {
    return get(values, key)
      ? moment(get(values, key), moment.ISO_8601).format('DD[/]MM[/]YY')
      : '';
  };
  const fn = () => {};
  return (
    <>
      <View style={styles.profileInfo}>
        <Grid>
          <Col size={35} style={styles.avatarWrapper}>
            <Image
              source={values.avatar ? {uri: values.avatar} : avatar}
              style={styles.userPhoto}
            />
          </Col>
          <Col size={65} style={styles.petNameWrapper}>
            <Input
              inputContainerStyle={styles.petNameContainer}
              placeholder="Pet Name"
              style={styles.petName}
              value={getVal('petName')}
              onChangeText={(value) => onChange('petName', value)}
            />
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
              <Input
                style={styles.inputField}
                value={getVal('height')}
                onChangeText={(value) => onChange('height', value)}
              />
            </Col>
            <Col size={15}>
              <Text style={styles.inputLabel}>Age:</Text>
            </Col>
            <Col size={25}>
              <Input
                disabled={true}
                onChangeText={(value) => onChange('dob', value)}
                rightIcon={
                  <TimeIcon
                    type="date"
                    onPress={() => toggleDate(!datePicker)}
                  />
                }
                value={getDateValue('dob')}
              />
              {datePicker && (
                <DateTimePicker
                  key={datePicker}
                  value={
                    getVal('dob')
                      ? moment(values.dob, moment.ISO_8601).toDate()
                      : moment().toDate()
                  }
                  mode="date"
                  is24Hour={false}
                  display="default"
                  onChange={onChangeTimePicker}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col size={15}>
              <Text style={styles.inputLabel}>Weight:</Text>
            </Col>
            <Col size={25}>
              <Input
                style={styles.inputField}
                value={getVal('weight')}
                onChangeText={(value) => onChange('weight', value)}
              />
            </Col>
            <Col size={15}>
              <Text style={styles.inputLabel}>Race:</Text>
            </Col>
            <Col size={25}>
              <Picker
                selectedValue={getVal('petType')}
                onValueChange={(itemValue, itemIndex) => {
                  onChange('petType', itemValue);
                }}>
                {map(petTypes, (petType) => (
                  <Picker.Item
                    key={petType}
                    label={upperFirst(petType)}
                    value={petType}
                  />
                ))}
              </Picker>
            </Col>
          </Row>
        </Grid>
      </View>
    </>
  );
};

export default Form;
