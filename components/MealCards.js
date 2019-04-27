import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Title, List, Paragraph, Button } from 'react-native-paper';

export default MealCards = ({ meals, onEdit, onDelete }) => {
    const cards =
        <ScrollView>
            {meals.map(m =>
                <Card key={m.name} style={{ margin: 10 }}>
                    <Card.Content>
                        <Title style={{ marginLeft: 10 }}>{m.name}</Title>
                        {m.groceries.length > 0 ? m.groceries.map(g =>
                            <List.Item
                                key={g.name}
                                title={g.name}
                                description={`Quantity ${g.quantity} | Total ${Math.round(g.price * g.quantity * 10) / 10}€ | Layout ${g.layout}`}
                            />) : <Paragraph>There are no groceries in this meal</Paragraph>}
                    </Card.Content>
                    <Card.Actions>
                        <Button icon='edit' onPress={() => onEdit(m)}>Edit</Button>
                        <Button icon='delete' onPress={() => onDelete(m)}>Delete</Button>
                    </Card.Actions>
                </Card>)}
        </ScrollView>;

    return cards;
}