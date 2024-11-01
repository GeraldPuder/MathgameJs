const prompt = require("prompt-sync")();


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOperation(difficulty) {
    const operations = {
        easy: ['+', '-'],
        medium: ['+', '-', '*', '/', '%'],
        hard: ['+', '-', '*', '/', '%']
    };
    return operations[difficulty][Math.floor(Math.random() * operations[difficulty].length)];
}





function generateQuestion(difficulty) {
    let num1, num2, operation;

    switch (difficulty) {
        case 'easy':
            num1 = getRandomNumber(1, 9);
            num2 = getRandomNumber(1, 9);
            operation = getRandomOperation('easy');
            break;
        case 'medium':
            num1 = getRandomNumber(1, 99);
            num2 = getRandomNumber(1, 99);
            operation = getRandomOperation('medium');
            if (['*', '/', '%'].includes(operation)) {
                num1 = getRandomNumber(1, 9);
            }
            break;
        case 'hard':
            num1 = getRandomNumber(1, 999);
            num2 = getRandomNumber(1, 99);
            operation = getRandomOperation('hard');
            if (['*', '/', '%'].includes(operation)) {
                num2 = getRandomNumber(1, 9);
            }
            break;
        default:
            throw new Error('Invalid difficulty level');
    }

    // Ensure no division by zero
    if (operation === '/' && num2 === 0) {
        operation = getRandomOperation(difficulty); // Re-select operation if division by zero
    }

    return `${num1} ${operation} ${num2}`;
}







function maxScoreMode(difficulty) {
    let score = 0;
    for (let i = 1; i <= 20; i++) {
        const question = generateQuestion(difficulty);
        const answer = prompt(`${i}) ${question} = ?`);
        const correctAnswer = eval(question);

        if (answer === 'skip') {
            console.log(`Okay, Your score: ${score} + 0 = ${score}`);
        } else if (parseInt(answer) === correctAnswer) {
            score += 10;
            console.log(`Correct! Your score: ${score - 10} + 10 = ${score}`);
        } else {
            score -= 5;
            console.log(`Wrong! Your score: ${score + 5} - 5 = ${score}`);
        }
    }
    console.log(`Final Score: ${score}`);
}






function threeOutMode(difficulty) {
    let score = 0;
    let lives = 3;

    while (lives > 0) {
        const question = generateQuestion(difficulty);
        const answer = prompt(`${question} = ?`);
        const correctAnswer = eval(question);

        if (parseInt(answer) === correctAnswer) {
            score += 10;
            console.log(`Correct! Your score: ${score - 10} + 10 = ${score}. ${lives} chance(s) left`);
        } else {
            lives -= 1;
            console.log(`Wrong! Your score: ${score} + 0 = ${score}. ${lives} chance(s) left`);
        }
    }
    console.log(`Game Over! Final Score: ${score}`);
}










function selectGameMode() {
    const difficulty = prompt('Select difficulty level: easy, medium, hard');
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        alert('Invalid difficulty level selected');
        return;
    }

    const gameMode = prompt('Select game mode: maxScore, threeOut');
    if (gameMode === 'maxScore') {
        maxScoreMode(difficulty);
    } else if (gameMode === 'threeOut') {
        threeOutMode(difficulty);
    } else {
        alert('Invalid game mode selected');
    }
}

selectGameMode();









