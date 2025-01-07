function switchTab(tabId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab-btn[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

// Calculator Functions
let display = document.getElementById('display');

function clearDisplay() {
    display.innerText = '0';
}

function deleteLast() {
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = '0';
    }
}

function append(value) {
    if (display.innerText === '0') {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function toggleSign() {
    if (display.innerText[0] === '-') {
        display.innerText = display.innerText.slice(1);
    } else {
        display.innerText = '-' + display.innerText;
    }
}

function calculate() {
    try {
        display.innerText = eval(display.innerText);
    } catch (error) {
        display.innerText = 'Error';
    }
}

// Unit Converter Functions
const units = {
    length: { meters: 1, kilometers: 0.001, miles: 0.000621371 },
    area: { squareMeters: 1, squareKilometers: 0.000001, acres: 0.000247105 },
    volume: { liters: 1, milliliters: 1000, gallons: 0.264172 },
    weight: { kilograms: 1, grams: 1000, pounds: 2.20462 },
    temperature: {}, // Special case handled separately
    speed: { metersPerSecond: 1, kilometersPerHour: 3.6, milesPerHour: 2.23694 },
    pressure: { pascals: 1, bar: 0.00001, psi: 0.000145038 },
    power: { watts: 1, kilowatts: 0.001, horsepower: 0.00134102 }
};

function populateUnits() {
    const category = document.getElementById('inputCategory').value;
    const inputUnitSelect = document.getElementById('inputUnit');
    const outputUnitSelect = document.getElementById('outputUnit');
    inputUnitSelect.innerHTML = '';
    outputUnitSelect.innerHTML = '';

    for (const unit in units[category]) {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.innerText = unit;
        inputUnitSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.innerText = unit;
        outputUnitSelect.appendChild(option2);
    }
}

populateUnits(); // Initial population for default category

function convertUnits() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const category = document.getElementById('inputCategory').value;
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;

    if (isNaN(inputValue)) {
        document.getElementById('conversionResult').innerText = 'Please enter a valid number';
        return;
    }

    if (category === 'temperature') {
        let result;
        if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
            result = (inputValue * 9/5) + 32;
        } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
            result = (inputValue - 32) * 5/9;
        } else {
            result = inputValue; // Same unit
        }
        document.getElementById('conversionResult').innerText = `Result: ${result}`;
        return;
    }

    const conversionFactor = units[category][outputUnit] / units[category][inputUnit];
    const result = inputValue * conversionFactor;
    document.getElementById('conversionResult').innerText = `Result: ${result}`;
}