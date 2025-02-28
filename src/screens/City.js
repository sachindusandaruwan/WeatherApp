import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import IconText from '../components/IconText'
import moment from 'moment'
import { UNSPLASH_ACCESS_KEY } from '@env'

const City = ({ weatherData }) => {
  const {
    container,
    cityName,
    countryName,
    infoContainer,
    populationText,
    riseSetText,
    imageBackground
  } = styles

  const { name, country, population, sunrise, sunset } = weatherData

  const [backgroundImage, setBackgroundImage] = useState(null)

  const fetchRandomPhoto = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${'city sky'}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      )
      const data = await response.json()
      setBackgroundImage({ uri: data.urls.regular })
    } catch (error) {
      console.error('Error fetching photo:', error)

      setBackgroundImage(require('../../assets/city-background.jpg'))
    }
  }

  useEffect(() => {
    fetchRandomPhoto()
  }, [])

  return (
    <SafeAreaView style={container}>
      <ImageBackground source={backgroundImage} style={imageBackground}>
        <View style={infoContainer}>
          <Text style={[cityName, styles.text]}>{name}</Text>
          <Text style={[countryName, styles.text]}>{country}</Text>

          <IconText
            iconName={'user'}
            iconColor={'white'}
            bodyText={`Population: ${population}`}
            bodyTextStyles={populationText}
          />

          <View style={styles.sunriseSunsetContainer}>
            <IconText
              iconName={'sunrise'}
              iconColor={'white'}
              bodyText={moment(sunrise * 1000).format('h:mm A')}
              bodyTextStyles={riseSetText}
            />
            <IconText
              iconName={'sunset'}
              iconColor={'white'}
              bodyText={moment(sunset * 1000).format('h:mm A')}
              bodyTextStyles={riseSetText}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cityName: {
    fontSize: 40,
    marginBottom: 10
  },
  countryName: {
    fontSize: 30,
    marginBottom: 20
  },
  populationText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20
  },
  sunriseSunsetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20
  },
  riseSetText: {
    fontSize: 20,
    color: 'white'
  }
})

export default City
