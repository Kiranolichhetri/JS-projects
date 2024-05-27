document.addEventListener('DOMContentLoaded', () => {
    const car = document.getElementById('car');
    const redLight = document.getElementById('red-light');
    const yellowLight = document.getElementById('yellow-light');
    const greenLight = document.getElementById('green-light');
    const zebraCrossing = document.querySelector('.zebra-crossing');

    let carPosition = 0;
    let carSpeed = 2;
    const zebraCrossingPosition = zebraCrossing.offsetLeft - 100; // Position of zebra crossing relative to road

    let trafficLightState = 'red'; // Initial state of traffic light

    function changeTrafficLight() {
        if (trafficLightState === 'red') {
            trafficLightState = 'green';
            redLight.classList.remove('active');
            greenLight.classList.add('active');
        } else if (trafficLightState === 'green') {
            trafficLightState = 'yellow';
            greenLight.classList.remove('active');
            yellowLight.classList.add('active');
        } else if (trafficLightState === 'yellow') {
            trafficLightState = 'red';
            yellowLight.classList.remove('active');
            redLight.classList.add('active');
        }
    }

    function moveCar() {
        if (trafficLightState === 'red' && carPosition + car.offsetWidth >= zebraCrossingPosition) {
            // Stop car at red light before zebra crossing
            carSpeed = 0;
        } else if (trafficLightState === 'yellow' && carPosition + car.offsetWidth >= zebraCrossingPosition) {
            // Slow down car at yellow light before zebra crossing
            carSpeed = 1;
        } else {
            // Move car at normal speed if green or far from light
            carSpeed = 2;
        }

        carPosition += carSpeed;
        if (carPosition >= window.innerWidth - car.offsetWidth) {
            carPosition = 0; // Reset car position to start
        }
        car.style.transform = `translateX(${carPosition}px)`;

        requestAnimationFrame(moveCar);
    }

    setInterval(changeTrafficLight, 2000); // Change light 
    moveCar(); // Start moving the car
});
