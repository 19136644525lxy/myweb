// 导航栏滚动效果与平滑滚动
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('header, .post');

// 平滑滚动
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // 检查是否是锚点链接（以#开头）
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前活动状态
            link.classList.add('active');
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 计算目标位置（考虑导航栏高度）
                const targetPosition = targetElement.offsetTop - nav.offsetHeight - 20;
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // 对于非锚点链接（如外部链接或其他页面链接），不阻止默认行为
    });
});

// 滚动时更新活动导航项
window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - nav.offsetHeight - 80;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // 导航栏滚动效果
    if (window.scrollY > 150) {
        nav.classList.add('scrolled');
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        nav.classList.remove('scrolled');
        nav.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
    }
});

// 关于作者按钮动画
const aboutAuthorBtn = document.querySelector('.nav-link.about-author');
aboutAuthorBtn.addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 200);
});

// 黯蚀狂潮模态框控制
const darkTideBtn = document.getElementById('darkTideBtn');
const darkTideModal = document.getElementById('darkTideModal');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');

if (darkTideBtn) {
    darkTideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        darkTideModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeModalFunc() {
    if (darkTideModal) {
        darkTideModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModalFunc);
}

if (darkTideModal) {
    darkTideModal.addEventListener('click', (e) => {
        if (e.target === darkTideModal) {
            closeModalFunc();
        }
    });
}

// 按钮点击动画
document.querySelectorAll('.btn, .nav-link:not(.about-author)').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.tagName === 'A') this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            if (this.tagName === 'A') this.style.transform = '';
        }, 200);
    });
});

// 退出按钮点击事件（你可以在这里添加回退链接）
const exitBtn = document.getElementById('exitBtn');
if (exitBtn) {
    exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'https://www.mcmod.cn/modpack/963.html';
    });
}

// 回到顶部按钮功能
const goTopBtn = document.getElementById('go-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        goTopBtn.classList.add('show');
    } else {
        goTopBtn.classList.remove('show');
    }
});

if (goTopBtn) {
    goTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 主题切换功能
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme === 'auto' || !savedTheme ? systemTheme : savedTheme;
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateIcon(initialTheme);
})();

function setTheme(theme) {
    if (theme === 'auto') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', 'auto');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    updateIcon(theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'auto';
    let newTheme;

    if (currentTheme === 'light') {
        newTheme = 'dark';
    } else if (currentTheme === 'dark') {
        newTheme = 'auto';
    } else {
        newTheme = 'light';
    }

    setTheme(newTheme);
}

function updateIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = 'fa-solid ';
        if (theme === 'light') {
            themeIcon.className += 'fa-moon';
        } else if (theme === 'dark') {
            themeIcon.className += 'fa-sun';
        } else {
            themeIcon.className += 'fa-circle-half-stroke';
        }
    }
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (localStorage.getItem('theme') === 'auto') {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateIcon('auto');
    }
});

// 图片懒加载和放大功能
function enhanceContent() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const isInPostMediaOrHeader = img.closest('.post-media') || img.closest('header');
        if (isInPostMediaOrHeader) return;
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('data-zoomable')) {
            img.dataset.zoomable = 'true';
        }
    });

    const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    headers.forEach(header => {
        const elements = document.querySelectorAll(header);
        elements.forEach((element, index) => {
            if (element.closest('.post-media')) return;
            let headerText = element.textContent.trim().toLowerCase().replace(/\W+/g, '-');
            headerText = headerText.substring(0, 50);
            const id = `heading-${header}-${index + 1}-${headerText}`;
            if (!element.hasAttribute('id')) {
                element.setAttribute('id', id);
            }
        });
    });
}

// 侧边栏折叠/展开功能
function toggleSidebar() {
    const sidebar = document.getElementById('rightSidebar');
    const toggleIcon = document.getElementById('sidebarToggleIcon');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.classList.remove('fa-chevron-left');
        toggleIcon.classList.add('fa-chevron-right');
    } else {
        toggleIcon.classList.remove('fa-chevron-right');
        toggleIcon.classList.add('fa-chevron-left');
    }
}

// 截图展示滚筒功能
function initCarousel() {
    const carousel = document.querySelector('.carousel-slides');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!carousel || !prevBtn || !nextBtn || !indicatorsContainer) return;
    
    const slides = carousel.querySelectorAll('img');
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoPlayInterval;
    
    // 创建指示器
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
            resetAutoPlay();
        });
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    
    // 上一张按钮点击事件
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
        resetAutoPlay();
    });
    
    // 下一张按钮点击事件
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
        resetAutoPlay();
    });
    
    // 更新轮播状态
    function updateCarousel() {
        const slideWidth = carousel.clientWidth;
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 自动播放功能
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 3000); // 每3秒切换一次
    }
    
    // 重置自动播放
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', updateCarousel);
    
    // 开始自动播放
    startAutoPlay();
}

// 时间显示器功能
function initTimeDisplay() {
    const timeDateElement = document.querySelector('.time-date');
    const timeClockElement = document.querySelector('.time-clock');
    
    if (!timeDateElement || !timeClockElement) return;
    
    function updateTime() {
        // 创建北京时间对象（UTC+8）
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const beijingTime = new Date(utcTime + (8 * 60 * 60 * 1000));
        
        // 格式化日期
        const year = beijingTime.getFullYear();
        const month = String(beijingTime.getMonth() + 1).padStart(2, '0');
        const day = String(beijingTime.getDate()).padStart(2, '0');
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekday = weekdays[beijingTime.getDay()];
        
        // 格式化时间
        const hours = String(beijingTime.getHours()).padStart(2, '0');
        const minutes = String(beijingTime.getMinutes()).padStart(2, '0');
        const seconds = String(beijingTime.getSeconds()).padStart(2, '0');
        
        // 更新显示
        timeDateElement.textContent = `${year}年${month}月${day}日 ${weekday}`;
        timeClockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // 初始更新
    updateTime();
    
    // 每秒更新一次
    setInterval(updateTime, 1000);
}

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    enhanceContent();
    initCarousel();
    initTimeDisplay();
    
    // 其他初始化代码...
});
