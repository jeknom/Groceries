import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Headline } from 'react-native-paper';
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

    handleSelect = async meal => {
        let shoppingList = [...this.state.shoppingList];

        if (this.state.shoppingList.some(m => m.name === meal.name))
            shoppingList = this.state.shoppingList.filter(m => m.name !== meal.name);
        else
            shoppingList.push(meal);

        await DataService.updateShoppingList(shoppingList);
        this.setState({ shoppingList });
    }

    render() {
        const { meals, shoppingList, active } = this.state;

        return (
            <View style={styles.container}>
                {meals.length > 0 ?
                    <MealList
                        meals={meals}
                        selected={shoppingList}
                        onSelect={this.handleSelect}
                    />
                    :
                    <Headline style={styles.container}>Please add some meals first..</Headline>
                }
                <Button
                    style={styles.startButton}
                    icon='shopping-cart'
                    mode='contained'
                    dark={true}
                    disabled={meals.length <= 0}
                    onPress={() => this.setState({})}
                >
                    Start shopping
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    startButton: {
        padding: 10,
        margin: 20,
    },
});