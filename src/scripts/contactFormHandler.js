/**
 * Setup form submission for the contact form.
 */
export function setupFormHandler() {
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  if (!form || !submitButton || !formStatus) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.classList.remove('text-green-500', 'text-red-500');

    try {
      // 1. Check if hCaptcha script is loaded
      if (typeof hcaptcha === 'undefined') {
        throw new Error('Security check is still loading. Please wait a moment.');
      }

      // 2. Get the token
      const hCaptchaToken = hcaptcha.getResponse();

      // 3. Verify user completed captcha
      if (!hCaptchaToken) {
        throw new Error('Please complete the captcha verification.');
      }

      // 4. Build a clean JSON payload
      const formData = new FormData(form);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        captcha: hCaptchaToken, // This matches the 'captcha' variable in your contact.js
      };

      // 5. Send as JSON
      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      const result = await apiResponse.json();

      if (apiResponse.ok && result.success) {
        formStatus.textContent = result.message || 'Message sent successfully!';
        formStatus.classList.add('text-green-500');
        form.reset();
        hcaptcha.reset();
      } else {
        // Handle 403 (Captcha fail) or 500 (Mail fail)
        throw new Error(result.message || 'Server returned an error.');
      }
    } catch (error) {
      console.error('Form handler error:', error);
      formStatus.textContent = error instanceof Error ? error.message : 'A network error occurred.';
      formStatus.classList.add('text-red-500');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}