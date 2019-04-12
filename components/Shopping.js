import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Checklist } from './Checklist';

export default class Shopping extends React.Component {
    state = {
        pickups: [],
    }

    handlePickup = grocery => {
        let dataCopy = [...this.state.pickups];

        if (dataCopy.some(m => m.name === grocery.name))
            dataCopy = dataCopy.filter(m => m.name !== grocery.name);
        else
            dataCopy.push(grocery);

        this.setState({ pickups: dataCopy });
    }

    render() {
        const { selectedMeals } = this.props;
        const shopList = () => selectedMeals.map(m =>
            <Checklist
                key={m.name}
                groceries={m.groceries}
                pickups={this.state.pickups}
                onPickup={this.handlePickup}
            />
        );

        return shopList();
    }
}