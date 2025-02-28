import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { weatherType } from '../utilities/weatherType'
import moment from 'moment'

const ListItem = ({ dt_txt, min, max, condition }) => {
  return (
    <View style={styles.card}>
      <Feather name={weatherType[condition]?.icon} size={60} color="#333" />
      <View style={styles.content}>
        <Text style={styles.date}>{moment(dt_txt).format('dddd, h:mm a')}</Text>
        <Text
          style={styles.temp}
        >{`${Math.round(min)}°/${Math.round(max)}°`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 6
  },
  content: {
    flex: 1,
    marginLeft: 15
  },
  temp: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold'
  },
  date: {
    color: '#333',
    fontSize: 16,
    marginBottom: 8
  }
})

export default ListItem
