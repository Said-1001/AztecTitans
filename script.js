let heartRates = []; // Array para almacenar las frecuencias cardíacas

function updateHeartRate(newRate) {
    // Actualiza la frecuencia cardíaca actual
    document.getElementById("heart-rate").textContent = newRate;

    // Agrega la nueva frecuencia al array
    heartRates.push(newRate);

    // Calcula el promedio
    const average = calculateAverage(heartRates);
    
    // Actualiza el promedio en la página
    document.getElementById("average-heart-rate").textContent = average.toFixed(2);
}

function calculateAverage(rates) {
    if (rates.length === 0) return 0; // Previene la división por cero
    const sum = rates.reduce((acc, rate) => acc + rate, 0); // Suma todas las frecuencias
    return sum / rates.length; // Calcula el promedio
}

// Simulación de recibir nuevos datos
setInterval(() => {
    const randomHeartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Simula una frecuencia entre 60 y 100
    updateHeartRate(randomHeartRate);
}, 2000); // Actualiza cada 2 segundos
