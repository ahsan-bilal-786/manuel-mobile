import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import List from 'components/Events/List';
import Form from 'components/Events/Form';
import {fetchEventById} from 'api';

const view = {
  list: 'list',
  form: 'form'
};
const LeftComponent = ({link}) => {
  return (
    <TouchableOpacity onPress={link}>
      <Icon name="arrow-back" color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const RightComponent = ({link, icon}) => {
  return (
    <TouchableOpacity onPress={link}>
      <Icon name={icon} color="#FFFFFF" />
    </TouchableOpacity>
  );
}


const EventScreen = ({navigation}) => {
  const [activeView, handleActiveView] = useState(view.list);
  const [eventData, handleEventData] = useState(null);
  const fetchEvent = async (eventId) => {
    handleActiveView(view.form);
    handleEventData(null);
    const event = await fetchEventById(eventId);
    handleEventData(event.data);
  };
  const handleLinkClick = () => {
    handleActiveView(activeView === view.form ? view.list : view.form);
    handleEventData(null);
  };
  return (
    <>
      <Header
        placement="left"
        leftComponent={
          <LeftComponent link={() => navigation.push('Profile')} />
        }
        centerComponent={{text: 'Events', style: {color: '#fff'}}}
        rightComponent={
          <RightComponent
            link={handleLinkClick}
            icon={activeView === view.form ? 'menu' : 'add'}
          />
        }
      />
      {activeView === view.list && <List onClickEvent={fetchEvent} />}
      {activeView === view.form && (
        <Form eventData={eventData} postDelete={handleLinkClick} />
      )}
    </>
  );
};

export default EventScreen;
