import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import RowText from '../components/RowText'
import { weatherType } from '../utilities/weatherType'
import moment from 'moment'
import { UNSPLASH_ACCESS_KEY } from '@env'

const CurrentWeather = ({ weatherData }) => {
  const {
    wrapper,
    container,
    tempStyles,
    feels,
    highLowWrapper,
    highLow,
    bodyWrapper,
    description,
    message
  } = styles

  const {
    main: { temp, feels_like, temp_max, temp_min },
    weather
  } = weatherData

  const weatherCondition = weather[0]?.main

  const sunnyWeatherTypes = ['Clear', 'Sunny']
  const rainyWeatherTypes = [
    'Rain',
    'Thunderstorm',
    'Drizzle',
    'Clouds',
    'Haze',
    'Mist'
  ]

  const [backgroundImage, setBackgroundImage] = useState(null)

  const fetchBackgroundImage = async () => {
    try {
      let query = weatherCondition.toLowerCase()
      if (sunnyWeatherTypes.includes(weatherCondition)) {
        query = 'sunny dark sky'
      } else if (rainyWeatherTypes.includes(weatherCondition)) {
        query = 'rainy dark sky'
      }

      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch image')
      }

      const data = await response.json()

      if (data && data.urls && data.urls.regular) {
        setBackgroundImage({ uri: data.urls.regular })
      } else {
        console.error('Invalid response format:', data)
        setBackgroundImage(require('../../assets/SunnyWeather.png'))
      }
    } catch (error) {
      console.error('Error fetching photo:', error)
      setBackgroundImage(require('../../assets/SunnyWeather.png'))
    }
  }

  useEffect(() => {
    fetchBackgroundImage()
  }, [])

  return (
    <SafeAreaView style={[wrapper]}>
      <ImageBackground source={backgroundImage} style={wrapper}>
        <View style={container}>
          <Feather
            name={weatherType[weatherCondition]?.icon}
            size={100}
            color="white"
            marginBottom={20}
          />
          <Text style={tempStyles}>{`${temp}°`}</Text>
          <Text style={feels}>{`Feels Like ${feels_like}`}</Text>

          <RowText
            messageOne={`High: ${temp_max}° `}
            messageTwo={`Low: ${temp_min}°`}
            containerStyles={highLowWrapper}
            messageOneStyles={highLow}
            messageTwoStyles={highLow}
          />
        </View>

        <RowText
          messageOne={weather[0]?.description}
          messageTwo={weatherType[weatherCondition]?.message}
          containerStyles={bodyWrapper}
          messageOneStyles={description}
          messageTwoStyles={message}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempStyles: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold'
  },
  feels: {
    color: 'white',
    fontSize: 24
  },
  highLow: {
    color: 'white',
    fontSize: 15
  },
  highLowWrapper: {
    flexDirection: 'row'
  },
  bodyWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 25,
    marginBottom: 40
  },
  description: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  message: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white'
  }
})

export default CurrentWeather
