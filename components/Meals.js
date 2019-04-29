import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Button } from 'react-native-paper';
import DataService from '../services/Data';
import MealModify from './MealModify';
import MealCards from './MealCards';

export default class Meals extends React.Component {
    state = {
        meals: [],
        modifyVisible: false,
        currentEdit: null,
    }

    componentDidMount = async () => {
        const meals = await DataService.getMeals();

        this.setState({ meals });
    }

    handleAdd = async meal => {
        const meals = [...this.state.meals];

        if (!meals.some(m => m.name === meal.name)) {
            meals.push(meal);
            await DataService.updateMeals(meals);

            this.setState({ meals, modifyVisible: false });
        }
    }

    handleEdit = async (original, target) => {
        const meals = [...this.state.meals];
        const index = meals.indexOf(original);
        meals[index] = target;

        await DataService.updateMeals(meals);
        this.setState({ meals, modifyVisible: false });
    }

    handleDelete = async meal => {
        const meals = this.state.meals.filter(m => m.name !== meal.name);

        await DataService.updateMeals(meals);
        this.setState({ meals });
    }

    handleShowEdit = meal => this.setState({ currentEdit: meal, modifyVisible: true });

    isExisting = name => {
        if (this.state.currentEdit) return this.state.currentEdit.name !== name;
        else return this.state.meals.some(m => m.name === name);
    }

    render() {
        const { meals, modifyVisible, currentEdit } = this.state;
        return (
            <View style={styles.container}>
                {meals.length > 0 ?
                    <MealCards
                        meals={meals}
                        onEdit={this.handleShowEdit}
                        onDelete={this.handleDelete}
                    /> : <Headline style={{ margin: 20 }}>We need a new meal..</Headline>
                }
                {modifyVisible ?
                    <MealModify
                        visible={modifyVisible}
                        exists={this.isExisting}
                        onHide={() => this.setState({ modifyVisible: false })}
                        onAdd={this.handleAdd}
                        onEdit={this.handleEdit}
                        original={currentEdit}
                    /> : null
                }
                <Button
                    style={styles.addButton}
                    icon='add'
                    mode='contained'
                    dark={true}
                    onPress={() => this.setState({ currentEdit: null, modifyVisible: true })}
                >
                    New meal
                </Button>
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