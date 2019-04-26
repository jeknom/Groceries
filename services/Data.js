import { AsyncStorage } from 'react-native';

const getMeals = async () => {
    try {
        const data = await AsyncStorage.getItem('MEALS');
        const meals = data === null ? [] : JSON.parse(data);

        return meals;
    } catch (error) {
        alert('An error occurred while retrieving meals.');
        console.log(error)
    }
}

const getGroceries = async () => {
    try {
        const data = await AsyncStorage.getItem('GROCERIES');
        const groceries = data === null ? require('../assets/defaultData.json').groceries : JSON.parse(data);

        return groceries;
    } catch (error) {
        alert('An error occurred while retrieving groceries.');
    }
}

const getShoppingList = async () => {
    try {
        const data = await AsyncStorage.getItem('SHOPPING_LIST');
        const shoppingList = data === null ? [] : JSON.parse(data);

        return shoppingList;
    } catch (error) {
        alert('An error occurred while retrieving the shopping list.');
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

const updateShoppingList = async shoppingList => {
    try {
        await AsyncStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList));
    } catch (error) {
        alert('An error occurred while updating the shopping list.');
    }
}

export default {
    getMeals,
    getGroceries,
    getShoppingList,
    updateMeals,
    updateGroceries,
    updateShoppingList
};