import React from 'react';
import { Card, Title, List, Paragraph, Button } from 'react-native-paper';

export default Meal = ({ meal, onEdit, onDelete }) => {
    const groceryItems = meal.groceries.map(g =>
        <List.Item
            key={g.name}
            title={g.name}
            description={`Quantity ${g.quantity} | Total ${g.price * g.quantity}€ | Area ${g.layout}`}
        />
    );

    return (
        <Card style={{ margin: 10 }}>
            <Card.Content>
                <Title style={{ marginLeft: 10 }}>{meal.name}</Title>
                {meal.groceries.length > 0 ? groceryItems : <Paragraph>There are no groceries in this meal</Paragraph>}
            </Card.Content>
            <Card.Actions>
                <Button icon='edit' onPress={() => onEdit(meal)}>Edit</Button>
                <Button icon='delete' onPress={() => onDelete(meal)}>Delete</Button>
            </Card.Actions>
        </Card>
    );
}