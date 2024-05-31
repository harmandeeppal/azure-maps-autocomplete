document.addEventListener('DOMContentLoaded', function () {
    const subscriptionKey = '8WUyBQMtX9EkzEtEMkFK4CCoPh5yo99V79Hj71WNnYVzRuq4WCQHJQQJ99AEACYeBjFX4WR2AAAgAZMP2CC1'; // Replace with your actual Azure Maps API key
    const addressInput = document.getElementById('addressInput');
    const suggestionsDiv = document.getElementById('suggestions');
    const errorMessage = document.getElementById('errorMessage');

    addressInput.addEventListener('input', function () {
        const query = addressInput.value.trim();
        if (query.length > 0) {
            fetchSuggestions(query);
        } else {
            suggestionsDiv.innerHTML = '';
        }
    });

    function fetchSuggestions(query) {
        const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${subscriptionKey}&typeahead=true&countrySet=NZ&limit=3&query=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.error || !data.results) {
                    showError('Failed to load suggestions. Please check your API key.');
                    return;
                }
                displaySuggestions(data.results);
            })
            .catch(() => {
                showError('Failed to load suggestions. Please check your network connection.');
            });
    }

    function displaySuggestions(suggestions) {
        suggestionsDiv.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestionItem');
            suggestionItem.textContent = suggestion.address.freeformAddress;
            suggestionItem.addEventListener('click', function () {
                addressInput.value = suggestion.address.freeformAddress;
                suggestionsDiv.innerHTML = '';
            });
            suggestionsDiv.appendChild(suggestionItem);
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});
