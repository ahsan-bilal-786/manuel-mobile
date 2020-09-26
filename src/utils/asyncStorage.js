import AsyncStorage from '@react-native-community/async-storage';

export const storeUserToken = async (token) => {
  try {
    await AsyncStorage.setItem('@user_token', token);
  } catch (e) {
    await AsyncStorage.setItem('@user_token', null);
  }
  return token;
};

export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
    return token;
  } catch (e) {
    return null;
  }
};

export const deleteUserToken = async () => {
  try {
    await AsyncStorage.clear();
    return;
  } catch (e) {
    return null;
  }
};
