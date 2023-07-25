// MAP
let map = L.map("map",{
    center: [39.83, -98.58],
    zoom: 4
});

//TILE LAYER
let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);
