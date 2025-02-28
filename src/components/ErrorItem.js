import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

const ErrorItem = ({ message }) => {
  return (
    <View style={styles.container}>
      <Feather name="cloud-off" size={100} color="#FFFFFF" />
      <Text style={styles.errorMessage}>Oops! Something went wrong</Text>
      <Text style={styles.errorMessage}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorMessage: {
    color: '#FFFFFF',
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'center'
  }
})

export default ErrorItem
