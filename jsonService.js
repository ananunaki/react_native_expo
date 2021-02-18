import AsyncStorage from '@react-native-community/async-storage';

/*
* @function saveDeviceData This will write the data to disk, with a given key, this * could be written to a SQLite DB file, a flat file, AsyncStorage is an abstract 
* wrapper around this. 
* @param key {String} Key identifier
* @param data {any} Data to save for the given key
*/
export const saveDeviceData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(`Error saving data for key ${key}`, data);
      throw e;
    }
};


/*
* @param key {String} Key identifier for data to load
*/
export const loadDeviceData = async (key) => {
    try {
        return JSON.parse(await AsyncStorage.getItem(key))
    } catch (e) {
      console.log(`Error loading data for key ${key}`);
      throw e;
    }
};