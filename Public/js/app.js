document.addEventListener('DOMContentLoaded', function() {
    fetchGames();
    document.getElementById('scoreForm').addEventListener('submit', submitScore);
});

function fetchGames() {
    fetch('/api/games')
        .then(response => response.json())
        .then(games => {
            const selectElement = document.getElementById('gameSelect');
            selectElement.innerHTML = '<option>Select a game...</option>'; // Reset dropdown
            games.forEach(game => {
                const option = new Option(game.title, game.id);
                selectElement.add(option);
            });
        })
        .catch(error => console.error('Error fetching games:', error));
}

function fetchGameDetails(gameId) {
    fetch(`/api/games/${gameId}`)
        .then(response => response.json())
        .then(game => {
            const gameDetailsElement = document.getElementById('gameDetails');
            gameDetailsElement.innerHTML = `
                <h2>${game.title} (${game.releaseYear})</h2>
                <img src="${game.boxArt}" alt="${game.title}" style="max-width: 200px;">
                <p>${game.blurb}</p>
            `;
        })
        .catch(error => console.error('Error fetching game details:', error));
}

function fetchScores(gameId) {
    fetch(`/api/scores/${gameId}`)
        .then(response => response.json())
        .then(scores => {
            const scoreListElement = document.getElementById('scoreList');
            scoreListElement.innerHTML = ''; // Reset score list
            scores.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `${score.playerName}: ${score.score || score.timeScore}`;
                scoreListElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching scores:', error));
}

function submitScore(event) {
    event.preventDefault();
    const gameId = document.getElementById('gameSelect').value;
    const playerName = document.getElementById('playerName').value;
    const score = document.getElementById('score').value;

    fetch('/api/scores', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ gameId, playerName, score })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchScores(gameId); // Refresh the scores list
    })
    .catch(error => console.error('Error submitting score:', error));
}

// Assumes you have a modal or form for editing already setup
function showEditModal(gameId) {
    fetchGameDetailsForEdit(gameId); // Fetch details to populate form for editing
}

function fetchGameDetailsForEdit(gameId) {
    fetch(`/api/games/${gameId}`)
        .then(response => response.json())
        .then(game => {
            document.getElementById('editGameId').value = gameId;
            document.getElementById('editTitle').value = game.title;
            document.getElementById('editBoxArt').value = game.boxArt;
            document.getElementById('editReleaseYear').value = game.releaseYear;
            document.getElementById('editBlurb').value = game.blurb;
            document.getElementById('editScoreFormat').value = game.scoreFormat;
            document.getElementById('editGameModal').style.display = 'block'; // Show the modal
        })
        .catch(error => console.error('Error fetching game for edit:', error));
}

function submitGameEdit(event) {
    event.preventDefault();
    const gameId = document.getElementById('editGameId').value;
    const updatedGame = {
        title: document.getElementById('editTitle').value,
        boxArt: document.getElementById('editBoxArt').value,
        releaseYear: parseInt(document.getElementById('editReleaseYear').value, 10),
        blurb: document.getElementById('editBlurb').value,
        scoreFormat: document.getElementById('editScoreFormat').value
    };

    fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedGame)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('editGameModal').style.display = 'none'; // Hide the modal
        fetchGames(); // Optionally refresh the games list
    })
    .catch(error => console.error('Error updating game:', error));
}

// Attach the event listener to the edit form submit button
document.getElementById('editGameForm').addEventListener('submit', submitGameEdit);
