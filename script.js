const previews = document.querySelectorAll('.preview');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');

let scale = 1;
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

// Prevent native drag behavior completely
lightboxImg.setAttribute('draggable', 'false');

// Open lightbox when any preview image is clicked
previews.forEach((preview) => {
  preview.addEventListener('click', () => {
    const imgSrc = preview.getAttribute('data-img'); // Get the image source from the data attribute
    lightboxImg.src = imgSrc;  // Set the image source for the lightbox
    lightbox.classList.remove('hidden');
    resetZoom();
  });
});

// Close lightbox when close button is clicked
closeBtn.addEventListener('click', () => {
  lightbox.classList.add('hidden');
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
  }
});

// Zoom image with mouse wheel
lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale += delta;
  scale = Math.min(Math.max(0.2, scale), 3); // zoom out to 20% image size, in to 300%
  applyTransform();
});

// Start dragging when mouse button is pressed
lightboxImg.addEventListener('mousedown', (e) => {
  e.preventDefault(); // block browser dragging again just to be safe
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
});

// Stop dragging when mouse button is released
document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Move image when mouse is dragged
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    applyTransform();
  }
});

// Apply transformations (scaling and translation)
function applyTransform() {
  lightboxImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

// Reset zoom and position
function resetZoom() {
  scale = 1;
  currentX = 0;
  currentY = 0;
  applyTransform();
}
