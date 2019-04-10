import React from 'react';
import { Modal, View, TextInput, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Groceries from './Groceries';
import DataService from '../services/Data';

export default class MealAdd extends React.Component {
    state = {
        mealName: '',
        searchQuery: '',
        groceries: [],
    };

    componentDidMount = async () => {
        let groceries = await DataService.getAll('GROCERIES');
        if (groceries === null) groceries = require('../assets/defaultData.json').groceries;

        this.setState({ groceries: groceries.map(g => { return { ...g, quantity: 0 } }) });
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
        const { visible, onHide, onAdd } = this.props;
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
                    <Groceries
                        groceries={groceries}
                        onIncrease={this.handleIncrease}
                        onDecrease={this.handleDecrease}
                    />
                    <Button
                        style={styles.saveButton}
                        icon='add'
                        mode='contained'
                        onPress={() => onAdd({ name: mealName, groceries: groceries.filter(g => g.quantity > 0) })}
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
    mealName: {
        marginLeft: 20,
        fontSize: 36,
    },
    saveButton: {
        padding: 10,
        margin: 20,
    }
});