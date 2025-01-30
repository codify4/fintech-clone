import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum SignInType {
    Phone, Email, Google, Apple
}

const Login = () => {
    const [countryCode, setCountryCode] = useState('+355')
    const [phoneNumber, setphoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 90;

    const router = useRouter();
    const { signIn } = useSignIn();

    const onSignIn = async (type: SignInType) => {
        if(type === SignInType.Phone) {
            const fullNumber = `${countryCode}${phoneNumber}`

            try {
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: fullNumber,
                });
                const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
                    return factor.strategy === 'phone_code'
                })

                const { phoneNumberId } = firstPhoneFactor;
                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                });

                router.push({pathname: '/verify/[phone]', params: { phone: fullNumber, signin: 'true' }})
            }
            catch (error) {
                console.log('Error: ', JSON.stringify(error, null, 2));
                if (isClerkAPIResponseError(error)) {
                    Alert.alert('Error', error.errors[0].message)
                }
            }
        }
    }
    
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Welcome back!</Text>
                <Text style={defaultStyles.descriptionText}>Login to your account</Text>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Country code'
                        placeholderTextColor={Colors.gray}
                        value={countryCode}
                    />
                    <TextInput
                        style={[styles.input, { flex: 1, marginLeft: 0 }]}
                        placeholder="Mobile number"
                        placeholderTextColor={Colors.gray}
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={setphoneNumber}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => onSignIn(SignInType.Phone)}
                    style={[
                        defaultStyles.pillButton, 
                        phoneNumber !== '' ? styles.enabled : styles.disabled, 
                        { marginBottom: 20 }
                    ]}
                >
                    <Text style={defaultStyles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16}}>
                    <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />

                    <Text style={{ color: Colors.gray }}>Or continue with</Text>

                    <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
                </View>

                <TouchableOpacity 
                    style={[
                        defaultStyles.pillButton, 
                        { 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 16, 
                            marginTop: 20, 
                            backgroundColor: Colors.lightGray 
                        }
                    ]}>
                    <Ionicons name='mail' size={24} color={'#000'} />
                    <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        defaultStyles.pillButton, 
                        { 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 16, 
                            marginTop: 20, 
                            backgroundColor: Colors.lightGray 
                        }
                    ]}>
                    <Ionicons name='logo-google' size={24} color={'#000'} />
                    <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[
                        defaultStyles.pillButton, 
                        { 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 16, 
                            marginTop: 20, 
                            backgroundColor: Colors.lightGray 
                        }
                    ]}>
                    <Ionicons name='logo-apple' size={24} color={'#000'} />
                    <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Apple</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: Colors.lightGray,
        padding: 20,
        borderRadius: 16,
        fontSize: 20,
        marginRight: 10,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.primaryMuted,
    }
})

export default Login