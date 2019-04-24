import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, IconButton, Colors, TextInput } from 'react-native-paper';

export default class GroceryList extends React.Component {
    state = { query: '' }

    render() {
        const { query } = this.state;
        const { groceries, onIncrease, onDecrease, onDelete } = this.props;
        const queriedGroceries = query === '' ? groceries : groceries.filter(g => g.name.toUpperCase().includes(query.toUpperCase()));

        return (
            <>
                <TextInput
                    style={{ margin: 10 }}
                    mode='outlined'
                    label='Search groceries..'
                    value={query}
                    onChangeText={query => this.setState({ query })}
                />
                <ScrollView>
                    {queriedGroceries.map(g =>
                        <List.Item
                            key={g.name}
                            title={g.name}
                            description={`Costs ${g.price}€ | Total: ${g.price * g.quantity}€`}
                            right={() =>
                                <View style={styles.counter}>
                                    <IconButton
                                        icon='remove'
                                        onPress={() => onDecrease(g)}
                                        disabled={g.quantity <= 0}
                                        color={Colors.red800}
                                    />
                                    <Text style={{ margin: 14 }}>{g.quantity}</Text>
                                    <IconButton
                                        icon='add'
                                        onPress={() => onIncrease(g)}
                                        color={Colors.blue400}
                                    />
                                </View>
                            }
                            left={() =>
                                <IconButton
                                    icon='delete'
                                    onPress={() => onDelete(g)}
                                />
                            }
                        />
                    )}
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    counter: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#d6d7da',
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});