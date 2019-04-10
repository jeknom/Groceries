import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Button } from 'react-native-paper';
import DataService from '../services/Data';
import MealAdd from './MealAdd';
import MealEdit from './MealEdit';
import MealCards from './MealCards';

export default class Meals extends React.Component {
    state = {
        meals: [],
        addVisible: false,
        editVisible: false,
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
            if (data !== null) this.setState({ meals: data, addVisible: false });
        }
    }

    handleEdit = async (original, target) => {
        const dataCopy = [...this.state.meals];
        const index = dataCopy.indexOf(original);
        dataCopy[index] = target;
        await DataService.update('MEALS', dataCopy);

        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data, editVisible: false });
    }

    handleShowEdit = meal => this.setState({ currentEdit: meal, editVisible: true });

    handleDelete = async meal => {
        await DataService.update('MEALS', this.state.meals.filter(m => m.name !== meal.name));

        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data });
    }

    render() {
        const { meals, addVisible, editVisible, currentEdit } = this.state;

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
                    onPress={() => this.setState({ addVisible: true })}
                >
                    New meal
                </Button>
                {addVisible ?
                    <MealAdd
                        visible={addVisible}
                        onHide={() => this.setState({ addVisible: false })}
                        onAdd={this.handleAdd}
                    /> : null
                }
                {editVisible ?
                    <MealEdit
                        visible={editVisible}
                        onHide={() => this.setState({ editVisible: false })}
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