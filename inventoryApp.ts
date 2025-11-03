import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { Card } from 'react-native-elements';

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [inventory, setInventory] = useState([
        { id: '1', name: 'Item 1', quantity: 10 },
        { id: '2', name: 'Item 2', quantity: 5 },
        { id: '3', name: 'Item 3', quantity: 20 },
    ]);

    const addItem = () => {
        if (itemName && itemQuantity) {
            setInventory([...inventory, { id: Math.random().toString(), name: itemName, quantity: parseInt(itemQuantity) }]);
            setItemName('');
            setItemQuantity('');
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory Management</Text>
            <Button title="Add New Item" onPress={() => setModalVisible(true)} />
            <FlatList
                data={inventory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Divider />
                        <Text>Quantity: {item.quantity}</Text>
                    </Card>
                )}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Item Name"
                        value={itemName}
                        onChangeText={setItemName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantity"
                        value={itemQuantity}
                        onChangeText={setItemQuantity}
                        keyboardType="numeric"
                    />
                    <Button title="Add Item" onPress={addItem} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default App;