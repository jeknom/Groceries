import React from 'react';
import { Button, List } from 'react-native-paper';

export default class GroceryModify extends React.Component {
    state = { expanded: false }
    render() {
        return (
            <List.Accordion
            title="New grocery"
            left={() => <List.Icon icon="restaurant" />}
            >
                <List.Section
                    style={{
                        margin: 10,
                        borderRadius: 4,
                        borderWidth: 0.5,
                        borderColor: '#d6d7da',
                    }}
                >
                    <List.Item title="Name" />
                    <List.Item title="Quantity" />
                    <List.Item title="Price" />
                    <List.Item title="Area" />
                </List.Section>
            </List.Accordion>
        );
    }
}