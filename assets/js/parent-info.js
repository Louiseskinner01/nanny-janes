function showSection(sectionId) {

    // hide intro paragraph
    const intro = document.getElementById('intro-p');
    if (intro) {
        intro.style.display = 'none';
    }

    // hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // show selected section
    document.getElementById(sectionId).classList.add('active');
}
