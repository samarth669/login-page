document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        console.log('Submitting data:', { email, password });  // For debugging in console

        try {
            const response = await fetch('https://samarth.unaux.com/register.php', {  // Replace with your actual domain
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Server response:', data);  // For debugging

            if (data.success) {
                alert('Signup successful! Please log in.');
                form.reset();
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Signup failed. Try a different email.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred: ' + error.message);
        }
    });
});
