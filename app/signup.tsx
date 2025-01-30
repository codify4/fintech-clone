import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

const Signup = () => {
    const [countryCode, setCountryCode] = useState('+35')
    const [phoneNumber, setphoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 90;

    const router = useRouter();
    const { signUp } = useSignUp();

    const onSignUp = async () => {
        const fullNumber = `${countryCode}${phoneNumber}`
        router.push({pathname: '/verify/[phone]', params: { phone: fullNumber }})
    //     try {
    //         await signUp!.create({
    //             phoneNumber: fullNumber,
    //         });
    //         router.push({pathname: '/verify/[phone]', params: { phone: fullNumber }})
    //     }
    //     catch (e) {
    //         console.log('Error: ', e)
    //     }
    }
    
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={defaultStyles.container}>
                <Text style={defaultStyles.header}>Let's get started!</Text>
                <Text style={defaultStyles.descriptionText}>Create an account to get started</Text>

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

                <Link href={'/login'} replace asChild>
                    <TouchableOpacity>
                        <Text style={defaultStyles.textLink}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </Link>

                <View style={{ flex: 1 }}></View>

                <TouchableOpacity 
                    onPress={onSignUp}
                    style={[
                        defaultStyles.pillButton, 
                        phoneNumber !== '' ? styles.enabled : styles.disabled, 
                        { marginBottom: 20 }
                    ]}
                >
                    <Text style={defaultStyles.buttonText}>Sign up</Text>
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

export default Signup