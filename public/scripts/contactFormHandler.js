// src/scripts/contactFormHandler.js
export function setupFormHandler() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');
  const submitButton = document.getElementById('submit-button');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      statusDiv.textContent = 'Please fill in all fields.';
      return;
    }

    submitButton.disabled = true;
    statusDiv.textContent = 'Sending...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON payload
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        statusDiv.textContent = json.message || 'Message sent successfully!';
        form.reset();
      } else {
        statusDiv.textContent = json.message || 'Something went wrong.';
      }
    } catch (err) {
      console.error('Form handler error:', err);
      statusDiv.textContent = 'Error sending message. Try again later.';
    } finally {
      submitButton.disabled = false;
    }
  });
}
