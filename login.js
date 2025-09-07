document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        console.log('Logging in with:', { email });  // For debugging

        try {
            const response = await fetch('https://samarth.unaux.com/login.php', {  // Replace with your actual domain
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Server response:', data);

            if (data.success) {
                alert('Login successful!');
                window.location.href = 'dashboard.html';  // Replace with your dashboard page
            } else {
                alert(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred: ' + error.message);
        }
    });
});
