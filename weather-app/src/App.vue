<template>
  <div class="main">
    <SearchCity />
    <Navigation
      :CityList="CityList"
      :selectedCity="selectedCity"
      :refreshCityData="refreshCityData"
      @city-clicked="handleCityClick"
    />
    <div class="content">
      <router-view />
      <div class="weather-widgets">
        <HourlyForecast :forecast="hourlyData" />
        <DailyForecast :forecast="dailyData" />
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";
import Navigation from "./components/Navigation.vue";
import SearchCity from "./components/SearchCity.vue";
import DailyForecast from "@/components/DailyForcast.vue";
import HourlyForecast from "@/components/HourlyForcast.vue";
import { db, ref, get, set } from "@/firebase/firebaseinit";



export default {
  name: "App",
  components: {
    Navigation,
    SearchCity,
    HourlyForecast,
    DailyForecast
  },
  data() {
    return {
      selectedCity: "Rio de Janeiro",
      APIKey: "4ea2f2d1f43135c0d12e48a6deb57cc3",
      CityList: ["Rio de Janeiro", "Beijing", "Los Angeles"],
      CityCoords: {
        "Rio de Janeiro": { lat: -22.9068, lon: -43.1729 },
        Beijing: { lat: 39.9042, lon: 116.4074 },
        "Los Angeles": { lat: 34.0522, lon: -118.2437 }
      },
      ExcludeData: "current,minutely,alerts",
      hourlyData: [],
      dailyData: []
    };
  },
  mounted() {
    // Load default city data
    this.handleCityClick(this.selectedCity);
  },
  methods: {
    async handleCityClick(city, forceRefresh = false) {
      this.selectedCity = city;
      const { lat, lon } = this.CityCoords[city];
      const cityRef = ref(db, `cities/${city}`);

      if (!forceRefresh) {
        const snapshot = await get(cityRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const age = Date.now() - data.lastUpdated;

          if (age < 600000) {
            console.log("Loaded from Firebase");
            this.hourlyData = data.forecast.hourly;
            this.dailyData = data.forecast.daily;
            return;
          }
        }
      }
      console.log("refershbutton click", forceRefresh);
      // Fetch fresh data from API
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${this.ExcludeData}&appid=${this.APIKey}`;
      const res = await axios.get(apiUrl);
      const hourlyRaw = res.data.hourly || [];
      const dailyRaw = res.data.daily || [];

      const hourly = hourlyRaw
        .filter(item => item && item.dt && item.temp !== undefined)
        .slice(0, 5)
        .map(item => {
          const dateObj = new Date(item.dt * 1000);
          return {
            time: dateObj.toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true
            }),
            temp: Math.round(item.temp - 273.15) + "°",
            weather: item.weather?.[0] || {
              main: "N/A",
              description: "No data",
              icon: "01d"
            },
            pop: Math.round((item.pop ?? 0) * 100) + "%"
          };
        });

      const daily = dailyRaw
        .filter(item => item && item.dt && item.temp)
        .slice(0, 5)
        .map(item => {
          const dateObj = new Date(item.dt * 1000);
          return {
            date: dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric"
            }),
            temp: {
              min: Math.round(item.temp.min - 273.15) + "°",
              max: Math.round(item.temp.max - 273.15) + "°"
            },
            weather: item.weather?.[0] || {
              main: "N/A",
              description: "No data",
              icon: "01d"
            },
            pop: Math.round((item.pop ?? 0) * 100) + "%",
            rain: item.rain ?? 0
          };
        });

      await set(cityRef, {
        lat,
        lon,
        lastUpdated: Date.now(),
        forecast: { hourly, daily }
      });

      this.hourlyData = hourly;
      this.dailyData = daily;

      //console.log("Data refreshed for", city);
    },

    refreshCityData(city) {
      this.handleCityClick(city, true);
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    padding-top: 140px;
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
}

.weather-widgets {
  background-color: #018ab8;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
