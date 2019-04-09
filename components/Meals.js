import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Headline, Button } from 'react-native-paper';
import DataService from '../services/Data';
import MealEdit from './MealEdit';
import Meal from './Meal';

export default class Meals extends React.Component {
    state = {
        meals: [],
        editVisible: false,
        targetMeal: null
    };

    componentDidMount = async () => {
        const meals = await DataService.getAll('MEALS');
        if (meals !== null) this.setState({ meals });
    };

    isExisting = name => this.state.meals.some(m => m.name === name);

    handleAdd = async meal => {
        const dataCopy = [...this.state.meals];
        if (!dataCopy.some(m => m.name === meal.name)) {
            dataCopy.push(meal);
            await DataService.update('MEALS', dataCopy);

            const data = await DataService.getAll('MEALS');
            if (data !== null) this.setState({ meals: data, editVisible: false });
        }
    };

    handleEdit = async (original, target) => {
        console.log('this is an edit')
    };

    handleDelete = async meal => {
        await DataService.update('MEALS', this.state.meals.filter(m => m.name !== meal.name));

        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data });
    };

    render() {
        const { meals, editVisible, targetMeal } = this.state;

        const mealCards =
            <ScrollView>
                {meals.map(m =>
                    <Meal
                        key={m.name}
                        meal={m}
                        onDelete={this.handleDelete}
                        onEdit={() => this.setState({ targetMeal: m, editVisible: true })}
                    />
                )}
            </ScrollView>;

        return (
            <View style={styles.container}>
                {meals.length > 0 ? mealCards : <Headline style={{ margin: 20 }}>We need a new meal..</Headline>}
                <Button
                    style={styles.addButton}
                    icon='add'
                    mode='contained'
                    onPress={() => this.setState({ targetMeal: null, editVisible: true })}
                >
                    New meal
                </Button>
                <MealEdit
                    visible={editVisible}
                    onHide={() => this.setState({ editVisible: false })}
                    onAdd={this.handleAdd}
                    onEdit={this.handleEdit}
                    isExisting={this.isExisting}
                    target={targetMeal}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    addButton: {
        padding: 10,
        margin: 20,
    }
});