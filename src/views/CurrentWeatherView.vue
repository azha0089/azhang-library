<template>
  <div class="weather-container">
    <h1>Current Location Weather</h1>

    <!-- 状态提示 -->
    <p v-if="loading">Detecting your location...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- 显示天气 -->
    <main v-if="weatherData">
      <h2>{{ locationName }}</h2>
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

const apikey = "8be69ae744df69dce08d56cd0ac0f417" // 你的 OpenWeather API key

export default {
  name: "CurrentWeatherView",
  data() {
    return {
      lat: null,
      lon: null,
      weatherData: null,
      locationName: "",
      loading: true,
      errorMessage: "",
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
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            this.lat = position.coords.latitude
            this.lon = position.coords.longitude

            const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${this.lat}&lon=${this.lon}&limit=1&appid=${apikey}`
            const reverseResponse = await axios.get(reverseGeoUrl)
            if (reverseResponse.data.length > 0) {
              const { name, country } = reverseResponse.data[0]
              this.locationName = `${name}, ${country}`
            }

            const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely,hourly,alerts&appid=${apikey}&units=metric`
            const weatherResponse = await axios.get(weatherUrl)
            this.weatherData = weatherResponse.data
            this.loading = false
          },
          (error) => {
            this.errorMessage = "Unable to retrieve your location."
            this.loading = false
            console.error(error)
          }
        )
      } else {
        this.errorMessage = "Geolocation is not supported by this browser."
        this.loading = false
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
.error {
  color: red;
  font-weight: bold;
}
img {
  width: 100px;
  height: 100px;
}
p {
  margin: 5px 0;
}
</style>
