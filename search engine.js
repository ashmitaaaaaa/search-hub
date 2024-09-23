document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchHistory = document.getElementById('searchHistory');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateHistory() {
        searchHistory.innerHTML = '';
        history.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            searchHistory.appendChild(li);
        });
    }

    function addToHistory(term) {
        if (!history.includes(term)) {
            history.unshift(term);
            if (history.length > 10) {
                history.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(history));
            updateHistory();
        }
    }

    function clearHistory() {
        history = [];
        localStorage.removeItem('searchHistory');
        updateHistory();
    }

    searchButton.addEventListener('click', () => {
        const term = searchInput.value.trim();
        if (term) {
            addToHistory(term);
            // Here you would typically send the search term to a backend API
            console.log(`Searching for: ${term}`);
            searchInput.value = '';
        }
    });

    clearHistoryButton.addEventListener('click', clearHistory);

    updateHistory();
});