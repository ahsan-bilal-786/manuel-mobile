import React, {useEffect, useState} from 'react';
import map from 'lodash/map';
import includes from 'lodash/includes';
import * as Yup from 'yup';
import {TouchableOpacity, Platform} from 'react-native';
import {useFormik} from 'formik';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import {Input, Button, Icon, Text} from 'react-native-elements';
import {createEvent, editEvent, deleteEventById} from 'api';
import {styles} from 'components/Events/styles';

const pets = [
  'Bella',
  'Charlie',
  'Luna',
  'Lucy',
  'Max',
  'Bailey',
  'Cooper',
  'Daisy',
];

const successMessage = 'The Event has been successfully saved.';

const initialValues = {
  title: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  petId: pets[0],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Please enter title.'),
  startDate: Yup.string().required('Please enter start Date.'),
  startTime: Yup.string().required('Please enter start Time.'),
  endDate: Yup.string().required('Please enter end Date.'),
  endTime: Yup.string().required('Please enter end Time.'),
  petId: Yup.string().required('Please enter pet Name.'),
});

const fieldProps = (formik, id) => {
  const {values, touched, errors, handleChange, setFieldTouched} = formik;
  return {
    value: values[id],
    errorMessage: touched[id] && errors[id],
    onChangeText: handleChange(id),
    onBlur: () => setFieldTouched(id),
  };
};

const mode = {
  closed: null,
  startDate: 'startDate',
  startTime: 'startTime',
  endDate: 'endDate',
  endTime: 'endTime',
};

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

const Form = ({eventData, postDelete}) => {
  const [timeMode, handleTimeMode] = useState(mode.closed);
  const [successNotification, handleSuccessNotification] = useState('');

  const formatPayloadTime = (date, time) => {
    date = moment(date).format('YYYY-MM-DD');
    time = moment(time).format('HH:mm:ss');
    const resp = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss');
    return resp;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, {setSubmitting, setErrors}) => {
      const {title, startDate, startTime, endDate, endTime, petId} = values;
      handleSuccessNotification('');

      let resp = null;
      if (eventData && eventData.id) {
        resp = await editEvent(
          title,
          formatPayloadTime(startDate, startTime),
          formatPayloadTime(endDate, endTime),
          petId,
          eventData.id,
        );
      } else {
        resp = await createEvent(
          title,
          formatPayloadTime(startDate, startTime),
          formatPayloadTime(endDate, endTime),
          petId,
        );
      }
      setSubmitting(false);
      if (resp.data.id) {
        handleSuccessNotification(successMessage);
      }
    },
  });

  const focusTimeField = (mode) => {
    handleTimeMode(mode.closed);
    setTimeout(() => handleTimeMode(mode));
  };

  const onChangeTimePicker = (event, selectedDate) => {
    const mode = timeMode;
    if (Platform.OS !== 'ios' || mode === "startDate" || mode === "endDate" ) {
      handleTimeMode(mode.closed);
    }
    if (event.type === 'set') {
      formik.setFieldValue(mode, selectedDate);
    }
  };

  const getDateValue = (value) => {
    return value ? moment(value).format('ll') : '';
  };

  const getTimeValue = (value) => {
    return value ? moment(value).format('LT') : '';
  };

  const getEventData = (key) =>
    eventData && eventData[key] ? eventData[key] : initialValues[key];

  useEffect(() => {
    formik.setValues({
      title: getEventData('title'),
      startDate: getEventData('startTime'),
      startTime: getEventData('startTime'),
      endDate: getEventData('endTime'),
      endTime: getEventData('endTime'),
      petId: getEventData('petId'),
    });
  }, [eventData]);

  const handleDelete = async () => {
    if (eventData && eventData.id) {
      const resp = await deleteEventById(eventData.id);
      if (resp.status === 204) {
        postDelete();
      }
    }
  };

  const {values, isSubmitting, handleSubmit, setFieldValue} = formik;
  return (
    <>
      <Input placeholder="Title" {...fieldProps(formik, 'title')} />
      <Input
        placeholder="Start Date"
        disabled={true}
        {...fieldProps(formik, 'startDate')}
        rightIcon={
          <TimeIcon type="date" onPress={() => focusTimeField('startDate')} />
        }
        value={getDateValue(values.startDate)}
      />
      <Input
        placeholder="Start Time"
        disabled={true}
        {...fieldProps(formik, 'startTime')}
        rightIcon={
          <TimeIcon type="time" onPress={() => focusTimeField('startTime')} />
        }
        value={getTimeValue(values.startTime)}
      />
      <Input
        placeholder="End Date"
        disabled={true}
        {...fieldProps(formik, 'endDate')}
        rightIcon={
          <TimeIcon type="date" onPress={() => focusTimeField('endDate')} />
        }
        value={getDateValue(values.endDate)}
      />
      <Input
        placeholder="End Time"
        disabled={true}
        {...fieldProps(formik, 'endTime')}
        rightIcon={
          <TimeIcon type="time" onPress={() => focusTimeField('endTime')} />
        }
        value={getTimeValue(values.endTime)}
      />
      <Picker
        selectedValue={values.petId}
        onValueChange={(itemValue, itemIndex) =>
          setFieldValue('petId', itemValue)
        }>
        {map(pets, (pet) => (
          <Picker.Item key={pet} label={pet} value={pet} />
        ))}
      </Picker>
      {timeMode && (
        <DateTimePicker
          key={timeMode}
          value={new Date()}
          mode={
            includes([mode.startDate, mode.endDate], timeMode) ? 'date' : 'time'
          }
          is24Hour={false}
          display="default"
          onChange={onChangeTimePicker}
        />
      )}
      <Text style={styles.successMessage}>{successNotification}</Text>
      <Button
        buttonStyle={styles.submitBtn}
        title="Save"
        disabled={isSubmitting}
        onPress={handleSubmit}
      />
      {eventData && eventData.id && (
        <Button
          buttonStyle={styles.deleteBtn}
          title="Delete"
          disabled={isSubmitting}
          onPress={handleDelete}
        />
      )}
    </>
  );
};

export default Form;
