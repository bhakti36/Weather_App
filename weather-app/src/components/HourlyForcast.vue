<template>
  <div class="hourly-forecast">
    <h2>Next Hours</h2>
    <div class="hour-row">
      <div v-for="(hour, index) in forecast" :key="index" class="hour-col">
        <div class="temp">{{ hour.temp }}</div>
        <div class="pop">{{ hour.pop }}</div>
        <img
          v-if="hour.weather && hour.weather.icon"
          :src="getIconUrl(hour.weather.icon)"
          :alt="hour.weather.description"
          class="icon"
        />
        <div class="time">{{ hour.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourlyForecast",
  props: {
    forecast: {
      type: Array,
      required: true
    }
  },
  methods: {
    getIconUrl(iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
  }
};
</script>

<style lang="scss" scoped>
.hourly-forecast {
  background: #ffffff;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  min-height: 200px;
  width: 100%;
  margin-bottom: 20px;
}

.hourly-forecast h2 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.hour-row {
  display: flex;
  justify-content: space-between;
  gap: 7px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.hour-col {
  padding: 10px;
  width: 200px;
  min-width: 100px;
  flex-shrink: 0;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hour-col:last-child {
  border-right: none;
}

.temp {
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.pop {
  font-size: 16px;
  color: #22b2d8;
  margin: 2px 0;
}

.icon {
  width: 40px;
  height: 40px;
  margin: 6px auto;
  transition: transform 0.3s ease;
}

.time {
  font-size: 16px;
  font-weight: 500;
  color: #7a7a7a;
  margin-top: 4px;
}
</style>
