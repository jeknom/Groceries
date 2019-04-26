import { AsyncStorage } from 'react-native';

const getMeals = async () => {
    try {
        const data = await AsyncStorage.getItem('MEALS');
        const meals = data === null ? [] : data;

        return JSON.parse(meals);
    } catch (error) {
        alert('An error occurred while retrieving meals.');
    }
}

const getGroceries = async () => {
    try {
        const data = await AsyncStorage.getItem('GROCERIES');
        const groceries = data === null ? require('../assets/defaultData.json').groceries : data;

        return JSON.parse(groceries);
    } catch (error) {
        alert('An error occurred while retrieving groceries.');
    }
}

const updateMeals = async meals => {
    try {
        const validatedMeals = meals.map(m => { return { name: m.name, groceries: m.groceries } });
        await AsyncStorage.setItem('MEALS', JSON.stringify(validatedMeals));
    } catch (error) {
        alert('An error occurred while updating meals.');
    }
}

const updateGroceries = async groceries => {
    try {
        const validatedGroceries = groceries.map(g => { return { name: g.name, price: g.price, layout: g.layout } });
        await AsyncStorage.setItem('GROCERIES', JSON.stringify(validatedGroceries));
    } catch (error) {
        alert('An error occurred while updating groceries.')
    }
}

export default { getMeals, getGroceries, updateMeals, updateGroceries };