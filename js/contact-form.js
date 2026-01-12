// Simple contact form handler using Formspree
// This version works with GitHub Pages as it doesn't require server-side code

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form elements
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const statusMessage = document.createElement('div');

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando...';

            try {
                // Send form data to our new API
                const data = Object.fromEntries(formData.entries());
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                // Handle response
                if (response.ok) {
                    showMessage('¡Mensaje enviado con éxito! Pronto nos pondremos en contacto contigo.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar el mensaje');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    function showMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create and show new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Add message after the form
        const form = document.getElementById('contactForm');
        if (form) {
            form.parentNode.insertBefore(messageDiv, form.nextSibling);
        }

        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
});
