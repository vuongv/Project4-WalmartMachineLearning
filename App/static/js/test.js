function handleHover(eventData) {
    if (eventData.points.length > 0) {
        const xValue = eventData.points[0].x;
        console.log("Hovered X value:", xValue);
        console.log(xValue)
    }
}
const trace = {
    x: [1, 2, 3, 4, 5],
    y: [10, 11, 12, 13, 14],
    type: 'scatter'
};

// Layout
const layout = {
    hovermode: 'closest'
};

// Create the plot
Plotly.newPlot('plot', [trace], layout);

// Attach hover event
const plot = document.getElementById('plot');
plot.on('plotly_hover', handleHover);