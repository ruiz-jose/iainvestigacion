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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
