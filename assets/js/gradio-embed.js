// Gradio Embed System for Portfolio Items
document.addEventListener('DOMContentLoaded', function () {
    // Container để chứa Gradio apps
    let gradioContainer = null;

    // Mapping portfolio items với Gradio apps
    const gradioApps = {
        'img-1.jpg': {
            title: '3D Image Generation',
            src: 'https://vannguyen1214-direct-3d-one-image.hf.space',
            script: {
                type: 'module',
                src: 'https://gradio.s3-us-west-2.amazonaws.com/5.35.0/gradio.js'
            }
        },
        'img-2.jpg': {
            title: 'SwapFace',
            src: 'https://vannguyen1214-swapface.hf.space',
            script: {
                type: 'module',
                src: 'https://gradio.s3-us-west-2.amazonaws.com/5.35.0/gradio.js'
            }
        },
        'img-3.jpg': {
            title: 'Tryon Wigs',
            src: 'https://vannguyen1214-be-rejection.hf.space',
            script: {
                type: 'module',
                src: 'https://gradio.s3-us-west-2.amazonaws.com/5.35.0/gradio.js'
            }
        },
        'img-4.jpg': {
            title: 'Pandorama Room Layout',
            src: 'https://vannguyen1214-room-layout.hf.space',
            script: {
                type: 'module',
                src: 'https://gradio.s3-us-west-2.amazonaws.com/5.35.0/gradio.js'
            }
        },
        'img-5.jpg': {
            title: 'Fashion Shop',
            src: 'https://vannguyen1214-fashion-shop.hf.space',
            script: {
                type: 'module',
                src: 'https://gradio.s3-us-west-2.amazonaws.com/5.35.0/gradio.js'
            }
        },
        'img-6.jpg': {
            title: 'Depth vision',
            src: 'https://vannguyen1214-depth-all.hf.space',
            script: {
                type: 'module',
                src: 'https://gradio.s3-us-west-2.amazonaws.com/5.35.0/gradio.js'
            }
        }
    };

    // Tạo container cho Gradio apps
    function createGradioContainer() {
        if (!gradioContainer) {
            gradioContainer = document.createElement('div');
            gradioContainer.id = 'gradio-container';
            gradioContainer.style.cssText = `
                margin-top: 30px;
                padding: 20px;
                background: var(--card-bg, #ffffff);
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                border: 1px solid var(--border-color, #e0e0e0);
                display: none;
            `;

            // Thêm container vào sau portfolio section
            const portfolioSection = document.getElementById('portfolios');
            portfolioSection.parentNode.insertBefore(gradioContainer, portfolioSection.nextSibling);
        }
        return gradioContainer;
    }

    // Hiển thị Gradio app
    function showGradioApp(appConfig) {
        const container = createGradioContainer();

        // Clear previous content
        container.innerHTML = '';

        // Tạo title
        const title = document.createElement('h3');
        title.textContent = appConfig.title;
        title.style.cssText = `
            text-align: center;
            margin-bottom: 20px;
            color: var(--text-color, #333);
        `;

        // Tạo close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-color, #333);
            z-index: 10;
        `;
        closeBtn.onclick = hideGradioApp;

        // Tạo Gradio app (không cần tạo script vì đã pre-load)
        const gradioApp = document.createElement('gradio-app');
        gradioApp.src = appConfig.src;
        gradioApp.style.cssText = `
            width: 100%;
            height: 600px;
            border: none;
        `;

        // Thêm elements vào container
        container.style.position = 'relative';
        container.appendChild(closeBtn);
        container.appendChild(title);
        container.appendChild(gradioApp);

        // Hiển thị container
        container.style.display = 'block';

        // Scroll to container
        setTimeout(() => {
            container.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }

    // Ẩn Gradio app
    function hideGradioApp() {
        if (gradioContainer) {
            gradioContainer.style.display = 'none';
            gradioContainer.innerHTML = '';
        }
    }

    // Thêm event listeners cho portfolio links
    function attachPortfolioListeners() {
        const portfolioLinks = document.querySelectorAll('.portfolio-item .link');

        portfolioLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Tìm image trong cùng portfolio item
                const portfolioItem = this.closest('.portfolio-item');
                const img = portfolioItem.querySelector('img');

                if (img) {
                    const imgSrc = img.getAttribute('src');
                    const imgName = imgSrc.split('/').pop(); // Lấy tên file

                    const appConfig = gradioApps[imgName];

                    if (appConfig) {
                        showGradioApp(appConfig);
                    } else {
                        console.log('No Gradio app configured for:', imgName);
                        alert('Gradio app for this project is coming soon!');
                    }
                }
            });
        });
    }

    // Khởi tạo
    attachPortfolioListeners();

    // Thêm CSS cho responsive
    const style = document.createElement('style');
    style.textContent = `
        #gradio-container {
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            #gradio-container {
                margin: 20px 10px;
                padding: 15px;
            }
            
            #gradio-container gradio-app {
                height: 500px !important;
            }
        }
        
        #gradio-container button:hover {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
        }
    `;
    document.head.appendChild(style);
});
