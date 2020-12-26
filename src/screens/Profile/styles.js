import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {flex: 1},
  personName: {alignSelf: 'center', fontWeight: 'bold'},
  coverArea: {alignSelf: 'stretch', height: 150, marginBottom: 80},
  coverImage: {height: 150},
  userPhotoContainer: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: -70,
    left: 7,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#FF7F50',
    backgroundColor: '#FFF',
  },
  editPhotoIcon: {
    backgroundColor: '#F00',
    width: 20,
    height: 20,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 1,
  },
  eventsIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  petListWrapper: {marginBottom: 10},
  galleryWrapper: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryImage: {
    width: 120,
    height: 120,
  },
  settingsIcon: {position: 'absolute', top: 20, right: 0, zIndex: 1},
  petThumb: {width: 70, height: 70, borderRadius: 70},
  alignCenter: {textAlign: 'center'},
  addPostRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addPost: {
    position: 'relative',
    left: 10,
    backgroundColor: '#000',
    borderRadius: 12,
  },
});
