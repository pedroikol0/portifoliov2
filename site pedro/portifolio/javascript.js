document.addEventListener('keydown', (e) => {
    const wrapper = document.querySelector('.wrapper');
    if (e.key === 'ArrowRight') {
        wrapper.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
        wrapper.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
});