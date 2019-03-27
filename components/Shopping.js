import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List, Checkbox } from 'react-native-paper';

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
        const checkBoxes = this.props.selectedMeals.map(m =>
            m.map(g =>
                <List.Item
                    key={g.name}
                    title={g.name}
                    description={g.price}
                    right={() =>
                        <Checkbox
                            status={this.state.pickups.some(gr => gr.name === g.name)}
                            onPress={() => this.handlePickup(g)}
                        />
                    }
                />)
        );

        return (
            { checkBoxes }
        );
    }
}