window.hCaptchaWidgetId = null;

// HCaptcha callback: Called by the hcaptcha script once loaded
window.hCaptchaLoaded = function() {
  const container = document.getElementById('h-captcha-container');
  const formStatus = document.getElementById('form-status');

  if (container && typeof hcaptcha !== 'undefined') {
    try {
      // Auto-render visible widget
      window.hCaptchaWidgetId = hcaptcha.render(container);
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Could not load CAPTCHA. Please refresh.';
        formStatus.classList.add('text-red-500');
      }
    }
  }
};

// Main form submission logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (event) => {
      // Stop the form from submitting normally (preventing page refresh)
      event.preventDefault();

      // Check if CAPTCHA widget is ready and completed
      if (typeof hcaptcha === 'undefined' || !window.hCaptchaWidgetId) {
        formStatus.textContent = 'CAPTCHA not loaded. Please wait.';
        formStatus.classList.add('text-red-500');
        return;
      }
      
      const token = hcaptcha.getResponse(window.hCaptchaWidgetId);
      
      if (!token) {
        formStatus.textContent = 'Please complete the visible CAPTCHA.';
        formStatus.classList.add('text-red-500');
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      formStatus.textContent = '';
      formStatus.classList.remove('text-green-500', 'text-red-500');

      try {
        const formData = new FormData(form);
        // Append the hCaptcha token for server-side verification
        formData.append('h-captcha-response', token);

        // Serialize data into URL-encoded format for the API endpoint
        const serializedBody = Array.from(formData.entries())
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
        
        const apiResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
          body: serializedBody, 
        });

        const result = await apiResponse.json();

        if (result.success) {
          formStatus.textContent = result.message; 
          formStatus.classList.add('text-green-500');
          form.reset(); 
        } else {
          throw new Error(result.message || 'The server returned an error.');
        }
      } catch (error) {
        // Display error message to the user
        formStatus.textContent = error instanceof Error ? error.message : 'A network error occurred.';
        formStatus.classList.add('text-red-500');
      } finally {
        // Always reset the CAPTCHA and button state
        if (window.hCaptchaWidgetId !== null) {
          hcaptcha.reset(window.hCaptchaWidgetId);
        }
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    });
  }
});
