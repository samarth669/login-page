document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!email || !newPassword || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        console.log('Resetting for:', { email });  // For debugging

        try {
            const response = await fetch('https://samarth.unaux.com/reset.php', {  // Replace with your actual domain
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Server response:', data);

            if (data.success) {
                alert('Password reset successful! Please log in.');
                form.reset();
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Reset failed. Email not found.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred: ' + error.message);
        }
    });
});
