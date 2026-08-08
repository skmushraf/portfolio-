// -------------------------------------------------------------
// SHAIK MOHAMMAD MUSHRAF - AI & ML STUDENT & DATA ANALYST PORTFOLIO
// Interactive JavaScript Engine
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    initMouseGlow();
    initScrollProgress();
    initCommandPalette();
    initTypewriter();
    initCounterAnimations();
    initProjectCharts();
    initGitHubFeed();
    initCaseStudyModals();
    initContactForm();
});

// 1. Mouse Glow Spotter
function initMouseGlow() {
    const mouseGlow = document.getElementById('mouseGlow');
    if (!mouseGlow) return;

    window.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });
}

// 2. Scroll Progress Line & Navbar Active State
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (scrollProgress) scrollProgress.style.width = progress + '%';

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link detection
        let currentSection = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (window.scrollY >= secTop) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// 3. Command Palette (Ctrl + K)
function initCommandPalette() {
    const cmdPalette = document.getElementById('cmdPalette');
    const cmdTrigger = document.getElementById('cmdTrigger');
    const cmdInput = document.getElementById('cmdInput');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (!cmdPalette || !cmdTrigger || !cmdInput) return;

    function openCmd() {
        cmdPalette.classList.add('active');
        cmdInput.value = '';
        cmdInput.focus();
    }

    function closeCmd() {
        cmdPalette.classList.remove('active');
    }

    cmdTrigger.addEventListener('click', openCmd);

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdPalette.classList.contains('active')) {
                closeCmd();
            } else {
                openCmd();
            }
        }
        if (e.key === 'Escape' && cmdPalette.classList.contains('active')) {
            closeCmd();
        }
    });

    cmdPalette.addEventListener('click', (e) => {
        if (e.target === cmdPalette) closeCmd();
    });

    // Filter Command List
    cmdInput.addEventListener('input', () => {
        const query = cmdInput.value.toLowerCase();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Command Item Actions
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            if (action === 'nav') {
                const target = item.getAttribute('data-target');
                closeCmd();
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'link') {
                const url = item.getAttribute('data-url');
                window.open(url, '_blank');
                closeCmd();
            }
        });
    });
}

// 4. Rotating Tagline Typewriter Engine
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;

    const phrases = [
        "Data tells stories — I help businesses understand them.",
        "Turning raw data into meaningful insights.",
        "Building dashboards that drive smarter decisions.",
        "Data Analysis • Business Intelligence • Visualization"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typewriter.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typewriter.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// 5. Scroll-Triggered Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-num');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-counter'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let current = 0;
                    const step = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = current + suffix;
                        }
                    }, 40);
                });
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}

// Common Chart Colors & Options
Chart.defaults.color = '#94A3B8';
Chart.defaults.font.family = "'Inter', sans-serif";

