import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'
const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin?: string }>();
    return (
        <View>
            <Text>Verify</Text>
        </View>
    )
}
export default Page