document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('status-message');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Condições de vitória possíveis
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Lida com o clique em uma célula
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    // Coloca o 'X' ou 'O' na célula
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }

    // Verifica se há um vencedor ou empate
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameBoard[winCondition[0]];
            let b = gameBoard[winCondition[1]];
            let c = gameBoard[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusMessage.innerHTML = `O Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }

        let roundDraw = !gameBoard.includes('');
        if (roundDraw) {
            statusMessage.innerHTML = `Empate!`;
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    // Altera o jogador atual
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.innerHTML = `Vez do Jogador ${currentPlayer}`;
    }

    // Reinicia o jogo
    function handleRestartGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        statusMessage.innerHTML = `Vez do Jogador ${currentPlayer}`;
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o');
        });
    }

    // Adiciona ouvintes de eventos
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});