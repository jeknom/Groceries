import { AsyncStorage } from 'react-native';

const getAll = async key => {
    try {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data);
    } catch (error) {
        alert(`An error occurred while retrieving data from ${key}.`);
    }
};

const update = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        alert(`An error occurred while adding a ${key}.`);
    }
}

export default { getAll, update };