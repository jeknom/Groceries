import React from 'react';
import { List } from 'react-native-paper';

export default class MealList extends React.Component {
    render() {
        const { meals, selected, onSelect } = this.props;

        const mealList = meals.map(m => <List.Item key={m.name} title={m.name} />);

        return (
            <>
                {mealList}
            </>
        );
    }
}