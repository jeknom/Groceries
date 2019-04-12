import React from 'react';
import { Modal, View, TextInput, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import GroceryList from './GroceryList';
import DataService from '../services/Data';

export default class MealModify extends React.Component {
    state = {
        mealName: this.props.original ? this.props.original.name : '',
        searchQuery: '',
        groceries: [],
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
        const { mealName, groceries } = this.state;

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
                <View style={{ flex: 1 }}>
                    <GroceryList
                        groceries={groceries}
                        onIncrease={this.handleIncrease}
                        onDecrease={this.handleDecrease}
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
    mealName: {
        marginLeft: 20,
        fontSize: 36,
    },
    saveButton: {
        padding: 10,
        margin: 20,
    }
});