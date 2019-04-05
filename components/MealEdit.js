import React from 'react';
import { Modal, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { IconButton, List, TextInput as PaperInput } from 'react-native-paper';
import DataService from '../services/Data';

export default class MealEdit extends React.Component {
    state = {
        mealName: '',
        searchQuery: '',
        groceries: [],
    };

    componentDidMount = async () => {
        const groceries = await DataService.getAll('GROCERIES');
        if (groceries !== null) this.setState({ groceries });
        else this.setState({ groceries: require('../assets/defaultData.json').groceries });
    }

    render() {
        const { visible, onHide } = this.props;
        const { mealName, searchQuery, groceries } = this.state;

        const queriedGroceries = searchQuery === '' ? groceries : groceries.filter(g => g.name.toUpperCase().includes(searchQuery.toUpperCase()));
        const groceryItems =
            <ScrollView>
                {queriedGroceries.map(g =>
                    <List.Item
                        key={g.name}
                        title={g.name}
                        description={`Costs ${g.price}€ | Found in area ${g.layout}`}
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
    }
});