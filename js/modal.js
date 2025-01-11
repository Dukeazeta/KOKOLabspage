document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('appDetailsModal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    const closeBtn = modal.querySelector('.close-modal');
    if (!closeBtn) {
        console.error('Close button not found');
        return;
    }

    const detailsBtns = document.querySelectorAll('.details-btn');
    if (!detailsBtns.length) {
        console.error('No details buttons found');
        return;
    }

    // Close modal when clicking the X button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    // Open modal when clicking Details button
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                const appCard = this.closest('.app-card');
                if (!appCard) {
                    console.error('App card not found');
                    return;
                }

                // Get app details from the card
                const appName = appCard.querySelector('h3')?.textContent || 'App Name';
                const appDescription = appCard.querySelector('p')?.textContent || 'No description available';
                const appIcon = appCard.querySelector('.app-icon img')?.src || '';
                const version = appCard.querySelector('.version')?.textContent.trim() || 'v1.0.0';
                
                // Get screenshots
                const screenshots = Array.from(appCard.querySelectorAll('.hidden-screenshots img')).map(img => img.src);
                
                // Populate modal with app details
                const modalElements = {
                    name: document.getElementById('modalAppName'),
                    description: document.getElementById('modalAppDescription'),
                    icon: document.getElementById('modalAppIcon'),
                    version: document.getElementById('modalAppVersion'),
                    lastUpdate: document.getElementById('modalLastUpdate'),
                    screenshots: document.getElementById('modalScreenshots'),
                    downloadBtn: document.getElementById('modalDownloadBtn')
                };

                // Check if all required elements exist
                if (!Object.values(modalElements).every(el => el)) {
                    console.error('Some modal elements are missing');
                    return;
                }

                // Update modal content
                modalElements.name.textContent = appName;
                modalElements.description.textContent = appDescription;
                modalElements.icon.src = appIcon;
                modalElements.version.textContent = version;
                modalElements.lastUpdate.textContent = 'January 2025';

                // Clear and populate screenshots gallery
                modalElements.screenshots.innerHTML = '';
                screenshots.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `${appName} Screenshot`;
                    img.className = 'modal-screenshot';
                    img.addEventListener('click', function() {
                        createScreenshotPreview(src, appName);
                    });
                    modalElements.screenshots.appendChild(img);
                });

                // Update download button
                const downloadLink = appCard.querySelector('.download-btn')?.href;
                if (downloadLink) {
                    modalElements.downloadBtn.href = downloadLink;
                }

                // Show modal
                openModal();
            } catch (error) {
                console.error('Error opening modal:', error);
            }
        });
    });

    function createScreenshotPreview(src, appName) {
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
        preview.addEventListener('click', function(e) {
            if (e.target === preview || e.target.className === 'close-preview') {
                preview.remove();
            }
        });
    }
});
