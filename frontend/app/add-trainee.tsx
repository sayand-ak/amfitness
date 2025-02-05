import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    Pressable,
} from "react-native";
import ImagePickerInput from "@/components/ImagePickerInput";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Formik, FormikHelpers } from 'formik';
import { Trainee } from "@/types/trainee";
import { traineeValidationSchema } from "@/validations/trainee";
import { AntDesign } from "@expo/vector-icons"
import AdmissionCheck from "@/components/AdmissionCheck";
import { addTraineeFromStyles } from "@/styles/add-trainee";
import { useRouter } from "expo-router";
import api from "@/api/trainee";
import axios from "axios";



const UserForm: React.FC = () => {
    const [showDOBPicker, setShowDOBPicker] = useState<boolean>(false);
    const [showAdmissionDatePicker, setShowAdmissionDatePicker] = useState<boolean>(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [showScrollButton, setShowScrollButton] = useState<boolean>(true);
    const [hasExistingAdmission, setHasExistingAdmission] = useState(false);
    const router = useRouter();

    const toggleAdmission = () => {
        setHasExistingAdmission(!hasExistingAdmission);
    };


    //not working try later.....
    const handleGoBack = () => {
        router.back();
    };

    const handleScroll = (event: any) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
        setShowScrollButton(!isAtBottom);
    };

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    const initialValues: Trainee = {
        first_name: "",
        last_name: "",
        gender: "",
        dob: new Date(),
        address: "",
        place: "",
        mobile_number: "",
        email: "",
        workout_time: "",
        height: "",
        weight: "",
        admission_date: new Date(),
        admission_no: "", 
        image: "",
    };

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };


    const handleDateChange = (
        event: DateTimePickerEvent,
        date: Date | undefined,
        fieldName: string,
        setFieldValue: (field: string, value: any) => void
    ): void => {
        if (Platform.OS === 'android') {
            if (fieldName === 'dob') setShowDOBPicker(false);
            if (fieldName === 'admission_date') setShowAdmissionDatePicker(false);
        }
        
        if (date) {
            setFieldValue(fieldName, date);
        }
    };

    // Create FormData from trainee data
    const createFormData = (values: Trainee): FormData => {
        const formData = new FormData();
        
        (Object.keys(values) as Array<keyof Trainee>).forEach(key => {
            if (key === 'image') {
                if (values.image && typeof values.image === 'string') {
                    const uriParts = values.image.split('.');
                    const fileType = uriParts[uriParts.length - 1];
                    
                    formData.append('image', {
                        uri: values.image,
                        name: `photo.${fileType}`,
                        type: `image/${fileType}`
                    } as any);
                }
            } else if (key === 'dob' || key === 'admission_date') {
                formData.append(key, values[key].toISOString());
            } else {
                formData.append(key, values[key]?.toString() || '');
            }
        });
        
        return formData;
    }

    const handleSubmit = async (
        values: Trainee,
        formikHelpers: FormikHelpers<Trainee>
    ): Promise<void> => {
        try {
            // Validate all fields before submission
            await traineeValidationSchema.validate(values, { abortEarly: false });
            
            // Create FormData
            const formData = createFormData(values);

            // Make API call
            const response = await api.post('/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);

            if (response.data.success) {
                Alert.alert(
                    "Success",
                    "Trainee added successfully!",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                formikHelpers.resetForm();
                                // Optionally navigate back or to another screen
                                // router.back();
                            }
                        }
                    ]
                );
            } else {
                throw new Error(response.data.message || 'Failed to add trainee');
            }
        } catch (error) {
            console.log(error)
            let errorMessage = 'Failed to submit form';
            
            if (axios.isAxiosError(error)) {
                // Handle Axios errors
                errorMessage = error.response?.data?.message || error.message;
            } else if (error instanceof Error) {
                // Handle validation errors
                errorMessage = error.message;
            }
            
            Alert.alert("Error", errorMessage);
            console.error('Form submission error:', error);
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };


    const handleAdmissionChange = (
        admissionData: { number: string; date: string },
        setFieldValue: (field: string, value: any) => void
    ) => {
        setFieldValue('admission_no', admissionData.number);
        if (admissionData.date) {
            setFieldValue('admission_date', new Date(admissionData.date));
        }
    };

    const renderInput = (
        field: keyof Trainee,
        label: string,
        placeholder: string,
        touched: any,
        errors: any,
        handleChange: {
            (e: React.ChangeEvent<any>): void;
            <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
        },
        handleBlur: {
            (e: React.FocusEvent<any>): void;
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
        }, 
        values: Trainee,
        options?: {
            keyboardType?: "default" | "number-pad" | "numeric" | "email-address" | "phone-pad";
            multiline?: boolean;
            maxLength?: number;
            isRequired?: boolean;
        }
    ) => (
        <View style={addTraineeFromStyles.inputContainer}>
            <Text>{label}{options?.isRequired ? " *" : ""}</Text>
            <TextInput
                style={[
                    addTraineeFromStyles.input,
                    touched[field] && errors[field] && addTraineeFromStyles.errorInput
                ]}
                placeholder={placeholder}
                value={values[field]?.toString()}
                onChangeText={(text: string) => handleChange(field)(text)}
                onBlur={() => handleBlur(field)}
                keyboardType={options?.keyboardType || "default"}
                multiline={options?.multiline}
                maxLength={options?.maxLength}
            />
            {touched[field] && errors[field] && (
                <Text style={addTraineeFromStyles.errorText}>{errors[field]}</Text>
            )}
        </View>
    );

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={traineeValidationSchema}
            onSubmit={handleSubmit}
            validateOnMount={true}  
            validateOnChange={true} 
            validateOnBlur={true}  
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
                <View style={addTraineeFromStyles.container}>
                    <ScrollView 
                        ref={scrollViewRef} 
                        style={addTraineeFromStyles.formContainer}
                        onScroll={handleScroll}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    >

                        {/* Admission Check Section */}
                        <View style={addTraineeFromStyles.inputContainer}>
                            <View style={addTraineeFromStyles.checkboxContainer}>
                                <Pressable 
                                    style={[addTraineeFromStyles.checkbox, hasExistingAdmission && addTraineeFromStyles.checkboxChecked]}
                                    onPress={() => toggleAdmission()}
                                >
                                    {hasExistingAdmission && <Text style={addTraineeFromStyles.checkmark}>✓</Text>}
                                </Pressable>
                                <Text style={addTraineeFromStyles.checkboxLabel}>I already have an admission number</Text>
                            </View>

                            {hasExistingAdmission && (
                                <>
                                    <AdmissionCheck
                                        onAdmissionChange={(data) => handleAdmissionChange(data, setFieldValue)}
                                    />
                                    {touched.admission_no && errors.admission_no && (
                                        <Text style={addTraineeFromStyles.errorText}>{errors.admission_no}</Text>
                                    )}
                                </>
                            )}
                        </View>


                        {/* First Name and Last Name */}
                        <View style={addTraineeFromStyles.row}>
                            <View style={addTraineeFromStyles.halfInputContainer}>
                                {renderInput(
                                    "first_name",
                                    "First Name",
                                    "Enter First Name",
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    { isRequired: true }
                                )}
                            </View>
                            <View style={addTraineeFromStyles.halfInputContainer}>
                                {renderInput(
                                    "last_name",
                                    "Last Name",
                                    "Enter Last Name",
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    { isRequired: true }
                                )}
                            </View>
                        </View>

                        {/* Gender Picker */}
                        <View style={addTraineeFromStyles.inputContainer}>
                            <Text>Gender *</Text>
                            <View style={[
                                addTraineeFromStyles.pickerContainer,
                                touched.gender && errors.gender && addTraineeFromStyles.errorInput
                            ]}>
                                <Picker
                                    selectedValue={values.gender}
                                    onValueChange={(value: string) => setFieldValue("gender", value)}
                                >
                                    <Picker.Item label="Select Gender" value="" />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                            </View>
                            {touched.gender && errors.gender && (
                                <Text style={addTraineeFromStyles.errorText}>{errors.gender}</Text>
                            )}
                        </View>

                        {/* DOB Picker */}
                        <View style={addTraineeFromStyles.inputContainer}>
                            <Text>Date of Birth *</Text>
                            <TouchableOpacity 
                                onPress={() => setShowDOBPicker(true)}
                                style={[
                                    addTraineeFromStyles.dateButton,
                                    touched.dob && errors.dob && addTraineeFromStyles.errorInput
                                ]}
                            >
                                <Text>{formatDate(values.dob)}</Text>
                            </TouchableOpacity>
                            {showDOBPicker && (
                                <DateTimePicker
                                    value={values.dob}
                                    mode="date"
                                    display="default"
                                    onChange={(event, date) => 
                                        handleDateChange(event, date, 'dob', setFieldValue)
                                    }
                                />
                            )}
                        </View>


                        {/* Other Fields */}
                        {renderInput(
                            "address",
                            "Address",
                            "Enter Address",
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            values,
                            { multiline: true, isRequired: true }
                        )}

                        {renderInput(
                            "place",
                            "Place",
                            "Enter Place",
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            values,
                            { isRequired: true }
                        )}

                        {renderInput(
                            "mobile_number",
                            "Mobile Number",
                            "Enter Mobile Number",
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            values,
                            { keyboardType: "phone-pad", maxLength: 10, isRequired: true }
                        )}

                        {renderInput(
                            "email",
                            "Email",
                            "Enter Email",
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            values,
                            { keyboardType: "email-address" }
                        )}

                        <View style={addTraineeFromStyles.inputContainer}>
                            <Text>Workout Time *</Text>
                            <View style={[
                                addTraineeFromStyles.pickerContainer,
                                touched.workout_time && errors.workout_time && addTraineeFromStyles.errorInput
                            ]}>
                                <Picker
                                    selectedValue={values.workout_time}
                                    onValueChange={(value: string) => setFieldValue("workout_time", value)}
                                >
                                    <Picker.Item label="Select Workout Time" value="" />
                                    <Picker.Item label="Morning" value="morning" />
                                    <Picker.Item label="Evening" value="evening" />
                                </Picker>
                            </View>
                            {touched.workout_time && errors.workout_time && (
                                <Text style={addTraineeFromStyles.errorText}>{errors.workout_time}</Text>
                            )}
                        </View>


                        {/* Height and Weight */}
                        <View style={addTraineeFromStyles.row}>
                            <View style={addTraineeFromStyles.halfInputContainer}>
                                {renderInput(
                                    "height",
                                    "Height (cm)",
                                    "Enter Height",
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    { keyboardType: "numeric" }
                                )}
                            </View>
                            <View style={addTraineeFromStyles.halfInputContainer}>
                                {renderInput(
                                    "weight",
                                    "Weight (kg)",
                                    "Enter Weight",
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    { keyboardType: "numeric" }
                                )}
                            </View>
                        </View>

                        {/* Image Picker */}
                        <ImagePickerInput
                            imageUri={values.image as string}
                            setFieldValue={setFieldValue}
                            fieldName="image"
                            touched={touched}
                            errors={errors}
                        />
                    </ScrollView>

                    {/* Floating Down Arrow Button */}
                    {showScrollButton && (
                        <TouchableOpacity style={addTraineeFromStyles.floatingButton} onPress={scrollToBottom}>
                            <AntDesign name="downcircle" size={30} color="rgba(9, 9, 9, 0.27)" />
                        </TouchableOpacity>
                    )}

                    {/* Submit Button */}
                    <View style={addTraineeFromStyles.fixedButton}>
                        <Button 
                            title={isSubmitting ? "Submitting..." : "Submit"}
                            onPress={() => handleSubmit()}
                            disabled={isSubmitting}
                        />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default UserForm;

