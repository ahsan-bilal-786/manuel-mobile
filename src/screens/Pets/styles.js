import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  profileInfo: {height: 130, marginBottom: 5},
  personName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 10,
  },
  avatarWrapper: {
    textAlign: "right",
    justifyContent: 'center'
  },
  petNameWrapper: {
    justifyContent: 'center'
  },
  userPhoto: {
    marginLeft: "auto",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
  },
  petFormVal: {fontWeight: "bold"},
  galleryWrapper: {flex: 1, flexDirection: 'column', margin: 1},
  galleryImage: {
    width: 120,
    height: 120,
  }
});
