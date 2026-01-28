// VihaanBytes Official Website - JavaScript
// This file contains all interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('VihaanBytes Official website loaded successfully!');
    
    // Initialize all components
    initTypingAnimation();
    initChaptersToggle();
    initParticles();
    initChatbot();
    initSmoothScrolling();
    initAnimations();
});

// TYPING ANIMATION FOR HERO SECTION
function initTypingAnimation() {
    const typingLine = document.getElementById('typing-line-1');
    const lines = [
        "Learn Coding From Scratch",
        "HTML • CSS • JavaScript • Python",
        "AI Tools & Future Tech",
        "Welcome to VihaanBytes Official"
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentLine = lines[lineIndex];
        
        if (isDeleting) {
            // Deleting text
            typingLine.textContent = currentLine.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingLine.textContent = currentLine.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Check if we've finished typing the line
        if (!isDeleting && charIndex === currentLine.length) {
            // Pause at the end of the line
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 2000); // 2 second pause
            return;
        }
        
        // Check if we've finished deleting the line
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % lines.length; // Move to next line, loop back to first
        }
        
        // Set typing speed
        let speed = isDeleting ? 50 : 100;
        speed = isPaused ? 2000 : speed; // Longer pause at the end of line
        
        setTimeout(type, speed);
    }
    
    // Start typing animation after a short delay
    setTimeout(type, 1000);
}

