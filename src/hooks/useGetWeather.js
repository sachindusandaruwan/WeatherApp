import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { WEATHER_API_KEY } from '@env'

export const useGetWeather = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [weather, setWeather] = useState(null)
  const [coords, setCoords] = useState({ lat: null, lon: null })

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      )
      const data = await res.json()
      if (res.ok) {
        setWeather(data)
      } else {
        throw new Error(data.message)
      }
      setLoading(false)
    } catch (error) {
      setError(`Could not fetch weather: ${error.message}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        setLoading(false)
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setCoords({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
    })()
  }, [])

  useEffect(() => {
    if (coords.lat && coords.lon) {
      fetchWeatherData(coords.lat, coords.lon)
    }
  }, [coords])

  return [loading, error, weather]
}
