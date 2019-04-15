import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, IconButton, Colors, TextInput } from 'react-native-paper';
import GroceryModify from './GroceryModify';

export default class GroceryList extends React.Component {
    state = { query: '', modifyVisible: false }

    render() {
        const { query, modifyVisible } = this.state;
        const { groceries, onIncrease, onDecrease } = this.props;
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
                <IconButton
                    size={40}
                    icon='add'
                    onPress={() => this.setState({ modifyVisible: true })}
                />
                <GroceryModify
                    visible={modifyVisible}
                    onDismiss={() => this.setState({ modifyVisible: false })}
                />
                <ScrollView>
                    {queriedGroceries.map(g =>
                        <List.Item
                            key={g.name}
                            title={g.name}
                            description={`Costs ${g.price}€ | Total: ${g.price * g.quantity}€`}
                            right={() =>
                                <View style={styles.container}>
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
                        />
                    )}
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});