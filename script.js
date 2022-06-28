const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quotes from API
async function getQuotes() {
  const apiURL = "https://api.quotable.io/random1";
  loading();

  // Using AXIOS to make API call
  axios
    .get(apiURL)
    .then((response) => {
      setContent(response.data);
    })
    .catch((error) => {
      console.log("Error message:", error.message);
      newQuoteFromLocal();
    });
}

// This is a backup function to get a Quote from Local in case API fails
function newQuoteFromLocal() {
  // To pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  console.log("From local", quote);
  setContent(quote);
}

// Setting the dynamic content from the Quote Object
function setContent(quote) {
  console.log("Quote object is", quote);

  // Check if Author is blank, replace it with "Unknown"
  authorText.textContent = quote.author ?? "Unknown";

  //   Check Quote length to determine styling
  quote.content.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.content;
  complete();
}

// Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
