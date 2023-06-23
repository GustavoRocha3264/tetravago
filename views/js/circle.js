const images = document.querySelectorAll('.banner img');
let currentImageIndex = 0;

function changeImage() {
  images[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add('active');
}

setInterval(changeImage, 5000); // Altera a imagem a cada 5 segundos (5000 milissegundos)
