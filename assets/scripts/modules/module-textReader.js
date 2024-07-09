export function textReader(url, block, blockClass, section) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const divElement = document.createElement(block);
                divElement.classList.add(blockClass);

                lines.forEach((line) => {
                    let processedLine;

                    if (line.trim() === '') {
                        // Пропускаем пустые строки
                        return;
                    }

                    if (line.startsWith('h1 ')) {
                        const content = line.substring(3);
                        const title = document.querySelector('.' + section + '__title');
                        title.textContent = content;
                        
                    }
                    if (line.startsWith('h2 ')) {
                        const content = line.substring(3); // Убираем "h2 " из начала строки
                        const subheading = document.createElement('h2');
                        subheading.classList.add(blockClass + '__h2');
                        subheading.textContent = content;
                        processedLine = subheading;
                    } else if (line.startsWith('p ')) {
                        const content = line.substring(2);
                        const paragraph = document.createElement('p');
                        paragraph.classList.add(blockClass + '__p');
                        paragraph.textContent = content;
                        processedLine = paragraph;
                    } else if (line.startsWith('text_h1 ')) {
                        const content = line.substring(8);
                        const paragraph = document.createElement('h1');
                        paragraph.classList.add(blockClass + '__h1');
                        paragraph.textContent = content;
                        processedLine = paragraph;
                    } else if (line.startsWith('text_p ')) {
                        const content = line.substring(7);
                        const paragraph = document.createElement('p');
                        paragraph.classList.add(blockClass + '__p');
                        paragraph.textContent = content;
                        processedLine = paragraph;
                    } else {
                        return;
                    }

                    divElement.appendChild(processedLine);
                });
                resolve(divElement);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}
