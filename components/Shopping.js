import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import MealList from './MealList';
import ShopPlaylist from './ShopPlaylist';
import DataService from '../services/Data';

export default class Shopping extends React.Component {
    state = {
        active: false,
        meals: [],
        shoppingList: []
    }

    isMounted = true;

    componentDidMount = async () => {
        this._isMounted = true;

        const meals = await DataService.getMeals();
        if (this._isMounted) this.setState({ meals });
    }

    componentWillUnmount = () => this.isMounted = false;

    handleSelect = async meal => {
        let shoppingList = [...this.state.shoppingList];

        if (this.state.shoppingList.some(m => m.name === meal.name)) shoppingList = this.state.shoppingList.filter(m => m.name !== meal.name);
        else shoppingList.push(meal);

        this.setState({ shoppingList });
    }

    render() {
        const { meals, shoppingList, active } = this.state;

        const content = () => {
            if (active) return <ShopPlaylist onDone={() => this.setState({ active: false })} shoppingList={shoppingList} />
            else
                return (
                    <>
                        <MealList
                            meals={meals}
                            selected={shoppingList}
                            onSelect={this.handleSelect}
                        />
                        <Button
                            style={styles.startButton}
                            icon='shopping-cart'
                            mode='contained'
                            dark={true}
                            disabled={meals.length <= 0 || shoppingList.length <= 0}
                            onPress={() => this.setState({ active: true })}
                        >
                            {meals.length > 0 ? 'Start shopping' : 'Add some meals first'}
                        </Button>
                    </>
                );
        }

        return (
            <View style={styles.container}>
                {content()}
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