export function createElWithClass(element = 'div', elementClass = '') {
    let newElement;
    if (element === '' || !element) {
        newElement = document.createElement('div'); 
    } else {
        newElement = document.createElement(element);
    }
    if (elementClass !== '') {
        newElement.classList.add(elementClass);
    }
    return newElement;
}