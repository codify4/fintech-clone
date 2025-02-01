import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type RoundButtonProps = {
    text: string
    icon: typeof Ionicons.defaultProps
    onPress?: () => void
}
const RoundButton = ({ text, icon, onPress }: RoundButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.circle}>
                <Ionicons name={icon} size={40} color={Colors.dark} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        gap: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark,
    }
})
export default RoundButton