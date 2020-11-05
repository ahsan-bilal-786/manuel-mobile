import React, {useState} from 'react';
import moment from "moment";
import each from "lodash/each";
import random from "lodash/random";
import {Alert, Text, View, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
import {Agenda} from 'react-native-calendars';
import {fetchEvents} from "api";
import {styles} from "components/Events/styles";
import pet1 from "assets/images/pets/1.jpg"
import pet2 from "assets/images/pets/2.jpg"
import pet3 from "assets/images/pets/3.jpg"
import pet4 from "assets/images/pets/4.jpg"
import pet5 from "assets/images/pets/5.jpg"

const pets = [
  pet1,
  pet2,
  pet3,
  pet4,
  pet5,
]

const EventList = ({onClickEvent}) => {

  const [items, handleItems] = useState({});

  const loadItems = (day) => {
    const newItems = {};
    fetchEvents(day.dateString).then(resp => {
      if(resp.data.length > 0){
        each(resp.data, (data) => {
          const date = moment(data.startTime).format("YYYY-MM-DD");
          const payload = {
            eventId: data.id,
            name: data.title,
            height: 50,
            startDate: moment(data.startTime).format("YYYY-MM-DD"),
            endDate: moment(data.endTime).format("YYYY-MM-DD"),
          }
          if(!newItems[date])
            newItems[date] = [payload];
          else newItems[date].push(payload)
        })
        handleItems(newItems);
      }
    });
    return;
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]} 
        onPress={() => onClickEvent(item.eventId)}
      >
        <View style={{flexDirection: 'row'}}>
          <Text>{item.name}</Text>
          <View style={{marginLeft: 'auto'}}>
            <Avatar
              rounded
              source={pets[random(0, pets.length-1)]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  return (
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={moment().format("YYYY-MM-DD")}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
  );
}

export default EventList;
