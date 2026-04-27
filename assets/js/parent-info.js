
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
}
