addEventListener(
    'DOMContentLoaded', function () {
        let quoteArray = [
            {
                category: "Innovation",
                text: "Innovation distinguishes between a leader and a follower. – Steve Jobs"
            },
        ];
        function showRandomQuote() {
            const newQuoteButton = document.getElementById("newQuote");
            newQuoteButton.addEventListener('click', function () {
                const quoteDisplay = document.getElementById("quoteDisplay");
                const quote = document.createElement('p');
                const randomIndex = Math.floor(Math.random() * quoteArray.length);
                quote.innerHTML = quoteArray[randomIndex].text
                quoteDisplay.appendChild(quote);
            })
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
                    alert('added the quote successfully')
                }
                else {
                    alert("please insert both category and text");
                }

            })

        }
        function loadQuoteArray() {
            if (localStorage.getItem("quoteArray")) {
                quoteArray = JSON.parse(localStorage.getItem("quoteArray"));
            }
        }
        const exportButton = document.getElementById("exportButton");
        exportButton.addEventListener('click', function () {
            const JSONArray = JSON.stringify(quoteArray);
            const blob = new Blob([JSONArray], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'quote.json'
            a.click();
            URL.revokeObjectURL(url);

        })

        const importJSON = document.getElementById("importFile");
        importJSON.addEventListener('change',
            function importFromJsonFile(event) {
                console.log("hi")

                const fileReader = new FileReader();
                fileReader.onload = function (event) {
                    const importedQuotes = JSON.parse(event.target.result);
                    quoteArray.push(...importedQuotes);
                    localStorage.setItem("quoteArray", JSON.stringify(quoteArray));
                    alert('Quotes imported successfully!');
                };

                fileReader.readAsText(event.target.files[0]);
            }
        )

        loadQuoteArray();
        showRandomQuote();
        createAddQuoteForm();
    }
)