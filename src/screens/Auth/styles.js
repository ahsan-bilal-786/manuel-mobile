import {StyleSheet} from 'react-native';

export const textStyles = {color: '#FFF'};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D70F64',
    alignSelf: 'stretch',
  },
  heading: {
    textAlign: 'center',
    color: '#FFF',
  },
  submitBtn: {
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    marginBottom: 5,
  },
  join: {
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontSize: 15,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  alignTop: {
    justifyContent: 'flex-start',
  },
  thumbnail: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderColor: '#CCC',
    borderWidth: 5,
  },
  errorMessage: {
    ...textStyles,
  },
});
