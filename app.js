const url = "https://datasets-server.huggingface.co/rows?dataset=HeshamHaroon%2Farabic-quotes&config=default&split=train&offset=0&length=100";

let quotesArray = []; // Array to hold quotes
let currentQuoteIndex = 0; // Index for the current quote

async function fetchQuotes() {
    try {
        const response = await fetch(url);

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Debugging: log the entire response

            // Check if data.rows exists and is an array
            if (Array.isArray(data.rows)) {
                // Store quotes in an array
                quotesArray = data.rows.map(element => element.row.quote); // Adjust this line to get the correct key
                currentQuoteIndex = 0; // Reset index
                displayQuote(); // Display the first quote
            } else {
                document.getElementById('quotes-list').innerHTML = '<li>لا توجد اقتباسات متاحة.</li>'; // Message if no quotes
            }
        } else {
            console.error(`Error: ${response.status}, ${response.statusText}`);
            document.getElementById('quotes-list').innerHTML = '<li>فشل تحميل الاقتباسات.</li>';
        }
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById('quotes-list').innerHTML = '<li>خطأ في الاتصال.</li>';
    }
}

function displayQuote() {
    const quotesList = document.getElementById('quotes-list');
    // Clear any existing list items
    quotesList.innerHTML = '';

    if (quotesArray.length > 0) {
        // Create a new list item for the current quote
        const li = document.createElement('li');
        li.textContent = quotesArray[currentQuoteIndex];
        quotesList.appendChild(li);
        
        // Increment the index for the next quote
        currentQuoteIndex = (currentQuoteIndex + 1) % quotesArray.length; // Loop back to start
    }
}

// Event listener for the button click
document.getElementById('fetch-quotes').addEventListener('click', () => {
    if (quotesArray.length === 0) {
        fetchQuotes(); // Fetch quotes if not already fetched
    } else {
        displayQuote(); // Display the next quote
    }
});
