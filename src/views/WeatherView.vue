<template>
  <div class="weather-container">
    <h1>WEATHER APP</h1>

    <input v-model="city" placeholder="Enter city name" />
    <button @click="searchByCity">Search</button>

    <main v-if="weatherData">
      <h2>{{ displayCity }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.current.weather[0].description }}</span>
    </main>
  </div>
</template>

<script>
import axios from "axios"

const apikey = "8be69ae744df69dce08d56cd0ac0f417"

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      lat: null,
      lon: null,
      weatherData: null,
      displayCity: "",
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.current.temp) : null
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.current.weather[0].icon}@2x.png`
        : null
    },
  },
  methods: {
    async searchByCity() {
      if (!this.city) return
      try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${apikey}`
        const geoResponse = await axios.get(geoUrl)
        if (!geoResponse.data.length) {
          alert("City not found")
          return
        }

        const { lat, lon, name, country } = geoResponse.data[0]
        this.lat = lat
        this.lon = lon
        this.displayCity = `${name}, ${country}`

        const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apikey}&units=metric`
        const weatherResponse = await axios.get(weatherUrl)
        this.weatherData = weatherResponse.data
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    },
  },
}
</script>

<style scoped>
.weather-container {
  text-align: center;
  padding: 30px;
}
input {
  padding: 8px;
  margin-right: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
}
button:hover {
  background: #0056b3;
}
</style>
