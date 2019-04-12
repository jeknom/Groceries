import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

export const Checklist = ({ groceries, pickups, onPickup }) => {
    console.log(pickups);
    const checklist = () => groceries.map(g =>
        <View
            key={g.name}
            style={styles.container}
        >
            <Text>{g.name}</Text>
            <Checkbox
                status={pickups.some(gr => gr.name === g.name) ? 'checked' : 'unchecked'}
                onPress={() => onPickup(g)}
            />
        </View>
    );

    return checklist();
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 6,
        flexDirection: 'row',
    }
});