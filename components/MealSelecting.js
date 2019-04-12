import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, Text, Title, Button } from 'react-native-paper';

const MealSelecting = ({ meals, selectedMeals, onSelectModify, onReady }) => {
    const mealChips = meals && meals.length > 0 ? meals.map(m =>
        <Chip
            style={styles.chip}
            key={m.name}
            onPress={() => onSelectModify(m)}
            selected={selectedMeals.some(sm => sm.name === m.name)}
        >
            {m.name}
        </Chip>
    ) : <Text>Add some meals.</Text>

    return (
        <>
            <Title>Selected Meals</Title>
            {mealChips}
            <Button
                style={styles.startButton}
                mode='contained'
                onPress={() => onReady()}
            >
                Start shopping
            </Button>
        </>
    );
}

const styles = StyleSheet.create({
    chip: {
        margin: 4,
    },
    startButton: {
        marginTop: 30,
        marginBottom: 6,
    }
});

export default MealSelecting;