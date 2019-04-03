import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Headline, Button } from 'react-native-paper';
import DataService from '../services/Data';
import Meal from './Meal';

export default class Meals extends React.Component {
    state = {
        meals: [],
    }

    componentDidMount = async () => {
        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data });
    }

    handleDelete = async meal => {
        await DataService.update('MEALS', this.state.meals.filter(m => m.name !== meal.name));

        const data = await DataService.getAll('MEALS');
        if (data !== null) this.setState({ meals: data });
    }

    render() {
        const { meals } = this.state;
        const mealCards = meals.map(m => <ScrollView key={m.name}><Meal meal={m} onDelete={this.handleDelete} /></ScrollView>);

        return (
            <View style={styles.container}>
                {meals.length > 0 ? mealCards : <Headline style={styles.headline}>We need a new meal..</Headline>}
                <Button
                    style={styles.addButton}
                    icon='add'
                    mode='contained'
                >
                    New meal
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    headline: {
        margin: 20,
    },
    addButton: {
        padding: 10,
        margin: 20,
    }
});