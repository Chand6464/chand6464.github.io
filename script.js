// Search
const searchInput = document.getElementById('search');
const packCards = document.querySelectorAll('.pack-card');

searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  packCards.forEach((card) => {
    const name = card.getAttribute('data-name').toLowerCase();
    card.style.display = name.includes(query) ? 'block' : 'none';
  });
});

// Toggle Download Menu
function toggleMenu(button) {
  const menu = button.nextElementSibling;
  menu.classList.toggle('hidden');
}

// Download pack
function downloadPack() {
  const filePath = 'packs\\!    §bChand§3CRYSTAL.zip'; // Fixed path to the file
  
  // Trigger the download
  const link = document.createElement('a');
  link.href = filePath;  // Correct file path
  link.download = '!    §bChand§3CRYSTAL.zip';  // Fixed file name
  link.click();
}
