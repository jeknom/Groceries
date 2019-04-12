import * as React from 'react';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';

export default class GroceryEdit extends React.Component {
    state = {
        nameText: "",
        priceText: "",
    };

    render() {
        const { visible, onModify, onCancel } = this.props;

        return (
            <Portal>
                <Dialog visible={visible} onDismiss={() => onCancel()}>
                    <Dialog.Title>New grocery</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Grocery'
                            value={this.state.nameText}
                            onChangeText={text => this.setState({ nameText: text })}
                            mode='outlined'
                        />
                        <TextInput
                            label='Price'
                            value={this.state.priceText}
                            onChangeText={text => this.setState({ priceText: text })}
                            mode='outlined'
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            icon="add"
                            mode="outlined"
                            onPress={() => onModify({ name: this.state.nameText, price: this.state.priceText })}
                        >
                            Add
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}