import RoundButton from '@/components/round-btn';
import Colors from '@/constants/Colors';
import { useBalanceStore } from '@/store/balance-store';
import { View, Text, ScrollView, StyleSheet } from 'react-native'

const Home = () => {
  const balance = 83535;

  const addMoney = () => {}

  return (
    <ScrollView style={{ backgroundColor: Colors.background}}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>{'€'}</Text>
        </View>

        <View style={styles.actionRow}>
          <RoundButton text={'Send'} icon={'add'} onPress={addMoney} />
          <RoundButton text={'Exchange'} icon={'refresh'} />
          <RoundButton text={'Details'} icon={'list'} />
          <RoundButton text={'More'} icon={'ellipsis-horizontal'} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
    gap: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 30,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  }
})
export default Home