import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Header, Icon, Input} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from 'screens/Pets/styles';

const LeftComponent = ({link}) => {
  return (
    <TouchableOpacity onPress={link}>
      <Icon name="arrow-back" color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const Layout = ({title, handleLeftClick, children}) => {
  return (
    <>
      <Header
        placement="left"
        leftComponent={<LeftComponent link={handleLeftClick} />}
        centerComponent={{text: title, style: {color: '#fff'}}}
      />
      <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>
    </>
  );
};

export default Layout;
