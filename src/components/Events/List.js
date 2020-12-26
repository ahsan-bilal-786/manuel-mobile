import React, {useState} from 'react';
import moment from 'moment';
import each from 'lodash/each';
import {Alert, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Agenda} from 'react-native-calendars';
import {fetchEvents, createStaticURL} from 'api';
import {styles} from 'components/Events/styles';

const EventList = ({onClickEvent}) => {
  const [items, handleItems] = useState({});

  const loadItems = (day) => {
    const newItems = {};
    fetchEvents(day.dateString).then((resp) => {
      if (resp.data.length > 0) {
        each(resp.data, (data) => {
          const date = moment(data.startTime).format('YYYY-MM-DD');
          const payload = {
            eventId: data.id,
            name: data.title,
            height: 50,
            startDate: moment(data.startTime).format('YYYY-MM-DD'),
            endDate: moment(data.endTime).format('YYYY-MM-DD'),
            petAvatar: data.pet.avatar,
          };
          if (!newItems[date]) {
            newItems[date] = [payload];
          } else {
            newItems[date].push(payload);
          }
        });
        handleItems(newItems);
      }
    });
    return;
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => onClickEvent(item.eventId)}>
        <View style={{flexDirection: 'row'}}>
          <Text>{item.name}</Text>
          <View style={{marginLeft: 'auto'}}>
            <Avatar
              rounded
              source={
                item.petAvatar ? {uri: createStaticURL(item.petAvatar)} : ''
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={moment().format('YYYY-MM-DD')}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
    />
  );
};

export default EventList;
