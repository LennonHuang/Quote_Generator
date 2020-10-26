const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quote_data = [];

//Show Loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loader
function hideLoader(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function NewQuote(){
    loading();
    const quote = quote_data[Math.floor(Math.random() * quote_data.length)];
    //Check whether author is NULL
    if(!quote.author){
        quoteAuthor.textContent = "Someone";
    }
    else{
        quoteAuthor.textContent = quote.author;
    }
    //Check length of quote (span in div)
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    hideLoader();
}

// Get Quote From API
async function getQuote(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        //magic of apiURL
        const response = await fetch(apiURL);//response will not return till URL return
        quote_data = await response.json();// data will not return till json format 
        NewQuote();
    }catch (error){
        console.log('whoops, no quote',error);
    }
    hideLoader();
}

//Tweet function
function tweetQuote(){
    const twitterURL =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank'); 
}



//Event Listener
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',NewQuote);
//On Load
getQuote();