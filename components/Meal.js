import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Chip, Button, Card, Title, Paragraph } from 'react-native-paper';

const Meal = ({ meal, onDelete }) => {

  const groceries = () => {
    if (meal.groceries && meal.groceries.length > 0)
      return meal.groceries.map(g => <Chip key={g.name} mode='outlined'>{g.name}</Chip>);
    else
      return <Text>No groceries have been added to this meal.</Text>;
  }

  return (
    <>
      <Card style={styles.surface}>
        <Title>{meal.name}</Title>
        <Card.Content>{groceries()}</Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  surface: {
    margin: 20,
    padding: 5,
  },
});

export default Meal;