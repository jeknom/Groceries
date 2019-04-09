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

    handleSave = () => {
        const meal = { name: this.state.mealName, groceries: this.state.groceries.filter(g => g.quantity > 0) };
        if (!this.props.isExisting(meal)) this.props.onAdd(meal);
        else this.setState({ notification: 'This meal already exists', snackbarVisible: true });
        setTimeout(() => { this.setState({ snackbarVisible: false }) }, 3000);
    }

    render() {
        const { visible, onHide, isExisting } = this.props;
        const { mealName, searchQuery, groceries } = this.state;

        const queriedGroceries = searchQuery === '' ? groceries : groceries.filter(g => g.name.toUpperCase().includes(searchQuery.toUpperCase()));
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
                        onPress={() => this.handleSave()}
                        disabled={isExisting(mealName) || mealName === ''}
                    >
                        {isExisting(mealName) ? 'That name is taken' : 'Save'}
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