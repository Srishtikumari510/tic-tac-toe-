const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

// Handle click on a cell
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('occupied');

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
    }

    if (!board.includes('')) {
        alert("It's a draw!");
        gameActive = false;
    }
}

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('occupied');
    });
    gameActive = true;
    currentPlayer = 'X';
}
