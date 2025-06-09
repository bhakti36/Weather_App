<template>
  <header class="container search-city">
    <nav>
      <span class="header">Simple Weather</span>
      <div class="right">
        <i class="fa fa-search" @click="toggleSearch"></i>
      </div>
    </nav>

    <div v-if="searchOpen" class="search-input-wrapper">
      <input
        v-model="searchCity"
        @keyup.enter="searchCityInFirestore"
        placeholder="Enter city name..."
      />
      <button @click="searchCityInFirestore">Search</button>
    </div>

    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal-content">
        <p>{{ searchResult }}</p>
        <button @click="modalVisible = false">Close</button>
      </div>
    </div>
  </header>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { citydb } from "@/firebase/firebaseinit";
export default {
  name: "SearchCity",
  data() {
    return {
      searchOpen: false,
      searchCity: "",
      modalVisible: false,
      searchResult: ""
    };
  },

  methods: {
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
      if (!this.searchOpen) {
        this.searchCity = "";
      }
    },
    async searchCityInFirestore() {
      if (!this.searchCity.trim()) {
        this.searchResult = "Please enter a city name";
        this.modalVisible = true;
        return;
      }

      try {
        const citiesRef = collection(citydb, "cityDirectory");

        const q = query(
          citiesRef,
          where("city_name", "==", this.searchCity.trim())
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          this.searchResult = `City "${this.searchCity}" found!`;
        } else {
          this.searchResult = `City "${this.searchCity}" not found.`;
        }
      } catch (error) {
        console.error("Error searching city:", error.message);
        this.searchResult = "Error searching city. Please try again later.";
      }

      this.modalVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-city {
  background-color: #1565c0;
  position: relative;
}

header {
  z-index: 100;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);

  nav {
    display: flex;
    color: #fff;
    padding: 20px 0;
    justify-content: space-between;

    .right {
      i {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .header {
      font-size: 20px;
    }
  }
}

.search-input-wrapper {
  padding: 10px 20px;
  background: white;

  input {
    padding: 6px 10px;
    font-size: 16px;
    width: 200px;
    margin-right: 10px;
  }

  button {
    padding: 6px 12px;
    background-color: #1565c0;
    border: none;
    color: white;
    cursor: pointer;
    font-weight: 600;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  max-width: 300px;
  text-align: center;

  button {
    margin-top: 15px;
    padding: 6px 15px;
    background-color: #1565c0;
    border: none;
    color: white;
    cursor: pointer;
    font-weight: 600;
  }
}
</style>
