import React from 'react';
import { Modal, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Button, IconButton, TextInput as PaperInput } from 'react-native-paper';
import Grocery from './Grocery';
import DataService from '../services/Data';

export default class MealEdit extends React.Component {
    state = {
        mealName: '',
        searchQuery: '',
        groceries: [],
    };

    componentDidMount = async () => {
        let data = await DataService.getAll('GROCERIES');
        if (data === null) data = require('../assets/defaultData.json').groceries;

        this.setState({ groceries: data.map(g => { return { ...g, quantity: 0 } }) });
    }

    handleIncrease = grocery => {
        const dataCopy = [...this.state.groceries];
        dataCopy.find(g => g.name === grocery.name).quantity++;

        this.setState({ groceries: dataCopy });
    }

    handleDecrease = grocery => {
        const dataCopy = [...this.state.groceries];
        dataCopy.find(g => g.name === grocery.name).quantity--;

        this.setState({ groceries: dataCopy });
    }

    render() {
        const { visible, onHide, onAdd, onEdit, isExisting, target } = this.props;
        const { mealName, searchQuery, groceries } = this.state;
        const meal = { name: this.state.mealName, groceries: this.state.groceries.filter(g => g.quantity > 0) };

        const targetGroceries = target === null ? groceries : groceries.map(g => {
            const match = target.groceries.find(m => m.name === g.name);
            return match ? match : g;
        });

        const queriedGroceries = searchQuery === '' ? targetGroceries : targetGroceries.filter(g => g.name.toUpperCase().includes(searchQuery.toUpperCase()));

        const groceryItems =
            <ScrollView>
                {queriedGroceries.map(g =>
                    <Grocery
                        key={g.name}
                        grocery={g}
                        onIncrease={() => this.handleIncrease(g)}
                        onDecrease={() => this.handleDecrease(g)}
                    />
                )}
            </ScrollView>;

        return (
            <Modal
                animationType='slide'
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
                <View style={{ flex: 1 }}>
                    <PaperInput
                        style={{ margin: 10 }}
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
                        onPress={target === null ? () => onAdd(meal) : () => onEdit(target.meal, meal)}
                        disabled={(isExisting(mealName) && target === null) || mealName === ''}
                    >
                        {isExisting(mealName) && target === null ? 'That name is taken' : 'Save'}
                    </Button>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        marginTop: 15,
    },
    mealName: {
        marginLeft: 20,
        fontSize: 36,
    },
    saveButton: {
        padding: 10,
        margin: 20,
    }
});