// Chart.js configurations for the AI research site

// Tooltip helper functions
const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
        return label.join(' ');
    }
    return label;
};

const wrapLabel = (label) => {
    const maxLength = 16;
    if (typeof label !== 'string' || label.length <= maxLength) return label;
    
    const words = label.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine = (currentLine + ' ' + word).trim();
        }
    });
    lines.push(currentLine.trim());
    return lines;
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Challenges Chart
    const desafiosLabels = ['Sesgos Algorítmicos', 'Manipulación y "Alucinaciones"', 'Privacidad y Protección de Datos', 'Falta de Transparencia', 'Autonomía del Investigador'];
    const desafiosChartCtx = document.getElementById('desafiosChart').getContext('2d');
    new Chart(desafiosChartCtx, {
        type: 'bar',
        data: {
            labels: desafiosLabels.map(wrapLabel),
            datasets: [{
                label: 'Nivel de Riesgo Percibido',
                data: [90, 85, 80, 78, 70],
                backgroundColor: '#2E86C1',
                borderColor: '#85C1E9',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    ticks: { color: 'white', font: { weight: 'bold' } }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: 'white', font: { size: 12 } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { 
                    callbacks: { title: tooltipTitleCallback },
                    backgroundColor: '#1f2937',
                    titleColor: '#ffffff',
                    bodyColor: '#dddddd',
                }
            }
        }
    });

    // Limitations Chart (Radar)
    const limitacionesChartCtx = document.getElementById('limitacionesChart').getContext('2d');
    new Chart(limitacionesChartCtx, {
        type: 'radar',
        data: {
            labels: ['Precisión de Información', 'Creatividad / Personalización', 'Captura de Matices', 'Facilidad de Uso', 'Ahorro de Tiempo'],
            datasets: [
                {
                    label: 'LLMs (ChatGPT)',
                    data: [65, 75, 50, 90, 85],
                    fill: true,
                    backgroundColor: 'rgba(255, 160, 0, 0.2)',
                    borderColor: 'rgb(255, 160, 0)',
                    pointBackgroundColor: 'rgb(255, 160, 0)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 160, 0)'
                },
                {
                    label: 'Herramientas de Presentación (Gamma)',
                    data: [80, 55, 60, 80, 75],
                    fill: true,
                    backgroundColor: 'rgba(46, 134, 193, 0.2)',
                    borderColor: 'rgb(46, 134, 193)',
                    pointBackgroundColor: 'rgb(46, 134, 193)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(46, 134, 193)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                borderWidth: 3
              }
            },
            scales: {
                r: {
                    angleLines: { color: '#d1d5db' },
                    grid: { color: '#e5e7eb' },
                    pointLabels: {
                        font: { size: 12, weight: 'bold' },
                        color: '#4b5563'
                    },
                    ticks: {
                       color: '#6b7280',
                       backdropColor: 'rgba(255, 255, 255, 0.75)'
                    }
                }
            },
            plugins: {
                tooltip: { callbacks: { title: tooltipTitleCallback } },
                legend: {
                    labels: {
                        color: '#374151',
                        font: { weight: 'bold' }
                    }
                }
            }
        }
    });

    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            });
        });
    }

    // Enhanced smooth scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply observer to all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

    // Hero section should be visible immediately
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Professional loading state for charts
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.classList.add('chart-loading');
        setTimeout(() => {
            container.classList.remove('chart-loading');
        }, 1000);
    });

    // Add professional hover effects to cards
    document.querySelectorAll('.bg-white').forEach(card => {
        if (card.closest('section')) {
            card.classList.add('card-hover');
        }
    });

    // Stats counter animation (simple version)
    const statsElements = document.querySelectorAll('.stat-item');
    statsElements.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
    });

    // Professional table enhancements
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        table.classList.add('professional-table');
        
        // Add hover effects to rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.transform = 'scale(1.01)';
            });
            row.addEventListener('mouseleave', () => {
                row.style.transform = 'scale(1)';
            });
        });
    });

    // Download button functionality (placeholder)
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Descargar')) {
            button.addEventListener('click', () => {
                // Placeholder for download functionality
                alert('Funcionalidad de descarga en desarrollo. Contacta al equipo por email para obtener los recursos.');
            });
        }
    });

    // Add section title styling
    document.querySelectorAll('h3').forEach(title => {
        if (title.closest('section') && title.classList.contains('text-center')) {
            title.classList.add('section-title');
        }
    });
});
