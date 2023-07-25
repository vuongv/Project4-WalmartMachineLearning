
// MAP
let map = L.map("map",{
    center: [0, 0],
    zoom: 2
});

//TILE LAYER
let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);
