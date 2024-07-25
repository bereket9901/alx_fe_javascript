addEventListener(
    'DOMContentLoaded', function () {
        let quoteArray = [
            {
                category: "Innovation",
                text: "Innovation distinguishes between a leader and a follower. – Steve Jobs"
            },
            {
                category: "Technology",
                text: "It has become appallingly obvious that our technology has exceeded our humanity. – Albert Einstein"
            },
            {
                category: "Leadership",
                text: "The function of leadership is to produce more leaders, not more followers. – Ralph Nader"
            },
            {
                category: "Education",
                text: "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela"
            },
            {
                category: "Motivation",
                text: "The only way to do great work is to love what you do. – Steve Jobs"
            },
            {
                category: "Success",
                text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer"
            },
            {
                category: "Creativity",
                text: "Creativity is intelligence having fun. – Albert Einstein"
            },
            {
                category: "Future",
                text: "The best way to predict the future is to invent it. – Alan Kay"
            }
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
                    document.getElementById("newQuoteCategory").value = '';
                    document.getElementById("newQuoteText").value = '';
                    alert('added the quote successfully')
                }
                else {
                    alert("please insert both category and text");
                }

            })

        }

        showRandomQuote();
        createAddQuoteForm();
    }
)