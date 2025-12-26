/**
 * Setup form submission for the contact form.
 * Debug-enabled version
 */
export function setupFormHandler() {
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  if (!form || !submitButton || !formStatus) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log('Form submit intercepted!'); // DEBUG

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.classList.remove('text-green-500', 'text-red-500');

    try {
      const formData = new FormData(form);

      // 1. Check if hCaptcha script is even loaded yet
      if (typeof hcaptcha === 'undefined') {
        throw new Error('Security check is still loading. Please wait a moment and try again.');
      }

      // 2. Manually get the token from hCaptcha
      const hCaptchaToken = hcaptcha.getResponse();

      // 3. Check if the user actually did the captcha
      if (!hCaptchaToken) {
        throw new Error('Captcha missing. Please complete verification.');
      }

      // 4. Append it to your FormData object
      formData.append('h-captcha-response', hCaptchaToken);

      const serializedBody = Array.from(formData.entries())
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      console.log('Serialized form data with token:', serializedBody); // DEBUG

      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: serializedBody,
      });

      console.log('API response status:', apiResponse.status); // DEBUG
      const result = await apiResponse.json();
      console.log('API response JSON:', result); // DEBUG

      if (result.success) {
        formStatus.textContent = result.message;
        formStatus.classList.add('text-green-500');
        form.reset();
        hcaptcha.reset();
      } else {
        throw new Error(result.message || 'Server returned an error.');
      }
    } catch (error) {
      console.error('Form handler error:', error); // DEBUG
      formStatus.textContent = error instanceof Error ? error.message : 'A network error occurred.';
      formStatus.classList.add('text-red-500');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}
