import { useAssets } from 'expo-asset'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
    const assetId = require('@/assets/videos/intro.mp4');

    const player = useVideoPlayer(assetId, player => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    return (
        <View style={styles.container}>
            <VideoView 
                style={styles.video} 
                player={player}
                contentFit='cover'
                nativeControls={false}
            />

            <View style={{ marginTop: 80,padding: 20 }}>
                <Text style={styles.header}>Ready to change how you move money?</Text>
            </View>

            <View style={styles.button}>
                <Link href='/login' style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]} asChild>
                    <TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Login</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/signup' style={[defaultStyles.pillButton, { flex: 1, backgroundColor: 'white'}]} asChild>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Register</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    header: {
        fontSize: 36,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'white',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 60,
        paddingHorizontal: 20,
    },
})
export default Page