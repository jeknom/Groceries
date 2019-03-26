import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchField = ({ value, onChange }) => {

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder='Search...'
                onChangeText={query => onChange(query)}
                value={value}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 40,
    }
});

export default SearchField;