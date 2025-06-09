<template>
  <div class="widget-box">
    <h2>Next 5 Days</h2>
    <div v-for="(item, index) in forecast" :key="index" class="forecast-row">
      <div class="icon-section">
        <img
          :src="`https://openweathermap.org/img/wn/${item.weather.icon}@2x.png`"
          :alt="item.weather.description"
        />
      </div>

      <div class="info-section">
        <div class="date">{{ item.date }}</div>
        <div class="description">{{ item.weather.description }}</div>
      </div>

      <div class="temp-section">
        <div class="max">{{ item.temp.max }}</div>
        <div class="min">{{ item.temp.min }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyForecast",
  props: {
    forecast: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.widget-box {
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  min-height: 200px;
  width: 100%;
  background: #ffffff;
}

h2 {
  font-size: 20px;
  margin-bottom: 12px;
  color: #333;
}

.forecast-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

.icon-section img {
  width: 60px;
  height: 60px;
}

.info-section {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.info-section .date {
  font-weight: 600;
  font-size: 18px;
  color: #333;
  margin-bottom: 4px;
}

.info-section .description {
  font-size: 18px;
  color: #7a7a7a;
}

.temp-section {
  display: flex;
  gap: 8px;
  text-align: right;
  font-weight: 600;
  font-size: 18px;
  color: #333;
  align-items: center;
}
</style>
