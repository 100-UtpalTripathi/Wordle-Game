const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');
const rows = 6;
const cols = 5;
const word = 'APPLE';  // Example word to guess

let currentRow = 0;
let currentCol = 0;
let guess = '';

function createBoard() {
    for (let i = 0; i < rows * cols; i++) {
        const box = document.createElement('div');
        box.classList.add('letter-box');
        board.appendChild(box);
    }
}

function createKeyboard() {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('key-row');
        row.forEach(letter => {
            const key = document.createElement('button');
            key.textContent = letter;
            key.classList.add('key');
            key.addEventListener('click', () => handleKey(letter));
            rowDiv.appendChild(key);
        });
        keyboard.appendChild(rowDiv);
    });

    const lastRow = document.querySelectorAll('.key-row')[2];
    
    const backspaceKey = document.createElement('button');
    backspaceKey.innerHTML = '<i class="bi bi-backspace-fill"></i>';
    backspaceKey.classList.add('key', 'backspace');
    backspaceKey.addEventListener('click', handleBackspace);
    lastRow.appendChild(backspaceKey);

    const enterKey = document.createElement('button');
    enterKey.textContent = 'ENTER';
    enterKey.classList.add('key', 'enter');
    enterKey.addEventListener('click', checkWord);
    lastRow.appendChild(enterKey);
}

function handleKey(letter) {
    if (currentCol < cols) {
        const boxes = document.querySelectorAll('.letter-box');
        boxes[currentRow * cols + currentCol].textContent = letter;
        guess += letter;
        currentCol++;
    }
}

function handleBackspace() {
    if (currentCol > 0) {
        currentCol--;
        const boxes = document.querySelectorAll('.letter-box');
        boxes[currentRow * cols + currentCol].textContent = '';
        guess = guess.slice(0, -1);
    }
}

function checkWord() {
    if (guess.length === cols) {
        for (let i = 0; i < cols; i++) {
            const letterBox = document.querySelectorAll('.letter-box')[currentRow * cols + i];
            const key = Array.from(document.querySelectorAll('.key')).find(key => key.textContent === guess[i].toUpperCase());
            if (guess[i] === word[i]) 
            {
                letterBox.style.backgroundColor = 'green';
                letterBox.style.color = 'black';
                if(key) 
                    key.style.backgroundColor = 'green';

            } 
            else if (word.includes(guess[i])) 
            {
                letterBox.style.backgroundColor = 'yellow';
                letterBox.style.color = 'black';
                if(key) 
                    key.style.backgroundColor = 'yellow';
            } 
            else 
            {
                letterBox.style.backgroundColor = 'gray';
                letterBox.style.color = 'black';
                if(key) 
                    key.style.backgroundColor = 'gray';
            }
        }
        currentRow++;
        currentCol = 0;

        if(guess === word)
        {
            alert('Congrats 🎉🎉 You have guessed the word correctly!');
            location.reload();
        }
        else if(currentRow === rows)
        {
            alert('You have run out of attempts. The word was ' + word);
            location.reload();
        }
        guess = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    createKeyboard();
    document.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkWord();
    } else if (event.key === 'Backspace') {
        handleBackspace();
    } else {
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            handleKey(key);
        }
    }
}
