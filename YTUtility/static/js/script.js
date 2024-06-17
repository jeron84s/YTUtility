$('#downloadForm').submit(function(e) {
    e.preventDefault();
    const url = $('#url').val();
    const format = $('#format').val();
    $.ajax({
        type: 'POST',
        url: '/download',
        contentType: 'application/json',
        data: JSON.stringify({url: url, format: format}),
        success: function(response) {
            $('#message').html(`<a href="/downloads/${response.playlist_id}/">Download Files</a>`);
        },
        error: function(err) {
            $('#message').text('Error downloading video/playlist');
        }
    });
});
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch__checkbox');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});
// scripts.js

/*document.addEventListener('DOMContentLoaded', () => {
    const loaderContainer = document.querySelector('.loader-container');

    // Function to show loader
    function showLoader() {
        loaderContainer.style.display = 'flex'; // Show loader
    }

    // Function to hide loader
    function hideLoader() {
        loaderContainer.style.display = 'none'; // Hide loader
    }

    // Example usage: Simulate a process that takes some time
    function simulateProcess() {
        showLoader(); // Show loader when process starts

        // Simulate a delay (e.g., fetching data, processing data)
        setTimeout(() => {
            // Process completed
            hideLoader(); // Hide loader when process completes
        }, 3000); // Example: Simulate a 3-second process
    }

    // Example usage: Call simulateProcess() when needed
    simulateProcess(); // Call this function when you want to start the process
});*/
