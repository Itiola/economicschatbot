const chatForm = document.getElementById("chat-form");
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;

  appendMessage("user", question);
  userInput.value = "";

  appendMessage("bot", "Thinking...");

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question })
    });

    const data = await res.json();
    document.querySelector(".message.bot:last-child").textContent = data.response;
  } catch (err) {
    document.querySelector(".message.bot:last-child").textContent = "Something went wrong. Try again later.";
  }
});

function appendMessage(role, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", role);
  msgDiv.textContent = text;
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
