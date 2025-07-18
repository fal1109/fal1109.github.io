let nameForm, messageForm;

document.addEventListener('DOMContentLoaded', function () {
    nameForm = document.getElementById('name-form');
    messageForm = document.getElementById('message-form');

    if (nameForm && messageForm) {
        messageForm.style.display = 'none';

        let username = '';

        nameForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = nameForm.querySelector('input[name="name"]');
            if (nameInput && nameInput.value.trim()) {
                username = nameInput.value.trim();
                nameForm.style.display = 'none';
                messageForm.style.display = '';
            }
        });

        messageForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const messageInput = messageForm.querySelector('textarea[name="message"]');
            const message = messageInput ? messageInput.value.trim() : '';
            if (!message) return;

            
            await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });

            messageForm.reset();
            alert('Message sent!');
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get all text inputs and textareas
        const inputs = form.querySelectorAll('input[type="text"], textarea');
        let content = '';
        inputs.forEach(input => {
            content += `${input.name || 'message'}: ${input.value}\n`;
        });

        if (!content.trim()) return;

        // Send to Discord webhook
        await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        // Optionally clear the form or show a message
        form.reset();
        alert('Message sent!');
    });
});