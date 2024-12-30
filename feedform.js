const scriptURL = 'https://script.google.com/macros/s/AKfycbyTfZn8YsCOgqbp_xlAkwSytyHEXidEeLQQdvkYM9wA3BA7HflfuRgfMqHckk_hXGdQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

        // Set current timestamp when form loads
        document.addEventListener('DOMContentLoaded', function() {
            const timestampInput = document.getElementById('timestamp');
            const now = new Date();
            timestampInput.value = now.toLocaleString();
        });

        // Update timestamp when form is submitted
        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const timestampInput = document.getElementById('timestamp');
            const now = new Date();
            timestampInput.value = now.toLocaleString();
            // Add your form submission logic here
        });
