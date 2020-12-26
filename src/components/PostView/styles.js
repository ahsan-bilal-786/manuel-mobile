import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  icon: {marginRight: 7},
  dateText: {
    color: '#CCC',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  thumbnail: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
  saveContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {color: '#CCC'},
  btnStyle: {paddingHorizontal: 30},
});
