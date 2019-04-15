import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Title } from 'react-native-paper';

export default class GroceryModify extends React.Component {
    state = {}
    render() {

        const { visible, onDismiss } = this.props;

        return (
            <View>
                <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={onDismiss}
                    >
                        <Title>Hello</Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onDismiss}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}