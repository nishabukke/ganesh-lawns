function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 50;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);

 



const body = document.querySelector("body");
const galleryWrapper = document.querySelector(".gallery-wrapper");

// const styeElement = document.createElement("style");
// styeElement.innerHTML = galleryStyleSheet;
// styeElement.style.display = "none";
// body.append(styeElement);

const galleryPopup = document.createElement("div");
galleryPopup.className = "gallery-popup";

galleryPopup.innerHTML = `
    <button class="close">&times;</button>
		<span class="next">&#187;</span>
		<span class="prev">&#171;</span>
		<img src="" alt="">
`;

const galleryOverlay = document.createElement("div");
galleryOverlay.className = "gallery-overlay";
body.prepend(galleryOverlay);
body.prepend(galleryPopup);

const images = [...galleryWrapper.querySelectorAll(".gallery-img img")];
const closeBtn = galleryPopup.querySelector(".close");
const nextBtn = galleryPopup.querySelector(".next");
const prevBtn = galleryPopup.querySelector(".prev");

nextBtn.addEventListener("click", nextImg);
prevBtn.addEventListener("click", prevImg);

// Creating Animation For Image Transition
const imgTransitionNext = `animation: imgTransitionNext 0.45s linear`;
const imgTransitionPrev = `animation: imgTransitionPrev 0.45s linear`;
let showImg = galleryPopup.querySelector(".gallery-popup img");

let selectedImg = null;
let startCount = 0;
let endCount = images.length - 1;

closeBtn.addEventListener("click", (e) => {
	galleryPopup.style.display = "none";
	galleryPopup.classList.remove("active");
	selectedImg === null;
	startCount = 0;
	endCount = images.length - 1;
	body.style.overflow = "auto";
});

// Click Next Button Function
function nextImg() {
	if (selectedImg < 0) return;
	if (selectedImg === endCount) {
		selectedImg = startCount;
	} else {
		selectedImg++;
	}
	showImg.src = images[selectedImg].src;
	addRemoveAnimationNext();
}

// Click Prev Button Function
function prevImg() {
	if (selectedImg < 0) return;
	if (selectedImg === startCount) {
		selectedImg = endCount;
	} else {
		selectedImg--;
	}
	showImg.src = images[selectedImg].src;
	addRemoveAnimationPrev();
}

// Initial Click Handler
images.forEach((img, index) => {
	img.addEventListener("click", (e) => {
		galleryPopup.style.display = "flex";
		galleryPopup.classList.add("active");
		showImg.src = e.currentTarget.src;
		selectedImg = index;
		body.style.overflow = "hidden";
	});
});

// Function for add and Remove Style Attribute
function addRemoveAnimationNext() {
	showImg.setAttribute("style", imgTransitionNext);
	setTimeout(() => {
		showImg.setAttribute("style", "");
	}, 500);
}

function addRemoveAnimationPrev() {
	showImg.setAttribute("style", imgTransitionPrev);
	setTimeout(() => {
		showImg.setAttribute("style", "");
	}, 500);
}
