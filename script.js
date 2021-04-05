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
    switch(category) {
        case 'length':
            break;
        case 'temp':
            break;
    }
}

category.addEventListener('change', setCategory);