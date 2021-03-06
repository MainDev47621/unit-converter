const category = document.getElementById('category');
const inputValue = document.getElementById('input-val');
const inputUnit = document.getElementById('input-unit');
const outputValue = document.getElementById('output-value');
const outputUnit = document.getElementById('output-unit');
const submitBtn = document.getElementById('submit-btn');


// Set up correct input and output unit options based on category selected

const setUpUnits = (units) => {
    inputUnit.innerHTML = '';
    outputUnit.innerHTML = '';
}

const setCategory = () => {
    const categoryValue = category.value;
    switch(categoryValue) {
        case 'length':
            setUpUnits({'Kilometer' : 'kilometer', 'Meter' : 'unitmeter', 'Centimeter' : 'centimeter', 'Millimeter' : 'millimeter', 'Inch' : 'inch', 'Foot' : 'foot', 'Yard' : 'yard', 'Mile' : 'mile', 'Light Year' : 'lightYear'})
            break;
        case 'temp':
            setUpUnits({'Celcius' : 'C', 'Fahrenheit' : 'F', 'Kelvin' : 'K'});
            break;
    }
}

category.addEventListener('change', setCategory);

// Set category units for length (default category) upon loading the page
setCategory();