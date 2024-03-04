document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'dave1', img: 'dave/01 (Custom).png' },
        { name: 'dave1', img: 'dave/01 (Custom).png' },
        { name: 'dave2', img: 'dave/02 (Custom).png' },
        { name: 'dave2', img: 'dave/02 (Custom).png' },
        { name: 'dave3', img: 'dave/03 (Custom).png' },
        { name: 'dave3', img: 'dave/03 (Custom).png' },
        { name: 'dave4', img: 'dave/04 (Custom).png' },
        { name: 'dave4', img: 'dave/04 (Custom).png' },
        // Duplicate the above or add new pairs here
        { name: 'dave5', img: 'dave/05 (Custom).png' },
        { name: 'dave5', img: 'dave/05 (Custom).png' },
        { name: 'dave6', img: 'dave/06 (Custom).png' },
        { name: 'dave6', img: 'dave/06 (Custom).png' },
        { name: 'dave7', img: 'dave/07 (Custom).png' },
        { name: 'dave7', img: 'dave/07 (Custom).png' },
        { name: 'dave8', img: 'dave/08 (Custom).png' },
        { name: 'dave8', img: 'dave/08 (Custom).png' },
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.memory-game');
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];

    let startTime = new Date().getTime(); // Start time for the timer

    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        document.getElementById('clock').textContent = `Timer: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    setInterval(updateTimer, 1000); // Update timer every second

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.setAttribute('data-id', i);
            
            const backFace = document.createElement('img');
            backFace.setAttribute('src', 'cover.png'); // Use a cover image
            backFace.classList.add('back-face');
            card.appendChild(backFace);
            
            grid.appendChild(card);
            card.addEventListener('click', flipCard);
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (!cardsChosenIds.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenIds.push(cardId);
            this.firstChild.src = cardArray[cardId].img; // Show the card image
            
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.memory-card img');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];
        
        if (optionOneId == optionTwoId) {
            cards[optionOneId].src = 'cover.png'; // Reset to cover image
            alert('You have clicked the same card!');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!');
            cards[optionOneId].style.visibility = 'hidden';
            cards[optionTwoId].style.visibility = 'hidden';
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].src = 'cover.png'; // Reset to cover image
            cards[optionTwoId].src = 'cover.png'; // Reset to cover image
        }
        cardsChosen = [];
        cardsChosenIds = [];
        if (cardsWon.length === cardArray.length / 2) {
            stopTimer(); // Call stopTimer function when all matches are found
            alert('Congratulations! You found them all!');
        }
    }

    createBoard();
});
