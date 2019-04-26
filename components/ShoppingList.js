import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';
import MealList from './MealList';
import DataService from '../services/Data';

export default class ShoppingList extends React.Component {
    state = {
        active: false,
        meals: [],
        shoppingList: []
    }

    componentDidMount = async () => {
        const meals = await DataService.getMeals();
        const shoppingList = await DataService.getShoppingList();
        this.setState({ meals, shoppingList });
    }

    render() {
        const { meals, shoppingList, active } = this.state;

        return (
            <View style={styles.container}>
                {meals.length > 0 ?
                    <MealList meals={meals} />
                    :
                    <Headline>Please add some meals first..</Headline>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
});