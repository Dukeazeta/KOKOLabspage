document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('appDetailsModal');
    const closeBtn = document.querySelector('.close-modal');
    const detailsBtns = document.querySelectorAll('.details-btn');

    // Close modal when clicking the X button
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

    // Open modal when clicking Details button
    detailsBtns.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const appCard = this.closest('.app-card');
            
            // Get app details from the card
            const appName = appCard.querySelector('h3').textContent;
            const appDescription = appCard.querySelector('p').textContent;
            const appIcon = appCard.querySelector('.app-icon img').src;
            const version = appCard.querySelector('.version').textContent.trim();
            
            // Get screenshots
            const screenshots = Array.from(appCard.querySelectorAll('.hidden-screenshots img')).map(img => img.src);
            
            // Populate modal with app details
            document.getElementById('modalAppName').textContent = appName;
            document.getElementById('modalAppDescription').textContent = appDescription;
            document.getElementById('modalAppIcon').src = appIcon;
            document.getElementById('modalAppVersion').textContent = version;
            document.getElementById('modalLastUpdate').textContent = 'January 2025';
            
            // Populate screenshots gallery
            const screenshotsContainer = document.getElementById('modalScreenshots');
            screenshotsContainer.innerHTML = '';
            screenshots.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `${appName} Screenshot`;
                img.className = 'modal-screenshot';
                img.onclick = function() {
                    // Create fullscreen preview
                    const preview = document.createElement('div');
                    preview.className = 'screenshot-preview';
                    preview.innerHTML = `
                        <div class="preview-content">
                            <img src="${src}" alt="${appName} Screenshot">
                            <button class="close-preview">&times;</button>
                        </div>
                    `;
                    document.body.appendChild(preview);
                    
                    // Close preview handlers
                    preview.onclick = function(e) {
                        if (e.target === preview || e.target.className === 'close-preview') {
                            preview.remove();
                        }
                    };
                };
                screenshotsContainer.appendChild(img);
            });
            
            // Update download button
            document.getElementById('modalDownloadBtn').href = 
                appCard.querySelector('.download-btn').href;
            
            // Show modal
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
        }
    });
});
