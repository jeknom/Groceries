import React from 'react';
import { Modal, View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import GroceryList from './GroceryList';
import GroceryModify from './GroceryModify';
import DataService from '../services/Data';

export default class MealModify extends React.Component {
    state = {
        mealName: this.props.original ? this.props.original.name : '',
        searchQuery: '',
        groceries: [],
        groceryModifyVisible: false,
    };

    componentDidMount = async () => {
        let groceries = await DataService.getAll('GROCERIES');
        if (groceries === null) groceries = require('../assets/defaultData.json').groceries;

        groceries = groceries.map(g => { return { ...g, quantity: 0 } });

        if (this.props.original !== null) {
            filtered = groceries.filter(g => !this.props.original.groceries.some(o => o.name === g.name));
            groceries = this.props.original.groceries.concat(filtered);
        }

        this.setState({ groceries });
    }

    handleNewGrocery = async grocery => {
        let groceries = await DataService.getAll('GROCERIES');
        if (groceries === null) groceries = require('../assets/defaultData.json').groceries;
        const stateGroceriesCopy = [...this.state.groceries];

        if (!groceries.some(g => g.name.toUpperCase() === grocery.name.toUpperCase())) {
            console.log('not update')
            groceries.push(grocery);
            await DataService.update('GROCERIES', groceries);

            stateGroceriesCopy.push({ ...grocery, quantity: 0 });
            this.setState({ groceries: stateGroceriesCopy, groceryModifyVisible: false });
        }
        else if (grocery.name !== '') {
            console.log('update')
            Alert.alert(
                'Duplicate name detected',
                'A grocery with that name already exists, do you wish to update it?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Yes',
                        onPress: async () => {
                            let index = groceries.findIndex(i => i.name === grocery.name);
                            groceries[index] = grocery;

                            await DataService.update('GROCERIES', groceries);
                            index = stateGroceriesCopy.findIndex(i => i.name === grocery.name);
                            stateGroceriesCopy[index] = { ...grocery, quantity: 0 };
                            this.setState({ groceries: stateGroceriesCopy, groceryModifyVisible: false });
                        }
                    }
                ]
            );
        }
    }

    handleDeleteGrocery = async grocery => {
        let groceries = await DataService.getAll('GROCERIES');
        if (groceries === null) groceries = require('../assets/defaultData.json').groceries;

        groceries = groceries.filter(g => g.name !== grocery.name);
        await DataService.update('GROCERIES', groceries);
        this.setState({ groceries: [...this.state.groceries].filter(g => g.name !== grocery.name) })
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

    buttonText = () => {
        let text = 'Save';

        if (this.state.mealName === '') text = 'Meal needs to have a name';
        else if (this.props.exists(this.state.mealName)) text = 'Needs to be a unique name';

        return text;
    }

    render() {
        const { visible, onHide, onAdd, onEdit, original, exists } = this.props;
        const { mealName, groceries, groceryModifyVisible } = this.state;

        return (
            <Modal
                animationType='slide'
                visible={visible}
                onRequestClose={onHide}
            >
                <Appbar.Header statusBarHeight={0}>
                    <Appbar.BackAction
                        onPress={() => onHide()}
                    />
                    <Appbar.Content title={groceryModifyVisible ? 'Create a new grocery' : 'Create a new meal'} />
                    <Appbar.Action
                        icon={groceryModifyVisible ? 'close' : 'add'}
                        onPress={() => this.setState({ groceryModifyVisible: !groceryModifyVisible })}
                    />
                </Appbar.Header>
                <View style={{ flex: 1 }}>
                    {groceryModifyVisible ?
                        <GroceryModify onSave={this.handleNewGrocery} />
                        :
                        <>
                            <TextInput
                                style={styles.mealName}
                                placeholder='Insert meal name here..'
                                mode='outlined'
                                value={mealName}
                                onChangeText={mealName => this.setState({ mealName })}
                            />
                            <GroceryList
                                groceries={groceries}
                                onIncrease={this.handleIncrease}
                                onDecrease={this.handleDecrease}
                                onDelete={this.handleDeleteGrocery}
                            />
                            <Button
                                style={styles.saveButton}
                                icon='add'
                                mode='contained'
                                disabled={mealName === '' || exists(mealName)}
                                onPress={original ?
                                    () => onEdit(original, { name: mealName, groceries: groceries.filter(g => g.quantity > 0) })
                                    : () => onAdd({ name: mealName, groceries: groceries.filter(g => g.quantity > 0) })
                                }
                            >
                                {this.buttonText()}
                            </Button>
                        </>
                    }
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        margin: 12,
    },
    mealName: {
        marginLeft: 12,
        marginTop: 12,
        fontSize: 24,
    },
    saveButton: {
        padding: 12,
        margin: 24,
    }
});