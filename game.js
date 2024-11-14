'use strict';

(() => {
  const game = () => {
    let userCountBalls = 5;
    let computerCountBalls = 5;
    let continueGame = true;

    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getComputerMove = () => {
      const moves = ['камень', 'ножницы', 'бумага'];
      return moves[getRandomIntInclusive(0, 2)];
    };

    const normalizeMove = (move, validMoves) => {
      return validMoves.find(validMove => validMove.toLowerCase().startsWith(move.toLowerCase()));
    };

    const determineWinner = (userMove, computerMove) => {
      if (userMove === computerMove) {
        return 'ничья';
      } else if (
        (userMove === 'камень' && computerMove === 'ножницы') ||
        (userMove === 'ножницы' && computerMove === 'бумага') ||
        (userMove === 'бумага' && computerMove === 'камень')
      ) {
        return 'пользователь';
      } else {
        return 'компьютер';
      }
    };

    const playRPS = () => {
      const userMove = prompt('Выберите: камень, ножницы или бумага');
      if (userMove === null) {
        if (confirm('Вы уверены, что хотите выйти?')) {
          continueGame = false;
          return null;
        } else {
          return playRPS();
        }
      }

      if (userMove.trim() === '') {
        alert('Выберите: камень, ножницы или бумага!');
        return playRPS();
      }

      const validMoves = ['камень', 'ножницы', 'бумага'];
      const normalizedMove = normalizeMove(userMove, validMoves);

      if (!normalizedMove) {
        alert('Выберите: камень, ножницы или бумага!');
        return playRPS();
      }

      const computerMove = getComputerMove();
      alert(`Компьютер выбрал: ${computerMove}`);

      const winner = determineWinner(normalizedMove, computerMove);
      return winner;
    };

    const start = () => {
      if (!continueGame) return;

      userCountBalls = 5;
      computerCountBalls = 5;

      const rpsWinner = playRPS();
      if (rpsWinner === null) {
        return;
      }

      if (rpsWinner === 'ничья') {
        alert('Ничья в игре "Камень, ножницы, бумага". Повторим.');
        return start();
      }

      if (rpsWinner === 'пользователь') {
        userTurn();
      } else {
        computerTurn();
      }
    };

    const updateBalls = (userMove, computerMove, userParity, computerParity) => {
      if (userParity === computerParity) {
        alert('Компьютер угадал.');
        userCountBalls -= userMove;
        computerCountBalls += userMove;
      } else {
        alert('Компьютер не угадал!');
        userCountBalls += userMove;
        computerCountBalls -= userMove;
      }

      console.log('Игрок: ' + userCountBalls);
      console.log('Компьютер: ' + computerCountBalls);
      console.log('Чётность юзера: ' + userParity);
      console.log('Чётность компьютера: ' + computerParity);
      console.log('Число компьютера: ' + computerMove);

      (computerCountBalls < 0) ? alert('У вас осталось 10 шариков.') : 
      alert(`У вас осталось: ${userCountBalls} шариков.`);
    };

    const checkGameOver = () => {
      if (userCountBalls <= 0) {
        alert('Поражение');
      } else if (computerCountBalls <= 0) {
        alert('У компьютера больше не осталось шариков. Победа');
      }

      if (userCountBalls <= 0 || computerCountBalls <= 0) {
        if (confirm('Хотите сыграть ещё?')) {
          continueGame = true;
          start();
        } else {
          continueGame = false;
        }
      }
    };

    const userTurn = () => {
      if (!continueGame) return;

      const userMove = prompt('Загадайте число от 1 до 5');
      if (userMove === null) {
        if (confirm('Вы уверены, что хотите выйти?')) {
          continueGame = false;
          return;
        } else {
          return userTurn();
        }
      }

      const userMoveNumber = parseInt(userMove, 10);
      if (Number.isNaN(userMoveNumber) || userMoveNumber < 1 || userMoveNumber > 5) {
        alert('Введите число от 1 до 5!');
        return userTurn();
      }

      const computerMove = getRandomIntInclusive(1, 5);
      const userParity = (userMoveNumber % 2 === 0) ? 'чёт' : 'нечёт';
      const computerParity = (computerMove % 2 === 0) ? 'чёт' : 'нечёт';

      updateBalls(userMoveNumber, computerMove, userParity, computerParity);
      checkGameOver();

      if (continueGame) {
        computerTurn();
      }
    };

    const computerTurn = () => {
      if (!continueGame) return;

      const computerMove = getRandomIntInclusive(1, 5);
      const computerParity = (computerMove % 2 === 0) ? 'чёт' : 'нечёт';

      const computerQuestionMove = prompt('чёт или нечёт?');
      if (computerQuestionMove === null) {
        if (confirm('Вы уверены, что хотите выйти?')) {
          continueGame = false;
          return;
        } else {
          return computerTurn();
        }
      }

      const computerQuestionParity = (computerQuestionMove === 'чёт') ? 'чёт' : 'нечёт';

      updateBalls(computerMove, computerMove, computerQuestionParity, computerParity);
      checkGameOver();

      if (continueGame) {
        userTurn();
      }
    };

    return start;
  };

  window.MRBLS = game;
})();
