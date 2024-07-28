document.addEventListener('DOMContentLoaded', function () {
    let quoteArray = [
        {
            category: "Innovation",
            text: "Innovation distinguishes between a leader and a follower. – Steve Jobs"
        },
    ];
    const categoryFilter = document.getElementById("categoryFilter");
    async function fetchQuotesFromServer() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            return data.map(item => ({ category: "Sample", text: item.title }));
        } catch (error) {
            console.error("Error fetching data from server:", error);
            return [];
        }
    }
    async function postQuoteToServer(quote) {
        const url = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your server URL
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quote)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Successfully posted quote:', data);
            return data;
        } catch (error) {
            console.error('Error posting quote to server:', error);
        }
    }

    async function syncQuotesWithServer() {
        const serverQuotes = await fetchQuotesFromServer();
        const localQuotes = JSON.parse(localStorage.getItem("quoteArray")) || [];
        const mergedQuotes = mergeQuotes(serverQuotes, localQuotes);

        localStorage.setItem("quoteArray", JSON.stringify(mergedQuotes));
        quoteArray = mergedQuotes;
        loadOptions();
        displayQuotes(quoteArray);
        showNotification();
    }

    function mergeQuotes(serverQuotes, localQuotes) {
        const merged = [...localQuotes];
        serverQuotes.forEach(serverQuote => {
            if (!localQuotes.some(localQuote => localQuote.text === serverQuote.text)) {
                merged.push(serverQuote);
            }
        });
        return merged;
    }

    function showNotification() {
        const notification = document.getElementById("notification");
        notification.textContent =" Quotes synced with server";
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }
    function showRandomQuote() {
        const newQuoteButton = document.getElementById("newQuote");
        newQuoteButton.addEventListener('click', function () {
            const quoteDisplay = document.getElementById("quoteDisplay");
            quoteDisplay.innerHTML = ''; // Clear previous quote
            const quote = document.createElement('p');
            const randomIndex = Math.floor(Math.random() * quoteArray.length);
            quote.innerHTML = quoteArray[randomIndex].text;
            quoteDisplay.appendChild(quote);
        });
    }

    function createAddQuoteForm() {
        const addQuoteButton = document.getElementById("addQuote");
        addQuoteButton.addEventListener('click', function () {
            let newQuoteCategory = document.getElementById("newQuoteCategory").value;
            let newQuoteText = document.getElementById("newQuoteText").value;
            if (newQuoteCategory && newQuoteText) {
                quoteArray.push({
                    category: newQuoteCategory,
                    text: newQuoteText
                });
                localStorage.setItem("quoteArray", JSON.stringify(quoteArray));
                quoteArray = JSON.parse(localStorage.getItem("quoteArray")) || [];
                document.getElementById("newQuoteCategory").value = '';
                document.getElementById("newQuoteText").value = '';
                if (!categoryFilter.querySelector(`option[value="${newQuoteCategory}"]`)) {
                    const option = document.createElement('option');
                    option.value = newQuoteCategory;
                    option.text = newQuoteCategory;
                    categoryFilter.appendChild(option);
                }
                alert('Added the quote successfully');
            } else {
                alert("Please insert both category and text");
            }
        });
    }

    function loadQuoteArray() {
        if (localStorage.getItem("quoteArray")) {
            quoteArray = JSON.parse(localStorage.getItem("quoteArray"));
            populateCategories();
        }
    }

    const exportButton = document.getElementById("exportButton");
    exportButton.addEventListener('click', function () {
        const JSONArray = JSON.stringify(quoteArray);
        const blob = new Blob([JSONArray], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    const importJSON = document.getElementById("importFile");
    importJSON.addEventListener('change', function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const importedQuotes = JSON.parse(event.target.result);
            quoteArray.push(...importedQuotes);
            localStorage.setItem("quoteArray", JSON.stringify(quoteArray));
            loadQuoteArray();
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    });

    function populateCategories() {
        const categories = [...new Set(quoteArray.map(quote => quote.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    categoryFilter.addEventListener('change', function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        const filteredQuotes = selectedCategory === "all"
            ? quoteArray
            : quoteArray.filter(quote => quote.category === selectedCategory);
        displayQuotes(filteredQuotes);
    });

    function displayQuotes(quotes) {
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML = '';
        quotes.forEach(quote => {
            const quoteElement = document.createElement('p');
            quoteElement.innerHTML = quote.text;
            quoteDisplay.appendChild(quoteElement);
        });
    }

    loadQuoteArray();
    showRandomQuote();
    createAddQuoteForm();
    populateCategories();
    setInterval(syncQuotesWithServer, 60000);
});