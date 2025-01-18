document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    
    const definition = await fetchDefinition(message);
    setTimeout(() => addMessage(definition, 'bot'), 500);
}

function addMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.innerHTML = `<span>${message}</span>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function fetchDefinition(word) {
    // Custom dictionary of words
    const customDefinitions = {
        "chatbot": "မင်းမေကြီးတော််ကြီး",
        "dictionary": "မင်းမေလင်",
        "sunset": "နေဝင်သွားတာ မင်းဖင်ထဲကို"
    };
    
    // Check if the word is in the custom dictionary
    if (customDefinitions[word.toLowerCase()]) {
        return customDefinitions[word.toLowerCase()];
    }

    // Fetch definition from the API if not in the custom dictionary
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            return data[0].meanings[0].definitions[0].definition;
        } else {
            return `Sorry, I couldn't find a definition for "${word}".`;
        }
    } catch (error) {
        return 'There was an error fetching the definition. Please try again later.';
    }
}
