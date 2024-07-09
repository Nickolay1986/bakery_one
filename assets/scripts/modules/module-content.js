export function textContent(url, blockClass, sectionClass) {
    fetch(url)
    .then(response => response.text())
        .then(data => {
        const section = document.querySelector('.' + sectionClass);
        section.innerHTML = ''
        const lines = data.split('\n');
        const body = document.getElementsByTagName('main')[0]
        const wrapper = document.createElement('div'); 
        wrapper.classList.add('wrapper')    
        const divElement = document.createElement('div');
            
        divElement.classList.add(blockClass); 
        wrapper.appendChild(divElement);
        section.appendChild(wrapper);
            
        lines.forEach((line) => {
            let processedLine;
        
            if (line.trim() === '') {
                // Пропускаем пустые строки
                return;
            }
        
            if (line.startsWith('h1 ')) {
                const content = line.substring(3); // Убираем "h1 " из начала строки
                const heading = document.createElement('h1');
                heading.classList.add(sectionClass + '__title')
                heading.textContent = content;
                processedLine = heading;
            } else if (line.startsWith('h2 ')) {
                const content = line.substring(3); // Убираем "h2 " из начала строки
                const subheading = document.createElement('h2');
                subheading.classList.add(sectionClass + '__h2')
                subheading.textContent = content;
                processedLine = subheading;
            } else if (line.startsWith('p ')){
                const content = line.substring(2);
                const paragraph = document.createElement('p');
                paragraph.classList.add(sectionClass + '__p');
                paragraph.textContent = content;
                processedLine = paragraph;
            }
        
            divElement.appendChild(processedLine);
        });
        
    })
    .catch(error => {
        console.error(error);
    });  
}