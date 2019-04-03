import React from 'react';
import { Card, Title, List, Paragraph, Button } from 'react-native-paper';

export default Meal = ({ meal, onDelete }) => {
    const groceryItems = meal.groceries.map(g => <List.Item key={g.name} title={g.name} description={g.price} />);

    return (
        <Card>
            <Card.Content>
                <Title>{meal.name}</Title>
                {meal.groceries.length > 0 ? groceryItems : <Paragraph>There are no groceries in this meal</Paragraph>}
            </Card.Content>
            <Card.Actions>
                <Button icon='delete' onPress={() => onDelete(meal)}>Delete</Button>
            </Card.Actions>
        </Card>
    );
}