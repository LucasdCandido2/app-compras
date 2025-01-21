import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const fetchItems = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/items');
        setItems(response.data);
    };

    const addItem = async () => {
        if (name && price) {
            await axios.post('http://127.0.0.1:8000/api/items', { name, price });
            setName('');
            setPrice('');
            fetchItems();
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.name}: ${item.price}</Text>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button title="Add Item" onPress={addItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: { fontSize: 18, marginVertical: 5 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
});

export default App;
