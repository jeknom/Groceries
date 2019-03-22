import * as React from 'react';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';

export default class ModifyItem extends React.Component {
    state = {
        nameText: "",
        priceText: "",
    };

    render() {
        const { visible, type, onModify, onCancel } = this.props;
        return (
            <Portal>
                <Dialog visible={visible} onDismiss={() => onCancel()}>
                    <Dialog.Title>ADD A NEW GROCERY</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label='Grocery'
                            value={this.state.nameText}
                            onChangeText={text => this.setState({ nameText: text })}
                        />
                        <TextInput
                            label='Price'
                            value={this.state.priceText}
                            onChangeText={text => this.setState({ priceText: text })}
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