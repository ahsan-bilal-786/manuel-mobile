import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  profileInfo: {height: 130, marginBottom: 5},
  error: {
    color: '#F00',
    textAlign: 'center',
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 10,
  },
  petNameContainer: {borderBottomColor: '#FFF'},
  petName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 10,
  },
  avatarWrapper: {
    textAlign: 'right',
    justifyContent: 'center',
    marginLeft: 15,
  },
  petNameWrapper: {
    justifyContent: 'center',
  },
  userPhoto: {
    marginLeft: 'auto',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
  },
  petFormVal: {fontWeight: 'bold'},
  galleryWrapper: {flex: 1, flexDirection: 'column', margin: 1},
  galleryImage: {
    width: 120,
    height: 120,
  },
  formContainer: {
    height: 90,
    marginBottom: 10,
  },
  inputLabel: {
    textAlign: 'right',
    paddingTop: 17,
  },
  inputField: {
    height: 1,
    borderBottomColor: '#FFF',
  },
  submitBtn: {
    marginHorizontal: 10,
  },
});
