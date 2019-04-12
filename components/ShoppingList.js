import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import MealSelecting from './MealSelecting';
import Shopping from './Shopping';


export default class ShoppingList extends React.Component {
    state = {
        shoppingPhase: false,
        selectedMeals: []
    }

    handleSelectModify = meal => {
        let dataCopy = [...this.state.selectedMeals];

        if (dataCopy.some(m => m.name === meal.name))
            dataCopy = dataCopy.filter(m => m.name !== meal.name);
        else
            dataCopy.push(meal);

        this.setState({ selectedMeals: dataCopy });
    }

    toggleShopping = () => this.setState({ shoppingPhase: !this.state.shoppingPhase });

    render() {

        const currentPhase = this.state.shoppingPhase ? <Shopping selectedMeals={this.state.selectedMeals} /> :
            <MealSelecting
                meals={this.props.data.meals}
                selectedMeals={this.state.selectedMeals}
                onSelectModify={this.handleSelectModify}
                onReady={this.toggleShopping}
            />;

        return (
            <View style={styles.container}>
                <Surface style={styles.surface}>
                    {currentPhase}
                </Surface>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    surface: {
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
});