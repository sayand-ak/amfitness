import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Card, FAB, Chip } from 'react-native-paper';
import { Link } from 'expo-router';

const traineesData = [
    {
        id: 1,
        image: "https://via.placeholder.com/50",
        name: "John Doe",
        admissionNumber: "ADM1234",
        status: "Active",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/50",
        name: "Jane Smith",
        admissionNumber: "ADM5678",
        status: "Inactive",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/50",
        name: "Alice Johnson",
        admissionNumber: "ADM9101",
        status: "Active",
    },
    {
        id: 4,
        image: "https://via.placeholder.com/50",
        name: "Bob Williams",
        admissionNumber: "ADM1122",
        status: "Inactive",
    },
];

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');

    // Filter trainees based on search and filter selection
    const filteredTrainees = traineesData.filter((trainee) => {
        const matchesSearch = trainee.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' || trainee.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                mode="outlined"
                placeholder="Search Trainees..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchBar}
                left={<TextInput.Icon icon="magnify" />}
                theme={{ roundness: 10 }}
            />

            {/* Filter Chips */}
            <View style={styles.filterContainer}>
                {['All', 'Active', 'Inactive'].map((status) => (
                    <Chip
                        key={status}
                        mode={filter === status ? 'flat' : 'outlined'}
                        selected={filter === status}
                        onPress={() => setFilter(status)}
                        style={[styles.chip, filter === status && styles.selectedChip]}
                    >
                        {status}
                    </Chip>
                ))}
            </View>

            {/* List of Trainees */}
            <FlatList
                data={filteredTrainees}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.status}>{item.status}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                )}
                ListEmptyComponent={<Text style={styles.noResults}>No trainees found.</Text>}
            />

            {/* Floating Add Button */}
            <Link href="/add-trainee">
                <FAB style={styles.fab} icon="plus" label="Add Trainee" mode="elevated" />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 55,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: 'white',
        elevation: 3,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    chip: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    selectedChip: {
        backgroundColor: '#fff',
    },
    card: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: 'gray',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#6200ea',
    },
    noResults: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});

export default HomePage;
