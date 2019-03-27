import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Title, Surface, Chip, Text } from 'react-native-paper';

export default class ShoppingList extends React.Component {
    state = {
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

    render() {
        const { meals } = this.props.data;
        const mealChips = meals && meals.length > 0 ? meals.map(m =>
            <Chip
                key={m.name}
                onPress={() => this.handleSelectModify(m)}
                selected={this.state.selectedMeals.some(sm => sm.name === m.name)}
            >
                {m.name}
            </Chip>
        ) : <Text>Add some meals.</Text>

        return (
            <View style={styles.container}>
                <Surface style={styles.surface}>
                    <Title>Selected Meals</Title>
                    {mealChips}
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