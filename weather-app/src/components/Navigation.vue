<template>
  <header class="nav-container">
    <nav class="city-tabs">
      <button
        class="tab"
        v-for="city in CityList"
        :key="city"
        :class="{ active: selectedCity === city }"
        @click="$emit('city-clicked', city)"
      >{{ city }}</button>
      <button v-if="selectedCity" @click="refreshCityData(selectedCity)" class="refresh-btn">
        <i class="fa fa-refresh"></i>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  props: ["CityList", "selectedCity", "refreshCityData"]
};
</script>
<style lang="scss" scoped>
.nav-container {
  background-color: #fafafa;
  padding: 0;
  text-align: center;
  border-bottom: 2px solid #ccc;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.city-tabs {
  display: flex;
  width: 100%;
  //max-width: 1000px;
}

.tab {
  flex: 1;
  // max-width: 200px;
  background-color: transparent;
  border: none;
  padding: 12px 0;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  color: #7a7a7a;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s, color 0.3s;
}

.tab:hover {
  color: #111111;
  border-bottom: 3px solid #f51010;
}
.tab.active {
  color: #111;
  border-bottom: 3px solid #f51010;
}
.refresh-btn {
  background-color: #1565c0;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.refresh-btn:hover {
  background-color: #0d47a1;
}
</style>