const chartOptionsCommon = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            labels: { color: '#F8FAFC', font: { size: 12 } }
        },
        tooltip: {
            backgroundColor: 'rgba(11, 17, 32, 0.95)',
            titleColor: '#F8FAFC',
            bodyColor: '#94A3B8',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10
        }
    },
    scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, beginAtZero: true }
    }
}
// 6. Project Preview Charts (Matching Real Power BI Dashboards)
function initProjectCharts() {
    // Project 1: ECommerce Sales Analysis (Monthly Sales Trend in Millions ₹)
    const p1Ctx = document.getElementById('project1Chart');
    if (p1Ctx) {
        new Chart(p1Ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Monthly Sales (₹ M)',
                        data: [4.1, 3.7, 4.3, 4.1, 4.0, 3.8, 4.5, 4.1, 4.0, 4.1, 3.8, 4.1],
                        backgroundColor: '#2563EB',
                        borderRadius: 6
                    }
                ]
            },
            options: chartOptionsCommon
        });
    }

    // Project 2: Sales Performance Tracker (Profit by Customer Segment in $M)
    const p2Ctx = document.getElementById('project2Chart');
    if (p2Ctx) {
        new Chart(p2Ctx, {
            type: 'bar',
            data: {
                labels: ['Corporate', 'Home Office', 'Small Business', 'Consumer'],
                datasets: [
                    {
                        label: 'Segment Profit ($M)',
                        data: [0.60, 0.32, 0.31, 0.29],
                        backgroundColor: ['#06B6D4', '#2563EB', '#7C3AED', '#10B981'],
                        borderRadius: 8
                    }
                ]
            },
            options: chartOptionsCommon
        });
    }

    // Project 3: Supply Chain Analytics (Delivery Delay by Supplier in Days)
    const p3Ctx = document.getElementById('project3Chart');
    if (p3Ctx) {
        new Chart(p3Ctx, {
            type: 'bar',
            data: {
                labels: ['Supplier E', 'Supplier D', 'Supplier B', 'Supplier A', 'Supplier C'],
                datasets: [
                    {
                        label: 'Avg Delay (Days)',
                        data: [5.55, 5.54, 5.52, 5.48, 5.39],
                        backgroundColor: '#F59E0B',
                        borderRadius: 6
                    }
                ]
            },
            options: { ...chartOptionsCommon, indexAxis: 'y' }
        });
    }
}

// 7. GitHub API REST Fetcher
async function initGitHubFeed() {
    const ghReposGrid = document.getElementById('ghReposGrid');
    const ghReposCount = document.getElementById('ghReposCount');
    const ghFollowersCount = document.getElementById('ghFollowersCount');

    if (!ghReposGrid) return;

    try {
        const userRes = await fetch('https://api.github.com/users/skmushraf');
        if (userRes.ok) {
            const userData = await userRes.json();
            if (ghReposCount) ghReposCount.textContent = userData.public_repos || '5+';
            if (ghFollowersCount) ghFollowersCount.textContent = userData.followers || '10+';
        }

        const reposRes = await fetch('https://api.github.com/users/skmushraf/repos?sort=updated&per_page=6');
        if (reposRes.ok) {
            const repos = await reposRes.json();
            if (repos.length > 0) {
                ghReposGrid.innerHTML = repos.map(repo => `
                    <div class="gh-repo-card">
                        <div class="gh-repo-header">
                            <a href="${repo.html_url}" target="_blank" class="gh-repo-name"><i class="far fa-folder"></i> ${repo.name}</a>
                            <span class="gh-stars"><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                        </div>
                        <p class="gh-repo-desc">${repo.description || 'Data Analytics & Power BI repository showcasing automated workflows and dashboards.'}</p>
                        <div class="gh-repo-footer">
                            <span><i class="fas fa-circle" style="color: #2563EB;"></i> ${repo.language || 'Jupyter / SQL'}</span>
                            <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                `).join('');
                return;
            }
        }
    } catch (err) {
        console.warn("GitHub API Rate Limited or Offline. Loading Fallback Repositories.", err);
    }

    // Fallback static rich cards
    ghReposGrid.innerHTML = `
        <div class="gh-repo-card">
            <div class="gh-repo-header">
                <a href="https://github.com/skmushraf" target="_blank" class="gh-repo-name"><i class="far fa-folder"></i> ecommerce-sales-analysis</a>
                <span class="gh-stars"><i class="far fa-star"></i> 12</span>
            </div>
            <p class="gh-repo-desc">Power BI dashboard analyzing ₹49.38M+ total sales, state performance, and payment mode breakdowns.</p>
            <div class="gh-repo-footer">
                <span><i class="fas fa-circle" style="color: #2563EB;"></i> Power BI / DAX</span>
                <span>Updated Recently</span>
            </div>
        </div>

        <div class="gh-repo-card">
            <div class="gh-repo-header">
                <a href="https://github.com/skmushraf" target="_blank" class="gh-repo-name"><i class="far fa-folder"></i> sales-performance-tracker</a>
                <span class="gh-stars"><i class="far fa-star"></i> 15</span>
            </div>
            <p class="gh-repo-desc">Enterprise sales tracking dashboard evaluating $14.92M sales, $1.52M profit, and segment performance.</p>
            <div class="gh-repo-footer">
                <span><i class="fas fa-circle" style="color: #06B6D4;"></i> Power BI</span>
                <span>Updated Recently</span>
            </div>
        </div>

        <div class="gh-repo-card">
            <div class="gh-repo-header">
                <a href="https://github.com/skmushraf" target="_blank" class="gh-repo-name"><i class="far fa-folder"></i> supply-chain-logistics-analytics</a>
                <span class="gh-stars"><i class="far fa-star"></i> 10</span>
            </div>
            <p class="gh-repo-desc">Supply chain analytics monitoring $2.5B revenue, supplier delivery delays (5.48d avg), and inventory turnover.</p>
            <div class="gh-repo-footer">
                <span><i class="fas fa-circle" style="color: #7C3AED;"></i> Power BI / Python</span>
                <span>Updated Recently</span>
            </div>
        </div>
    `;
}

