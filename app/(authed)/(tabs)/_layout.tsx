import Colors from '@/constants/Colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
            }}
        >
            <Tabs.Screen name='home' options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='home' color={color} size={size} />
                )
            }} />
            <Tabs.Screen name='invest' options={{
                title: 'Invest',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='bar-chart-outline' color={color} size={size} />
                )
            }} />
            <Tabs.Screen name='transfers' options={{
                title: 'Transfers',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='swap-horizontal' color={color} size={size} />
                )
            }} />

            <Tabs.Screen name='lifestyle' options={{
                title: 'Lifestyle',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='people' color={color} size={size} />
                )
            }} />

            <Tabs.Screen name='crypto' options={{
                title: 'Crypto',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='bitcoin' color={color} size={size} />
                )
            }} />
        </Tabs>
    )
}
export default Layout