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
        let groceries = await DataService.getGroceries();
        groceries = groceries.map(g => { return { ...g, quantity: 0 } });

        if (this.props.original !== null) {
            filtered = groceries.filter(g => !this.props.original.groceries.some(o => o.name === g.name));
            groceries = this.props.original.groceries.concat(filtered);
        }

        this.setState({ groceries });
    }

    handleNewGrocery = async grocery => {
        const groceries = [...this.state.groceries];

        if (!groceries.some(g => g.name.toUpperCase() === grocery.name.toUpperCase())) {
            groceries.push({ ...grocery, quantity: 0 });

            await DataService.updateGroceries(groceries);
            this.setState({ groceries, groceryModifyVisible: false });
        }
        else if (grocery.name !== '') {
            Alert.alert(
                'Duplicate name detected',
                'A grocery with that name already exists, do you wish to update it?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Yes',
                        onPress: async () => {
                            let index = groceries.findIndex(i => i.name === grocery.name);
                            groceries[index] = { ...grocery, quantity: 0 };

                            await DataService.updateGroceries(groceries);
                            this.setState({ groceries, groceryModifyVisible: false });
                        }
                    }
                ]
            );
        }
    }

    handleDeleteGrocery = async grocery => {
        const groceries = [...this.state.groceries].filter(g => g.name !== grocery.name);

        await DataService.updateGroceries(groceries);
        this.setState({ groceries });
    }

    handleIncrease = grocery => {
        const groceries = [...this.state.groceries];
        groceries.find(g => g.name === grocery.name).quantity++;

        this.setState({ groceries });
    }

    handleDecrease = grocery => {
        const groceries = [...this.state.groceries];
        groceries.find(g => g.name === grocery.name).quantity--;

        this.setState({ groceries });
    }

    buttonText = () => {
        let text = 'Save';

        if (this.state.mealName === '') text = 'Meal needs to have a name';
        else if (this.props.exists(this.state.mealName) && !this.props.original) text = 'Needs to be a unique name';

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
                    {groceryModifyVisible ?
                        null :
                        <Appbar.BackAction
                            color='white'
                            onPress={() => onHide()}
                        />
                    }
                    <Appbar.Content
                        color='white'
                        title={groceryModifyVisible ? 'Create a new grocery' : 'Create a new meal'}
                    />
                    <Appbar.Action
                        color='white'
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
                                dark={true}
                                disabled={mealName === '' || (original ? false : exists(mealName))}
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