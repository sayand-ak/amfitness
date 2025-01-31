import { StyleSheet } from "react-native";

export const addTraineeFromStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: 700
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    backButton: {
        position: "absolute",
        top: 0,
        left: 5,
    },
    inputContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfInputContainer: {
        width: "48%",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#f9f9f9",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "#f9f9f9",
        justifyContent: 'center',
        overflow: 'hidden'  // This helps with border radius
    },
    picker: {
        height: 50,  // Increased height for better touch target
        width: '100%',
        color: '#000000',  // Explicitly set text color
        backgroundColor: '#f9f9f9',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#f9f9f9",
    },
    imagePicker: {
        marginTop: 10,
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    imagePickerText: {
        color: "#fff",
        fontWeight: "bold",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        alignSelf: "center",
    },
    fixedButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    errorInput: {
        borderColor: '#ff0000',
        borderWidth: 1,
    },
    errorImagePicker: {
        backgroundColor: '#ff6b6b',  
        borderColor: '#ff0000',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
    floatingButton: {
        position: "absolute",
        left: "50%",
        bottom: 60,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 50,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateX: -17 }], // Half of the width to center it properly
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    
});
