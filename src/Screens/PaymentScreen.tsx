import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TabsStackScreenProps} from '../Navigation/TabsNavigation'
type Props = {}

const PaymentScreen = ({navigation, route }: TabsStackScreenProps<'Payment'>) => {
   return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    },
})
export default PaymentScreen