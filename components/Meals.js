import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Meal from './Meal';
import MealEdit from './MealEdit';

export default class Meals extends React.Component {
    state = {
        addVisible: false,
    }

    handleShow = () => this.setState({ addVisible: true });
    handleHide = () => this.setState({ addVisible: false });

    handleUpdate = meal => {
        const dataCopy = { ...this.props.data };
        dataCopy.meals.push(meal);
        this.props.onUpdate(dataCopy);
    };

    handleDelete = mealName => {
        const dataCopy = { ...this.props.data };
        dataCopy.meals = dataCopy.meals.filter(m => m.name !== mealName);
        this.props.onUpdate(dataCopy);
    }

    render() {
        const { data } = this.props;

        const meals = () => {
            if (data.meals && data.meals.length > 0)
                return data.meals.map(m => <Meal style={styles.meal} key={m.name} meal={m} />);
        }

        return (
            <View style={styles.container}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
    },

    addButton: {
        marginRight: 20,
        marginLeft: 20,
        padding: 10,
    }
});