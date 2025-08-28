document.addEventListener('DOMContentLoaded', function() {
    // FAQ 問答展開功能
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // 切換當前問題的活動狀態
                question.classList.toggle('active');
                
                // 獲取並切換答案的顯示狀態
                const answer = question.nextElementSibling;
                if (answer.classList.contains('show')) {
                    answer.classList.remove('show');
                } else {
                    answer.classList.add('show');
                }
            });
        });
    }
    
    // 滾動時導航欄效果
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // 影片播放按鈕效果
    const playButton = document.querySelector('.play-button');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (playButton && videoPlaceholder) {
        playButton.addEventListener('click', () => {
            // 這裡可以替換為實際的影片播放邏輯
            // 例如：創建一個iframe元素來嵌入YouTube影片
            const videoContainer = document.querySelector('.video-container');
            const videoId = 'your-video-id'; // 替換為實際的YouTube影片ID
            
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.border = 'none';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // 清空容器並添加iframe
            videoContainer.innerHTML = '';
            videoContainer.appendChild(iframe);
        });
    }
    
    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 響應式導航菜單
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // 點擊頁面其他地方關閉導航菜單
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('mobile-active')) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('mobile-active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });
    
    // 圖片延遲加載
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 動畫效果 - 滾動顯示元素
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const elementObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            elementObserver.observe(element);
        });
    }
    
    // 課程卡片懸停效果
    const courseCards = document.querySelectorAll('.course-card');
    
    if (courseCards.length > 0) {
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // 課程標籤切換功能
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const courseTabLinks = document.querySelectorAll('.course-tab-link');
    
    // 初始化：顯示第一個標籤內容
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons[0].classList.add('active');
        tabPanes[0].classList.add('active');
    }
    
    // 為標籤按鈕添加點擊事件
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 移除所有標籤和內容的活動狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 為當前點擊的標籤和對應內容添加活動狀態
            button.classList.add('active');
            tabPanes[index].classList.add('active');
        });
    });
    
    // 為課程卡片中的「了解更多」按鈕添加點擊事件
    courseTabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 獲取要顯示的標籤索引
            const tabIndex = link.getAttribute('data-tab');
            
            // 滾動到課程詳情區域
            const courseDetailSection = document.querySelector('.course-tabs');
            if (courseDetailSection) {
                courseDetailSection.scrollIntoView({ behavior: 'smooth' });
                
                // 延遲一下再切換標籤，確保滾動完成
                setTimeout(() => {
                    // 觸發對應標籤的點擊事件
                    if (tabButtons[tabIndex]) {
                        tabButtons[tabIndex].click();
                    }
                }, 500);
            }
        });
    });
});