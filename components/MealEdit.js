import React from 'react';
import { Modal, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Button, IconButton, List, TextInput as PaperInput } from 'react-native-paper';
import Counter from './Counter';
import DataService from '../services/Data';

export default class MealEdit extends React.Component {
    state = {
        mealName: '',
        searchQuery: '',
        groceries: [],
        selectedGroceries: [],
    };

    componentDidMount = async () => {
        const groceries = await DataService.getAll('GROCERIES');
        if (groceries !== null) this.setState({ groceries });
        else this.setState({ groceries: require('../assets/defaultData.json').groceries });
    }

    handleIncrease = grocery => {
        const dataCopy = [...this.state.selectedGroceries];
        const index = dataCopy.findIndex(g => g.name === grocery.name);

        if (index !== -1) dataCopy[index].quantity++;
        else dataCopy.push({ ...grocery, quantity: 1 });

        this.setState({ selectedGroceries: dataCopy });
    }

    handleDecrease = grocery => {
        const dataCopy = [...this.state.selectedGroceries];
        const index = dataCopy.findIndex(g => g.name === grocery.name);

        if (dataCopy[index].quantity > 1) dataCopy[index].quantity--;
        else dataCopy.splice(index);

        this.setState({ selectedGroceries: dataCopy });
    }

    groceryQuantity = grocery => {
        const value = this.state.selectedGroceries.find(g => g.name === grocery.name);
        return value ? value.quantity : 0;
    }

    render() {
        const { visible, onHide, onAdd } = this.props;
        const { mealName, searchQuery, groceries, selectedGroceries } = this.state;

        const queriedGroceries = searchQuery === '' ? groceries : groceries.filter(g => g.name.toUpperCase().includes(searchQuery.toUpperCase()));
        const groceryItems =
            <ScrollView>
                {queriedGroceries.map(g =>
                    <List.Item
                        key={g.name}
                        title={g.name}
                        description={`Costs ${g.price}€ | Found in area ${g.layout}`}
                        right={() =>
                            <Counter
                                count={this.groceryQuantity(g)}
                                onIncrease={() => this.handleIncrease(g)}
                                onDecrease={() => this.handleDecrease(g)}
                            />
                        }
                    />
                )}
            </ScrollView>;

        return (
            <Modal
                animationType='fade'
                visible={visible}
                onRequestClose={onHide}
            >
                <View style={styles.top}>
                    <IconButton
                        size={40}
                        icon='arrow-back'
                        onPress={() => onHide()}
                    />
                    <TextInput
                        style={styles.mealName}
                        placeholder='Meal name'
                        mode='outlined'
                        value={mealName}
                        onChangeText={mealName => this.setState({ mealName })}
                    />
                </View>
                <View style={styles.grocery}>
                    <PaperInput
                        style={styles.searchBar}
                        mode='outlined'
                        label='Search groceries..'
                        value={searchQuery}
                        onChangeText={searchQuery => this.setState({ searchQuery })}
                    />
                    {groceryItems}
                    <Button
                        style={styles.saveButton}
                        icon='add'
                        mode='contained'
                        onPress={() => onAdd({ name: mealName, groceries: selectedGroceries })}
                    >
                        Save
                    </Button>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        margin: 10,
    },
    grocery: {
        flex: 1,

    },
    mealName: {
        marginLeft: 20,
        fontSize: 36,
    },
    searchBar: {
        margin: 10,
    },
    saveButton: {
        padding: 10,
        margin: 20,
    }
});