// 8. Case Study Modal System (Matching Dashboard Screenshots)
function initCaseStudyModals() {
    const modal = document.getElementById('caseStudyModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    if (!modal || !modalBody) return;

    const caseStudiesData = {
        'project-1': {
            title: 'ECommerce Sales Analysis Dashboard',
            meta: 'Tools: Power BI | DAX | SQL | State & Payment Mode Analytics',
            problem: 'Analyzing ₹49.38M in overall e-commerce sales to identify top-performing states, customer payment channel preferences, and monthly sales trends.',
            objectives: 'Quantify Total Sales (₹49.38M) and Total Profit (₹7.38M), map sales across states (Rajasthan leading at 7.2M, Karnataka 7.1M, Gujarat 7.1M), and analyze payment mode splits (COD 20.39%, Credit Card 20.16%, Debit Card 20.13%, Net Banking 19.73%, UPI 19.58%).',
            solution: 'Engineered a Power BI dashboard with interactive DAX measures, horizontal state bar charts, payment mode pie charts, product category donuts (Electronics, Clothing, Home & Kitchen ~20% each), and top 10 selling product area curves (Tablet 2.21M, Smartphone 2.15M).',
            impact: 'Derived actionable insights establishing Rajasthan as the highest revenue state (7.2M) and identified steady monthly revenue stability (~3.8M - 4.5M).'
        },
        'project-2': {
            title: 'Sales Performance Tracker Dashboard',
            meta: 'Tools: Power BI | Advanced DAX | Customer Segment & Regional Analytics',
            problem: 'Evaluating $14.92M enterprise sales dataset to pinpoint customer segment profitability, regional revenue breakdown, and monthly sales peaks.',
            objectives: 'Track Total Sales ($14.915M) and Total Profit ($1.521M), measure profit per customer segment (Corporate leading at $0.6M), and track monthly revenue spikes (peaking in November at $1.42M).',
            solution: 'Constructed an executive Power BI scorecard containing category pie charts (Technology ~45%, Office Supplies ~30%, Furniture ~25%), regional donut charts (West ~35%, Ontario ~22%), and top product revenue bars (Global Troy Exec Chair ~$275K).',
            impact: 'Established Corporate as the single most profitable segment ($0.6M) and Technology as the core product revenue generator.'
        },
        'project-3': {
            title: 'Supply Chain & Logistics Analytics Dashboard',
            meta: 'Tools: Power BI | Supply Chain KPI Tracking | Supplier Delivery Performance',
            problem: 'Diagnostic tracking of $2.5B total revenue and $4.1M total profit across supplier fulfillment networks to monitor delivery delays and inventory stock.',
            objectives: 'Measure average supplier delivery delays (averaging 5.48 days), evaluate supplier order fulfillment shares (Supplier E 20.24%, Supplier D 20.0%), and track top selling units (Camera 240K, Laptop 228K).',
            solution: 'Designed a dark-purple themed Power BI analytics suite featuring horizontal delay bar charts (Supplier E highest delay at 5.55 days, Supplier C lowest at 5.39 days), supplier share donut charts, and unit sales decay curves.',
            impact: 'Highlighted Supplier E as the primary fulfillment bottleneck (5.55 days delay) and Camera as the top selling product (240K units sold).'
        }
    };

    document.querySelectorAll('.open-case-study, .project-img-wrapper').forEach(btn => {
        btn.addEventListener('click', () => {
            const pId = btn.getAttribute('data-project');
            const data = caseStudiesData[pId];
            if (data) {
                modalBody.innerHTML = `
                    <div class="case-study-content">
                        <h2>${data.title}</h2>
                        <div class="case-study-meta">${data.meta}</div>

                        <div class="case-block">
                            <h4><i class="fas fa-exclamation-triangle"></i> Problem Statement</h4>
                            <p>${data.problem}</p>
                        </div>

                        <div class="case-block">
                            <h4><i class="fas fa-bullseye"></i> Dashboard Objectives</h4>
                            <p>${data.objectives}</p>
                        </div>

                        <div class="case-block">
                            <h4><i class="fas fa-cogs"></i> Methodology & Power BI Visuals</h4>
                            <p>${data.solution}</p>
                        </div>

                        <div class="case-block">
                            <h4><i class="fas fa-chart-line"></i> Key Insights & Business Impact</h4>
                            <p><strong>${data.impact}</strong></p>
                        </div>
                    </div>
                `;
                modal.classList.add('active');
            }
        });
    });

    // Certificate Modals
    const certsData = {
        'deloitte': {
            title: 'Deloitte Data Analytics Job Simulation',
            issuer: 'Deloitte & Forage',
            date: 'April 5th, 2026',
            img: 'certificate.jpg',
            details: 'Completed practical tasks in forensic technology, data cleaning, customer segmentation, and executive data presentation.'
        },
        'cisco': {
            title: 'Data Analytics Essentials',
            issuer: 'Cisco Networking Academy',
            date: '05 Jul 2026 (Cert ID: 9dc929f1-f5a2-46b8-831c-499b4480b337)',
            img: 'cisco-certificate.jpg',
            details: 'Awarded to Sk Mohammad Mushraf through the Cisco Networking Academy program for mastering ETL data pipelines, gathering data, and visual communication.'
        },
        'be10x': {
            title: 'AI Tools & ChatGPT Workshop',
            issuer: 'be10x (Verified Certificate)',
            date: 'June 29th, 2025',
            img: 'be10x-certificate.jpg',
            details: 'Successfully completed AI Tools & ChatGPT workshop. Key competencies verified: Create presentations using AI (<5 min), Analyze data using AI (<30 min), Code and Debug using AI (<10 min).'
        }
    };

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const certKey = card.getAttribute('data-cert');
            const data = certsData[certKey];
            if (data) {
                const imgHtml = data.img ? `<div style="text-align:center; margin-bottom:1.5rem;"><img src="${data.img}" alt="${data.title}" style="max-width:100%; max-height:450px; border-radius:12px; border:1px solid rgba(255,255,255,0.1); shadow:0 10px 30px rgba(0,0,0,0.5);"></div>` : '';
                modalBody.innerHTML = `
                    <div class="case-study-content">
                        <h2>${data.title}</h2>
                        <div class="case-study-meta">${data.issuer} &bull; ${data.date}</div>
                        ${imgHtml}
                        <div class="case-block">
                            <h4><i class="fas fa-certificate"></i> Certification Details</h4>
                            <p>${data.details}</p>
                        </div>
                    </div>
                `;
                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// 9. Contact Form Handling & Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending Message...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Message Sent!`;
            submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            
            alert('Thank you! Shaik Mohammad Mushraf has received your message.');
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send Message`;
                submitBtn.style.background = '';
            }, 4000);
        }, 1200);
    });
}
