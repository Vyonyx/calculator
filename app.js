buttons = document.querySelectorAll('.num-button');
display = document.querySelector('.display');

// Hover styles for all buttons.
buttons.forEach(element => element.addEventListener('mouseenter', () => {
    element.classList.add('hover');
}));
buttons.forEach(element => element.addEventListener('mouseleave', () => {
    element.classList.remove('hover');
}));
buttons.forEach(element => element.addEventListener('mousedown', () => {
    element.classList.add('click');
}));
buttons.forEach(element => element.addEventListener('mouseup', () => {
    element.classList.remove('click');
}));

function displayInput(buttonInput) {
    const content = display.textContent;
    if (content.length >= 6) return
    if (buttonInput == '.' && content.includes('.')) return

    display.textContent += `${buttonInput}`;
}

buttons.forEach(element => element.addEventListener('click', () => {
    if (element.classList.contains('num') || element.classList.contains('symbol')) {
        displayInput(element.innerHTML);
    }
}));
