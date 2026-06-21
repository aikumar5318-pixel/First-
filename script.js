// ===== VIDEO DATABASE =====
// ADD YOUR VIDEOS HERE!
// Format: {id, title, thumbnail_emoji, category, youtube_id}

const videosDatabase = [
    {
    id: 1,
    title: "Atrangi Comedy Short",
    category: "trending",
    youtube_id: "2zMI77_RHs8"
},
    {
        id: 2,
        title: "CCTV Aunty Finds Everything",
        thumbnail_emoji: "📹",
        category: "cctv",
        youtube_id: "XCcNMuxpdmo"
    },
    {
        id: 3,
        title: "Fail ho sakte hain par Match nahi! 💀",
        thumbnail_emoji: "👔",
        category: "trending",
        youtube_id: "vCWeSn5yHtQ"
    },
    {
        id: 4,
        title: "Thala Per Funny Joke 🤣 |",
        thumbnail_emoji: "🚀",
        category: "trending",
        youtube_id: "ERzqfc_0uAE"
    },
    {
        id: 5,
        title: "My Crush vs. Class Projector 📽️😭 | Funny Standup #comedy  #shorts #indianlaughs  #funny",
        thumbnail_emoji: "📚",
        category: "trending",
        youtube_id: "2E2nHd5Q4lE"
    },
    {
        id: 6,
        title: "TV coach expose",
        thumbnail_emoji: "🤖",
        category: "sharma",
        youtube_id: "ru2uVYHlEqc"
    }
];

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    displayVideos('all');
});

// ===== VIDEO FUNCTIONS =====
// Display videos with filtering
function displayVideos(category) {
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';

    let filteredVideos = videosDatabase;
    
    if (category !== 'all') {
        filteredVideos = videosDatabase.filter(video => video.category === category);
    }

    filteredVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.onclick = () => playVideo(video.youtube_id);

      videoCard.innerHTML = `
    <div class="video-thumbnail">
        <img
            src="https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg"
            alt="${video.title}"
            class="thumbnail-img">

        <div class="video-play-btn">▶</div>
    </div>

    <div class="video-info">
        <p class="video-title">${video.title}</p>
        <span class="video-category">${video.category}</span>
    </div>
`;

        videosGrid.appendChild(videoCard);
    });
}

// Filter videos by category
function filterVideos(category) {
    // Update active button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Display filtered videos
    displayVideos(category);
}

// Play video in modal
function playVideo(youtubeId) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    modal.style.display = 'block';
}

// Close video modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    modal.style.display = 'none';
    videoFrame.src = '';
}

// ===== NAVIGATION FUNCTIONS =====
// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    }
}

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close menu
function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
}

// ===== UTILITY FUNCTIONS =====
// Open link in new tab
function openLink(url) {
    window.open(url, '_blank');
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = event.target[0].value;
    const email = event.target[1].value;
    const subject = event.target[2].value;
    const message = event.target[3].value;

    // Validate form
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Create mailto link
    const mailtoLink = `mailto:aikumar.5318@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form
    event.target.reset();
    alert('Message prepared! Your email client will open.');
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// ===== ADVANCED FEATURES =====

// Add video to database (Call this function to add new videos)
function addVideo(title, thumbnail_emoji, category, youtube_id) {
    const newVideo = {
        id: videosDatabase.length + 1,
        title: title,
        thumbnail_emoji: thumbnail_emoji,
        category: category,
        youtube_id: youtube_id
    };

    videosDatabase.push(newVideo);
    console.log('Video added successfully!', newVideo);
    displayVideos('all'); // Refresh display
}

// Remove video from database
function removeVideo(videoId) {
    const index = videosDatabase.findIndex(v => v.id === videoId);
    if (index > -1) {
        videosDatabase.splice(index, 1);
        console.log('Video removed successfully!');
        displayVideos('all');
    }
}

// Update video information
function updateVideo(videoId, updatedData) {
    const video = videosDatabase.find(v => v.id === videoId);
    if (video) {
        Object.assign(video, updatedData);
        console.log('Video updated successfully!', video);
        displayVideos('all');
    }
}

// Get video by ID
function getVideoById(videoId) {
    return videosDatabase.find(v => v.id === videoId);
}

// Get all videos by category
function getVideosByCategory(category) {
    return videosDatabase.filter(v => v.category === category);
}

// ===== ANALYTICS FUNCTIONS =====

// Get total video count
function getTotalVideoCount() {
    return videosDatabase.length;
}

// Get category statistics
function getCategoryStats() {
    const stats = {};
    videosDatabase.forEach(video => {
        stats[video.category] = (stats[video.category] || 0) + 1;
    });
    return stats;
}

// Log analytics
function logAnalytics() {
    console.log('=== CHANNEL ANALYTICS ===');
    console.log('Total Videos:', getTotalVideoCount());
    console.log('Category Stats:', getCategoryStats());
    console.log('All Videos:', videosDatabase);
}

// ===== MODAL CLICK OUTSIDE CLOSE =====
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(event) {
    // ESC key to close modal
    if (event.key === 'Escape') {
        closeModal();
    }

    // Keyboard navigation for videos (optional)
    if (event.key === 'ArrowRight') {
        console.log('Next video (can be implemented)');
    }
    if (event.key === 'ArrowLeft') {
        console.log('Previous video (can be implemented)');
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to cards
setTimeout(() => {
    document.querySelectorAll('.video-card, .character-card, .content-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}, 100);

// ===== EXAMPLE USAGE =====
// Call these functions in browser console to test:

/*
// Add a new video
addVideo("My New Video", "😂", "trending", "dQw4w9WgXcQ");

// Get total videos
console.log(getTotalVideoCount());

// Get videos by category
console.log(getVideosByCategory("sharma"));

// Log all analytics
logAnalytics();

// Update a video
updateVideo(1, { title: "Updated Title" });

// Get specific video
console.log(getVideoById(1));

// Remove a video
removeVideo(6);
*/const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function () {

        setTimeout(() => {

            const successMessage =
                document.getElementById('successMessage');

            if (successMessage) {
                successMessage.style.display = 'block';
            }

        }, 1000);

    });
}