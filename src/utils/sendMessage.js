const sendMessage = () => {
    // Grab HTML elements
    const messageBar = document.querySelector(".textbar");
    const sendBtn = document.querySelector(".send-btn");
    const messageWrapper = document.querySelector(".message-wrapper");

    // Declaring and initializing API information
    const apiKey = import.meta.env.VITE_API_KEY; // Hidden API Key for security purposes
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    // Function to handle sending messages
    const functionality = () => {
        if (messageBar.value.trim().length > 0) {
            
            // Display the user's message
            const userMessage = `
                <div class="user-response entity">
                    <img src="/user.png" alt="User">
                    <span>${messageBar.value}</span>
                </div>
            `;
            messageWrapper.insertAdjacentHTML('beforeend', userMessage);

            // Define request options
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: messageBar.value }]
                    }]
                }),
            };

            // Fetch data from the Gemini API
            fetch(API_URL, requestOptions)
                .then(res => {
                    if (!res.ok) {
                        return res.text().then(text => {
                            throw new Error(`Network response was not ok: ${text}`);
                        });
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);

                    // Extract the bot's response from the API response
                    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

                    // Display the bot's message
                    const botMessage = `
                        <div class="dialogo-response entity">
                            <img src="/dialogo.png" alt="Bot">
                            <span>${botReply}</span>
                        </div>
                    `;
                    messageWrapper.insertAdjacentHTML('beforeend', botMessage);
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);

                    // Display an error message
                    const errorMessage = `
                        <div class="dialogo-response entity">
                            <img src="/dialogo.png" alt="Bot">
                            <span>Sorry, there was an error processing your request. Please try again later.</span>
                        </div>
                    `;
                    messageWrapper.insertAdjacentHTML('beforeend', errorMessage);
                });

            // Clear the message bar
            messageBar.value = "";
        }
    };

    // Button click functionality
    sendBtn.addEventListener('click', functionality);

    // Enter key functionality
    messageBar.addEventListener('keydown', (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            functionality();
        }
    });
};

export default sendMessage;
