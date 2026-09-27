// CHATBOT WIDGET JS STARTED

let freshFindChatbotResponses = [];

function renderChatbotWidget() {
    const chatbotPlaceholder = document.getElementById("chatbotPlaceholder");

    if (!chatbotPlaceholder) {
        return;
    }

    chatbotPlaceholder.innerHTML = `
        <button type="button" class="chatbotLauncher" id="chatbotLauncher" aria-label="Open chat assistant">
            <i class="fa-solid fa-comment-dots"></i>
        </button>
        <div class="chatbotPanel" id="chatbotPanel">
            <div class="chatbotHeader">
                <span>FreshFind Assistant</span>
                <button type="button" class="chatbotCloseButton" id="chatbotCloseButton" aria-label="Close chat">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="chatbotMessages" id="chatbotMessages"></div>
            <div class="chatbotQuickReplies" id="chatbotQuickReplies"></div>
            <form class="chatbotInputRow" id="chatbotInputForm">
                <input type="text" class="chatbotInput" id="chatbotInput" placeholder="Ask a question...">
                <button type="submit" class="chatbotSendButton" aria-label="Send">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    `;

    const launcher = document.getElementById("chatbotLauncher");
    const panel = document.getElementById("chatbotPanel");
    const closeButton = document.getElementById("chatbotCloseButton");
    const messages = document.getElementById("chatbotMessages");
    const quickReplies = document.getElementById("chatbotQuickReplies");
    const inputForm = document.getElementById("chatbotInputForm");
    const input = document.getElementById("chatbotInput");

    launcher.addEventListener("click", function () {
        panel.classList.toggle("chatbotPanelOpen");
    });

    closeButton.addEventListener("click", function () {
        panel.classList.remove("chatbotPanelOpen");
    });

    function addMessage(text, sender) {
        const bubble = document.createElement("div");
        bubble.classList.add("chatbotBubble", sender === "user" ? "chatbotBubbleUser" : "chatbotBubbleBot");
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function findResponse(userText) {
        const lowerText = userText.toLowerCase();

        const match = freshFindChatbotResponses.find(function (entry) {
            return entry.keywords.some(function (keyword) {
                return lowerText.includes(keyword.toLowerCase());
            });
        });

        if (match) {
            return match.answer;
        }

        const fallback = freshFindChatbotResponses.find(function (entry) {
            return entry.id === "fallback";
        });

        return fallback ? fallback.answer : "Sorry, I'm not sure about that.";
    }

    function handleUserMessage(text) {
        const trimmed = text.trim();

        if (trimmed === "") {
            return;
        }

        addMessage(trimmed, "user");

        setTimeout(function () {
            addMessage(findResponse(trimmed), "bot");
        }, 400);
    }

    inputForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleUserMessage(input.value);
        input.value = "";
    });

    fetchJSON("data/chatbot.json").then(function (data) {
        freshFindChatbotResponses = data.responses;

        addMessage("Hi! I'm the FreshFind assistant. Ask me anything, or tap a question below.", "bot");

        const suggestedQuestions = freshFindChatbotResponses.filter(function (entry) {
            return entry.question !== null;
        }).slice(0, 4);

        suggestedQuestions.forEach(function (entry) {
            const quickReplyButton = document.createElement("button");
            quickReplyButton.type = "button";
            quickReplyButton.classList.add("chatbotQuickReplyButton");
            quickReplyButton.textContent = entry.question;

            quickReplyButton.addEventListener("click", function () {
                handleUserMessage(entry.question);
            });

            quickReplies.appendChild(quickReplyButton);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderChatbotWidget();
});

// CHATBOT WIDGET JS ENDED