// TOGGLE CHAPTERS (OPEN/CLOSE)
function initChaptersToggle() {
    const chapterHeaders = document.querySelectorAll('.chapter-header');
    
    chapterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const chapterCard = this.parentElement;
            const content = this.nextElementSibling;
            const toggleIcon = this.querySelector('.chapter-toggle i');
            
            // Close all other chapters
            document.querySelectorAll('.chapter-card').forEach(card => {
                if (card !== chapterCard) {
                    card.classList.remove('active');
                    card.querySelector('.chapter-content').style.maxHeight = null;
                    card.querySelector('.chapter-toggle i').className = 'fas fa-chevron-down';
                }
            });
            
            // Toggle current chapter
            chapterCard.classList.toggle('active');
            
            if (content.style.maxHeight) {
                // Chapter is open, so close it
                content.style.maxHeight = null;
                toggleIcon.className = 'fas fa-chevron-down';
            } else {
                // Chapter is closed, so open it
                content.style.maxHeight = content.scrollHeight + "px";
                toggleIcon.className = 'fas fa-chevron-up';
                
                // Scroll to the chapter if it's not fully visible
                setTimeout(() => {
                    chapterCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });
    
    // Open first chapter by default
    setTimeout(() => {
        if (chapterHeaders.length > 0) {
            chapterHeaders[0].click();
        }
    }, 1500);
}

// PARTICLE BACKGROUND
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(0, 243, 255, ${Math.random() * 0.5 + 0.1})`;
            this.glow = Math.random() * 5 + 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = this.glow;
            ctx.shadowColor = this.color;
        }
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 150);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Connect particles with lines
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
    
    resizeCanvas();
    createParticles();
    animateParticles();
}

// CHATBOT FUNCTIONALITY
function initChatbot() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    // AI Responses database
    const aiResponses = {
        greetings: [
            "Hello! I'm VihaanBytes AI Assistant. How can I help you learn coding today?",
            "Hi there! Ready to dive into the world of coding and technology?",
            "Welcome! I'm here to help you with HTML, CSS, JavaScript, Python, and AI concepts."
        ],
        html: [
            "HTML is the foundation of the web. It stands for HyperText Markup Language and provides the structure for web pages.",
            "HTML uses tags to define elements like headings, paragraphs, links, and images. Start with <!DOCTYPE html> to define an HTML5 document.",
            "Mastering semantic HTML is crucial for accessibility and SEO. Use tags like <header>, <nav>, <main>, and <footer> for better structure."
        ],
        css: [
            "CSS makes HTML beautiful! It stands for Cascading Style Sheets and controls the visual presentation of web pages.",
            "Learn Flexbox and CSS Grid for modern layouts. They make responsive design much easier than old float-based methods.",
            "CSS animations and transitions can bring your website to life. Use @keyframes for complex animations and transition for smooth state changes."
        ],
        javascript: [
            "JavaScript adds interactivity to websites. It's a versatile language that runs in the browser and on servers (with Node.js).",
            "Start with variables, functions, and DOM manipulation. Then move to more advanced topics like async/await and APIs.",
            "Modern JavaScript (ES6+) has great features like arrow functions, template literals, and destructuring that make coding more efficient."
        ],
        python: [
            "Python is known for its clean, readable syntax. It's great for beginners and used in web development, data science, AI, and more.",
            "Python's 'batteries included' philosophy means it has a rich standard library for almost any task you can think of.",
            "Start with basics like variables, loops, and functions. Then explore libraries like NumPy for data or Flask for web development."
        ],
        ai: [
            "AI is transforming technology! Machine learning lets computers learn from data without being explicitly programmed.",
            "Start with understanding different types of AI: narrow AI (like chatbots) vs general AI (theoretical). Most current AI is narrow AI.",
            "Tools like TensorFlow and PyTorch make AI development more accessible. OpenAI's APIs let you integrate AI into your applications easily."
        ],
        motivation: [
            "Remember: Every expert was once a beginner. The key is consistent practice and not giving up when things get challenging.",
            "Coding is like learning a language - it takes time and practice. Don't compare your chapter 1 to someone else's chapter 20!",
            "The best time to start coding was yesterday. The second best time is now. Start small, build projects, and keep learning!",
            "Debugging is where the real learning happens. Embrace errors as opportunities to understand how things work."
        ],
        future: [
            "The future belongs to those who can code and understand AI. These skills will be as fundamental as reading and writing.",
            "Technology evolves rapidly, but the fundamentals remain important. Master HTML, CSS, JS, and Python, then adapt to new tools.",
            "AI won't replace programmers, but programmers who use AI will replace those who don't. Learn to work with AI tools!"
        ],
        help: [
            "I can help you with HTML, CSS, JavaScript, Python, and AI concepts. What specific topic are you interested in?",
            "Try asking about a specific technology or concept, or click one of the suggestion buttons for quick answers!",
            "Need motivation? Just ask! Learning to code is a journey, and I'm here to help you along the way."
        ],
        default: [
            "That's an interesting question! As an AI focused on coding education, I can best help with HTML, CSS, JavaScript, Python, and AI topics.",
            "I'm not sure about that specific topic, but I can definitely help you with coding concepts and learning strategies!",
            "Try asking about web development, programming concepts, or how to get started with coding. I'm here to help you learn!"
        ]
    };
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageDiv.style.animation = 'message-fade 0.5s ease';
    }
    
    // Function to get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Function to generate AI response
    function generateAIResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        
        // Check for greetings
        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return getRandomResponse(aiResponses.greetings);
        }
        
        // Check for HTML questions
        if (input.includes('html')) {
            return getRandomResponse(aiResponses.html);
        }
        
        // Check for CSS questions
        if (input.includes('css') || input.includes('style')) {
            return getRandomResponse(aiResponses.css);
        }
        
        // Check for JavaScript questions
        if (input.includes('javascript') || input.includes('js') || input.includes('script')) {
            return getRandomResponse(aiResponses.javascript);
        }
        
        // Check for Python questions
        if (input.includes('python')) {
            return getRandomResponse(aiResponses.python);
        }
        
        // Check for AI questions
        if (input.includes('ai') || input.includes('artificial') || input.includes('machine learning') || input.includes('neural')) {
            return getRandomResponse(aiResponses.ai);
        }
        
        // Check for motivation
        if (input.includes('motivation') || input.includes('stuck') || input.includes('difficult') || input.includes('hard') || input.includes('give up')) {
            return getRandomResponse(aiResponses.motivation);
        }
        
        // Check for future
        if (input.includes('future') || input.includes('next') || input.includes('career') || input.includes('job')) {
            return getRandomResponse(aiResponses.future);
        }
        
        // Check for help
        if (input.includes('help') || input.includes('what can you do') || input.includes('assist')) {
            return getRandomResponse(aiResponses.help);
        }
        
        // Check for how to start
        if (input.includes('start') || input.includes('begin') || input.includes('learn') || input.includes('first')) {
            return "Start with HTML and CSS to understand web structure and styling. Then move to JavaScript for interactivity. Python is great for backend and AI. The key is to build projects as you learn!";
        }
        
        // Default response
        return getRandomResponse(aiResponses.default);
    }
    
    // Helper function to get a random response from an array
    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
    
    // Function to handle sending a message
    function sendMessage() {
        const userInput = chatInput.value.trim();
        
        if (userInput === '') return;
        
        // Add user message
        addMessage(userInput, true);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            // Generate and add AI response
            const aiResponse = generateAIResponse(userInput);
            addMessage(aiResponse, false);
        }, 800);
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add event listeners to suggestion buttons
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestion = this.textContent;
            chatInput.value = suggestion;
            sendMessage();
        });
    });
    
    // Add initial welcome message
    setTimeout(() => {
        addMessage("Feel free to ask me anything about coding, technology, or learning resources!", false);
    }, 2000);
}

// SMOOTH SCROLLING FOR INTERNAL LINKS
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// INITIALIZE ANIMATIONS ON SCROLL
function initAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('.section, .futuristic-card, .chapter-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .section, .futuristic-card, .chapter-card, .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.animated, .futuristic-card.animated, .chapter-card.animated, .contact-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .chapter-card:nth-child(1) { transition-delay: 0.1s; }
    .chapter-card:nth-child(2) { transition-delay: 0.2s; }
    .chapter-card:nth-child(3) { transition-delay: 0.3s; }
    .chapter-card:nth-child(4) { transition-delay: 0.4s; }
    .chapter-card:nth-child(5) { transition-delay: 0.5s; }
    
    .contact-card:nth-child(1) { transition-delay: 0.1s; }
    .contact-card:nth-child(2) { transition-delay: 0.2s; }
    .contact-card:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(styleSheet);