import React from "react";
import { TouchableOpacity, Text, Image, Alert, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from '@expo/vector-icons'; // Using FontAwesome for the user icon

interface ImagePickerInputProps {
    imageUri: string;
    setFieldValue: (field: string, value: any) => void;
    fieldName: string;
    touched: any;
    errors: any;
}

const ImagePickerInput: React.FC<ImagePickerInputProps> = ({ imageUri, setFieldValue, fieldName, touched, errors }) => {
    const pickImage = async (): Promise<void> => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert("Permission Denied", "You need to allow access to the gallery to select an image.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setFieldValue(fieldName, result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to pick image");
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <Text style={styles.label}>Profile Image *</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                <View style={styles.avatarContainer}>
                    {/* Show image if available, else show default user avatar */}
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.avatar} />
                    ) : (
                        <View style={styles.defaultAvatar}>
                            <FontAwesome name="upload" size={90} color="#000" />
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            {touched[fieldName] && errors[fieldName] && (
                <Text style={styles.errorText}>{errors[fieldName]}</Text>
            )}
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    imagePicker: {
        marginTop: 10,
        alignItems: "center",
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100, // Ensure it's a perfect circle
        borderWidth: 2,
        borderColor: "#ccc",
    },
    defaultAvatar: {
        width: 200,
        height: 200,
        borderRadius: "50%", 
        backgroundColor: "rgba(9, 9, 9, 0.20)", 
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
});

export default ImagePickerInput;
