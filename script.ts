const inputValue = document.getElementById('input-val');
const outputValue = document.getElementById('output-val');
const submitBtn = document.getElementById('submit-btn');

const inputUnit = document.getElementById('input-unit');
const outputUnit = document.getElementById('output-unit');
const category = document.getElementById('category');



//Set up correct input and output unit option based on category selected

interface UnitsSetup {
    [unit: string]: string;
}

const setUpUnits = (units: UnitsSetup) => {
    inputUnit.innerHTML = '';
    outputUnit.innerHTML = '';
    [inputUnit, outputUnit].forEach(field => {
        for (let unit in units) {
            const option = document.createElement('option');
            option.innerHTML = unit;
            option.value = units[unit];
            field.appendChild(option);
        }
    });
}

const setCategory = () => {
    const category: string = document.getElementById('category').value;
    switch (category) {
        case 'length':
            setUpUnits({'Kilometer' : 'kilometer', 'Meter' : 'unitmeter', 'Centimeter' : 'centimeter', 'Millimeter' : 'millimeter', 'Inch' : 'inch', 'Foot' : 'foot', 'Yard' : 'yard', 'Mile' : 'mile', 'Light Year' : 'lightYear'});
            break;
        case 'temp':
            setUpUnits({'Celcius' : 'C', 'Fahrenheit' : 'F', 'Kelvin' : 'K'});
            break;
    }
}

category.addEventListener('change', setCategory);

setCategory();

const convertUnit = (event) => {
    event.preventDefault();
    console.log(inputValue.value, inputUnit.value, outputUnit.value);
    let outPut: number;
    const category: string = document.getElementById('category').value;
    switch (category) {
        case 'length':
            console.log('convertUnits');
            outPut = convertLength(inputValue.value, inputUnit.value, outputUnit.value);
            break;
        case 'temp':
            outPut = convertTemp(inputValue.value, inputUnit.value, outputUnit.value);
            break;
    }
    // console.log(outPut);
    outputValue.value = outPut;
}


// Type aliases

type ConversionFunction = (arg1: number, arg2: string, arg3: string) => number;


//Length Conversion

const metricPrefixes = {
    'kilo': 1000,
    'unit': 1,
    'centi': 0.01,
    'milli': 0.001
}


// Two-dimensional array of length conversion coefficients
// Rows (ascending order): inch, foot, yard, mile, light year, meter
// Columns: same as rows
const lengthConversionMatrix: number[][] = [
    [1, 1/12, 1/36, 1/190080, 2.68478e-18, 0.0254],
    [12, 1, 1/3, 1/5280, 3.22174e-17, 0.3048],
    [36, 3, 1, 1/1760, 9.66522e-17, 0.9144],
    [190080, 5280, 1760, 1, 1.70108e-13, 1609.344],
    [3.725e+17, 3.104e+16, 1.035e+16, 5.879e+12, 1, 9.461e+15],
    [39.3701, 3.28084, 1.09361, 0.000621371, 1.057e-16, 1]
];

const lengthMatrixIndex = {
    'inch' : 0,
    'foot' : 1,
    'yard' : 2,
    'mile' : 3,
    'lightYear' : 4,
    'unitmeter' : 5
}

// Helper function for conversions in which only one or neither unit is metric
const convertLengthHelper: ConversionFunction = (len: number, oldUnit: string, newUnit: string): number => {
    let newLen: number = len;
    if (oldUnit.includes('meter') && newUnit.includes('meter')) {
        return len * (metricPrefixes[oldUnit.slice(0, -5)] / metricPrefixes[newUnit.slice(0, -5)]);
    } else if (oldUnit.includes('meter')) {
        newLen *= metricPrefixes[oldUnit.slice(0, -5)];
        return newLen * lengthConversionMatrix[lengthMatrixIndex['unitmeter']][lengthMatrixIndex[newUnit]];
    } else if (newUnit.includes('meter')) {
        newLen *= lengthConversionMatrix[lengthMatrixIndex[oldUnit]][lengthMatrixIndex['unitmeter']];
        return newLen / metricPrefixes[newUnit.slice(0, -5)];
    } else {
        return newLen * lengthConversionMatrix[lengthMatrixIndex[oldUnit]][lengthMatrixIndex[newUnit]];
    }
}

const convertLength: ConversionFunction = (len: number, oldUnit: string, newUnit: string): number => {
    if (oldUnit === newUnit) {
        return len;
    } else {
        return convertLengthHelper(len, oldUnit, newUnit);
    }
}


//Area Conversion

// const convertArea: ConversionFunction = (area: number, oldUnit: string, newUnit: string): number => {
//     if (oldUnit === newUnit) {
//         return area;
//     } else {
//         // handle conversion
//     }
// }



//Temperature Conversion

const convertTemp: ConversionFunction = (temp: number, oldUnit: string, newUnit: string): number => {
    if (oldUnit === newUnit) {
        return temp;
    }

    if (oldUnit === 'C') {
        if (newUnit === 'F') {
            return (temp * (9.5)) * 32;
        } else {
            return temp + 273.15;
        }
    } else if (oldUnit === 'F') {
        if (newUnit === 'C') {
            return (temp - 32) * (5/9);
        } else {
            return (temp - 32) * (5/9) + 273.15;
        }
    } else {
        if (newUnit === 'F') {
            return (temp - 273.15) * (9/5) + 32;
        } else {
            return temp - 273.15;
        }
    }
}

submitBtn.addEventListener('click', convertUnit)