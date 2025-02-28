//for practice of useEffect and useState

import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [newCount, setNewCount] = useState(0)

  useEffect(() => {
    console.log(`Count changed`)
    return () => {
      console.log(`useEffect cleanup`)
    }
  }, [count])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`count: ${count}`}</Text>
      <Button
        color={'red'}
        title={'Increase the count'}
        onPress={() => {
          setCount(count + 1)
        }}
      />

      <Button
        color={'green'}
        title={'Decreae the count'}
        onPress={() => {
          setCount(count - 1)
        }}
      />
      <Button
        color={'red'}
        title={'Increase the new count'}
        onPress={() => {
          setNewCount(count + 1)
        }}
      />

      <Button
        color={'green'}
        title={'Decreae the new count'}
        onPress={() => {
          setNewCount(count - 1)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange'
  },
  title: {
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 25
  }
})
export default Counter
