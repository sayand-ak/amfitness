import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { TextInput, Chip, Card, FAB } from 'react-native-paper';
import { Link } from 'expo-router';
import api from '@/api/trainee';
import { Trainee } from '@/types/trainee';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [traineesData, setTraineesData] = useState<Trainee[] | []>([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch trainees data when component mounts
    useEffect(() => {
        const fetchTrainees = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get("/list"); 
                setTraineesData(response.data.data);
            } catch (err) {
                setError('Failed to fetch trainees data');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainees();
    }, []);

    // Filter trainees based on search and filter selection
    const filteredTrainees = traineesData.filter((trainee) => {
        const matchesSearch = trainee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              trainee.last_name.toLowerCase().includes(searchQuery.toLowerCase());
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

            {/* Loading or Error State */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6200ea" />
                    <Text style={styles.loadingText}>Loading trainees...</Text>
                </View>
            )}
            {error && <Text style={styles.error}>{error}</Text>}

            {/* List of Trainees */}
            <FlatList
                data={filteredTrainees}
                keyExtractor={(item) => item.admission_no} 
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Image
                            source={typeof item.image === 'string' ? { uri: item.image } : { uri: item.image.url }}
                            style={styles.image}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
                            <Text style={styles.admissionNo}>{item.admission_no}</Text> {/* Admission No Below Name */}
                        </View>
                        {/* Status with conditional colors */}
                        <Text style={[styles.status, item.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
                            {item.status}
                        </Text>
                    </Card.Content>
                </Card>                

                )}
                ListEmptyComponent={<View style={styles.noResultsContainer}><Text style={styles.noResults}>No trainees found.</Text></View>}
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
        elevation: 5,
    },
    cardContent: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    admissionNo: {
        fontSize: 14,
        color: 'gray',
    },
    status: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'right',
        flex: 1, 
    },
    activeStatus: {
        color: 'green',
    },
    inactiveStatus: {
        color: 'red',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#6200ea',
        color: "#fff"
    },
    noResultsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 50,
    },
    noResults: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6200ea',
    },
    error: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
        marginTop: 20,
    },
});


export default HomePage;
