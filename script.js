// Voice recognition and text-to-speech setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

// HTML element references
const chatOutput = document.getElementById('chat-output');
const voiceBtn = document.getElementById('voice-btn');

// Function to add chat message to the UI
function addChatMessage(sender, message) {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatOutput.appendChild(newMessage);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Function to respond with voice and text
function respond(responseText) {
    addChatMessage('Assistant', responseText);
    const speech = new SpeechSynthesisUtterance(responseText);
    window.speechSynthesis.speak(speech);
}

// Function to handle voice input
recognition.onresult = function(event) {
    const userInput = event.results[0][0].transcript;
    addChatMessage('You', userInput);

    // Simple logic for responses
    let response = '';
    if (userInput.includes('hello')) {
        response = 'Hello Mr Sunil Baraiya?';
    } else if (userInput.includes('your name')) {
        response = 'I am your virtual assistant!';
    } else if (userInput.includes('how are you')) {
        response = 'I am doing great, thank you!';
    } else {
        response = "Sorry, I didn't understand that.";
    }

    respond(response);
};

// Event listener for the voice button
voiceBtn.addEventListener('click', () => {
    recognition.start();
    addChatMessage('Assistant', 'Listening...');
});

// Handle errors
recognition.onerror = function(event) {
    addChatMessage('Assistant', 'Sorry, I could not understand. Please try again.');
};
