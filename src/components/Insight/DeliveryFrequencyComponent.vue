<template>
  <div id="map" style="height: 100vh;"></div>
</template>


<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import axios from 'axios';

const loadMap = async () => {
  const map = L.map('map').setView([37.559819, 126.963895], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // 행정동 구분선 추가
  const response = await fetch('/seoul_geojson_wgs84.geojson');
  const data = await response.json();

  // Choropleth layer example - customize based on your data
  const getColor = d => {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
  };

  const style = feature => {
    return {
      fillColor: getColor(feature.properties.your_property), // Adjust this line based on your data
      weight: 1,
      opacity: 1,
      color: 'red',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  L.geoJson(data, { style }).addTo(map);

  const locations = ref([]);

  const getLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/orders/delivery/frequency?storeId=1');
      // [latitude, longitude] 형식으로 변환하여 locations에 저장
      locations.value = response.data.data
        .filter(location => location.latitude !== null && location.longitude !== null)
        .map(location => [location.latitude, location.longitude]);

      console.log("getLocations 함수 내의 locations 상태 ", locations.value)
      addLocations(map, locations);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const addLocations = (map, locations) => {
    var redIcon = L.icon({
      iconUrl: '/blue.png',
      iconSize: [5, 5], // size of the icon
      iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    locations.value.forEach(function (location) {
      L.marker(location, { icon: redIcon }).addTo(map);
    });
  };

  // Ensure map is loaded before fetching locations
  await getLocations();
};

onMounted(() => {
  loadMap();
});
</script>

<style>
#map {
  height: 100vh;
}
</style>

  
  <style scoped>
  #map {
    width: 100%;
    height: 100%;
  }
  </style>
  

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
.leaflet-marker-icon {
    background-color: red;
    border-radius: 50%;
    width: 10px;  /* 아이콘 크기 조정 */
    height: 10px;
}
</style>