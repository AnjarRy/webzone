document.getElementById('addGameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        title: document.getElementById('title').value,
        boxArt: document.getElementById('boxArt').value,
        releaseYear: document.getElementById('releaseYear').value,
        blurb: document.getElementById('blurb').value,
        scoreFormat: document.getElementById('scoreFormat').value
    };

    fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally reset the form or redirect the user
    })
    .catch(error => console.error('Error adding game:', error));
});
