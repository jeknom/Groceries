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
        const meals = await DataService.getAll('MEALS');

        if (meals !== null) this.setState({ meals });
    }

    handleAdd = async meal => {
        const dataCopy = [...this.state.meals];

        if (!dataCopy.some(m => m.name === meal.name)) {
            dataCopy.push(meal);
            await DataService.update('MEALS', dataCopy);

            const data = await DataService.getAll('MEALS');
            if (data !== null) this.setState({ meals: data, modifyVisible: false });
        }
    }

    handleEdit = async (original, target) => {
        const dataCopy = [...this.state.meals];
        const index = dataCopy.indexOf(original);
        dataCopy[index] = target;
        await DataService.update('MEALS', dataCopy);

        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data, modifyVisible: false });
    }

    handleShowEdit = meal => this.setState({ currentEdit: meal, modifyVisible: true });

    isExisting = name => {
        if (this.state.currentEdit) return this.state.currentEdit.name !== name;
        else return this.state.meals.some(m => m.name === name);
    }

    handleDelete = async meal => {
        await DataService.update('MEALS', this.state.meals.filter(m => m.name !== meal.name));

        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data });
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
                    /> : <Headline style={{ margin: 20 }}>We need a new meal..</Headline>}

                <Button
                    style={styles.addButton}
                    icon='add'
                    mode='contained'
                    onPress={() => this.setState({ currentEdit: null, modifyVisible: true })}
                >
                    New meal
                </Button>
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