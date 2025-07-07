// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the toggle button from navbar
    const toggleButton = document.getElementById('darkModeToggle');
    
    if (!toggleButton) return;

    // Always default to light mode on page load
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Update button icon based on current theme
    updateToggleButton('light');

    // Toggle button click event
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button appearance
        updateToggleButton(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    function updateToggleButton(theme) {
        const img = toggleButton.querySelector('img');
        
        if (theme === 'dark') {
            img.src = 'assets/img/mode/light.png';
            img.alt = 'Switch to Light Mode';
        } else {
            img.src = 'assets/img/mode/dark.png';
            img.alt = 'Switch to Dark Mode';
        }
    }
});

// Smooth scroll enhancement for dark mode
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
