"use strict";


let secondBlock = document.querySelector('.second');
let fourthBlock = document.querySelector('.fourth');
let fifthBlock = document.querySelector('.fifth');


let swapButton = document.querySelector('#swapButton');
swapButton.addEventListener('click', function handleSwap() {
    let thirdBlock = document.querySelector('.third');
    let sixthBlock = document.querySelector('.sixth');
    [thirdBlock.innerHTML, sixthBlock.innerHTML] = [sixthBlock.innerHTML, thirdBlock.innerHTML];
});


function calculateParallelogramSquare(base, height) {
    return base * height;
}

let calculateSquareButton = document.querySelector('#calculateSquare');
let isAlreadyCalculated = false;
calculateSquareButton.addEventListener('click', function handleCalculateSquare() {
    if (isAlreadyCalculated) {
        return;
    }

    let base = 10, height = 5;
    let square = calculateParallelogramSquare(base, height);
    fifthBlock.insertAdjacentHTML('beforeend', `<div>Square of the parallelogram: ${square}</div>`);

    isAlreadyCalculated = true;
});


let numberForm = document.forms.numberForm;
numberForm.addEventListener('submit', function submitNumberHandle(event) {
    event.preventDefault();

    let number = document.querySelector('#userNumber').value;
    let maxDigit = Math.max(...number.split('').map(Number));
    
    alert('The maximum digit is: ' + maxDigit);

    document.cookie = "maxDigit=" + maxDigit + "; max-age=86400";
});


function deleteCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; max-age=0";
      }
}

window.addEventListener('load', function reloadHandle() {
    if (document.cookie != '') {
        numberForm.style.display = "none"; 
        location.reload();
        setTimeout(function() {
            alert(document.cookie);
        }, 0);
        setTimeout(function() {
            deleteCookies();
        }, 0);
        setTimeout(function() {
            alert("cookies are deleted");
            location.reload();
        }, 0);
    }

    if (localStorage.getItem('second') == "true") {
        secondBlock.style.textAlign = 'right';
    }
    if (localStorage.getItem('fourth') == "true") {
        fourthBlock.style.textAlign = 'right';
    }
    if (localStorage.getItem('fifth') == "true") {
        fifthBlock.style.textAlign = 'right';
    }

    localStorage.removeItem(listKey);
});


let radioForm = document.forms.radioForm;
radioForm.addEventListener('reset', function submitRadioHandle() {
    secondBlock.style.removeProperty('text-align');
    fourthBlock.style.removeProperty('text-align');
    fifthBlock.style.removeProperty('text-align');

    localStorage.setItem('second', false);
    localStorage.setItem('fourth', false);
    localStorage.setItem('fifth', false);
});


secondBlock.addEventListener('mouseout', function handleMouseOut() {
    let radioValues = document.getElementsByName('rightAlign');
    if (radioValues[0].checked) {
        secondBlock.style.textAlign = 'right';
        localStorage.setItem('second', true);
    }
});

fourthBlock.addEventListener('mouseout', function handleMouseOut() {
    let radioValues = document.getElementsByName('rightAlign');
    if (radioValues[1].checked) {
        fourthBlock.style.textAlign = 'right';
        localStorage.setItem('fourth', true);
    }
});

fifthBlock.addEventListener('mouseout', function handleMouseOut() {
    let radioValues = document.getElementsByName('rightAlign');
    if (radioValues[2].checked) {
        fifthBlock.style.textAlign = 'right';
        localStorage.setItem('fifth', true);
    }
});


fourthBlock.insertAdjacentHTML('beforeend', `<p>To open a form for creating an ordered list you must select some numbers in the input field of the third block</p>`);
let listKey = "keyForDataOfList";
let inputField = document.querySelector('#userNumber');
let isAlreadySelected = false;

inputField.addEventListener('select', function selectHandle() {
    if (isAlreadySelected) {
        return;
    }
    isAlreadySelected = true;

    fourthBlock.innerHTML = `
        <form action="#" name="listForm">
            <label for="text">Text for list:</label>
            <input type="text" id="text" name="text" style="max-width: 115px;" required><br>
            <button type="submit">Add text</button>
        </form> 

        <ol class="valuesList"></ol>
    `;

    let listForm = document.forms.listForm;
    listForm.addEventListener('submit', function addTextToListHandle(event) {
        event.preventDefault();

        let listData = [], valuesList = document.querySelector('.valuesList');
        if(localStorage.getItem(listKey) != null)
            listData = JSON.parse(localStorage.getItem(listKey));

        valuesList.insertAdjacentHTML('beforeend', `<li>${listForm.elements.text.value}</li>`);
        valuesList.style.listStylePosition = 'inside';

        listData.push(listForm.elements.text.value);
        listForm.elements.text.value = '';
        listForm.elements.text.focus();
        localStorage.setItem(listKey, JSON.stringify(listData));
    });
});
