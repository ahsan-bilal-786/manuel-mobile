import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  personName: {alignSelf: 'center', fontWeight: 'bold'},
  coverArea: {alignSelf: 'stretch', height: 150, marginBottom: 80},
  coverImage: {height: 150},
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#CCC',
    position: 'absolute',
    bottom: -70,
    backgroundColor: '#FFF',
  },
  galleryWrapper: {flex: 1, flexDirection: 'column', margin: 1},
  galleryImage: {
    width: 120,
    height: 120,
  },
  settingsIcon: {position: 'absolute', top: 20, right: 0, zIndex: 1},
});
