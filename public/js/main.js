//if we're using app.get and app.post in server.js, why do we need to fetch?

fetch('/api/tweets', {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tweetsContainer = document.querySelector('#tweets');

        data.forEach(tweet => {
            const pEl = document.createElement('p');
            const hrEl = document.createElement('hr');
            pEl.textContent = tweet.tweet;
            tweetsContainer.append(pEl, hrEl);
        })
    });

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    fetch('api/tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tweet: document.querySelector('#text').value.trim(),
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            }
        })

})