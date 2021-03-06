import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  successMessage: {
    color: "#008800",
    fontWeight: "bold"
  },
  submitBtn: {marginTop: 10, marginLeft: 5, marginRight: 5},
  deleteBtn: {marginTop: 10, backgroundColor: "#FF0000", marginLeft: 5, marginRight: 5},
});
