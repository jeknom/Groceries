import React from 'react';
import { View, Slider, StyleSheet, TextInput } from 'react-native';
import { Button, List, Subheading } from 'react-native-paper';

export default class GroceryModify extends React.Component {
    state = {
        name: '',
        quantity: 0,
        price: 0,
        area: 1,
    }

    render() {
        const { onExpand, expanded } = this.props;

        return (
            <List.Accordion
                style={{margin: 6}}
                onPress={() => onExpand()}
                expanded={expanded}
                title="New grocery"
                left={() => <List.Icon icon="restaurant" />}
            >
                    <List.Section style={styles.listSection}>
                        <Subheading>Name</Subheading>
                        <TextInput
                            onChangeText={text => this.setState({ name: text })}
                            style={{borderBottomWidth: 0.5, borderColor: '#d6d7da', width: 300}}
                        />
                        <Subheading>Quantity: {this.state.quantity}</Subheading>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={20}
                            minimumTrackTintColor="#f45c42"
                            maximumTrackTintColor="#0062ff"
                            thumbTintColor="#151516"
                            onValueChange={ value => this.setState({ quantity: Math.round(value) })}
                        />
                        <Subheading>Price: {`${this.state.price}€`}</Subheading>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#f45c42"
                            maximumTrackTintColor="#0062ff"
                            thumbTintColor="#151516"
                            onValueChange={ value => this.setState({ price: Math.round(value) })}
                        />
                        <Subheading>Area: {this.state.area}</Subheading>
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={20}
                            minimumTrackTintColor="#f45c42"
                            maximumTrackTintColor="#0062ff"
                            thumbTintColor="#151516"
                            onValueChange={ value => this.setState({ area: Math.round(value) })}
                        />
                    </List.Section>
            </List.Accordion>
        );
    }
}

const styles = StyleSheet.create({
    listSection: {
        margin: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    listItem: {
        margin: 5,
    },
    slider: {
        margin: 6,
        width: 300,
        height: 40
    },
})