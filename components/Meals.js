import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Searchbar, Button, Divider } from 'react-native-paper';
import Meal from './Meal';
import MealEdit from './MealEdit';

export default class Meals extends React.Component {
    state = {
        search: "",
        addVisible: false,
    }

    handleShow = () => this.setState({ addVisible: true });
    handleHide = () => this.setState({ addVisible: false });

    handleUpdate = meal => {
        const dataCopy = { ...this.props.data };

        if (!meal.name || dataCopy.meals.some(m => m.name === meal.name))
            return;

        dataCopy.meals.push(meal);
        this.props.onUpdate(dataCopy);
    };

    handleDelete = meal => {
        console.log(meal);
        const dataCopy = { ...this.props.data };
        dataCopy.meals = dataCopy.meals.filter(m => m.name !== meal.name);
        this.props.onUpdate(dataCopy);
    }

    render() {
        const { data } = this.props;

        const meals = () => {
            if (data.meals && data.meals.length > 0) {
                const dataSearch = this.state.search === "" ? data.meals : data.meals.filter(m => m.name.toUpperCase().includes(this.state.search.toUpperCase()));

                return dataSearch.map(m =>
                    <Meal
                        style={styles.meal}
                        key={m.name}
                        meal={m}
                        onDelete={this.handleDelete}
                    />
                );
            }
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Searchbar
                        style={styles.searchbar}
                        placeholder="Search meals..."
                        onChangeText={query => { this.setState({ search: query }); }}
                        value={this.state.search}
                    />
                    <Divider />
                    {meals()}
                    <Button
                        style={styles.addButton}
                        icon="add"
                        mode="outlined"
                        onPress={() => this.handleShow()}
                    >
                        Add Meal
                    </Button>
                    <MealEdit
                        visible={this.state.addVisible}
                        onModify={this.handleUpdate}
                        onCancel={this.handleHide}
                        groceries={this.props.data.groceries}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },

    searchbar: {
        margin: 20,
    },

    addButton: {
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
    }
});