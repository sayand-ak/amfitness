import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface AdmissionCheckProps {
    onAdmissionChange: (admissionData: { number: string; date: string }) => void;
}

const AdmissionCheck: React.FC<AdmissionCheckProps> = ({ onAdmissionChange }) => {
    const [admissionNumber, setAdmissionNumber] = useState("");
    const [admissionDate, setAdmissionDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        
        if (selectedDate) {
            setAdmissionDate(selectedDate);
            onAdmissionChange({
                number: admissionNumber,
                date: selectedDate.toISOString().split('T')[0]
            });
        }
    };

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admission Details</Text>
            
            <View style={styles.inputContainer}>
                <Text>Admission Number *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Admission Number"
                    value={admissionNumber}
                    onChangeText={(value) => {
                        setAdmissionNumber(value);
                        onAdmissionChange({
                            number: value,
                            date: formatDate(admissionDate)
                        });
                    }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Admission Date *</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.dateButton}
                >
                    <Text>{formatDate(admissionDate)}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={admissionDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
    },
});

export default AdmissionCheck;