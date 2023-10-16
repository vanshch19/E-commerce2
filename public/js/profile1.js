// if(document.querySelector('.scroll-container').scrollLeft === 0){
//     var scrollLeftButton = document.getElementById('scrollLeftButtonElec');
//     scrollLeftButton.style.visibility = 'hidden'; 
// }


// document.getElementById('scrollRightButtonElec').addEventListener('click', function() {
//     var scrollLeftButton = document.getElementById('scrollLeftButtonElec');
//     scrollLeftButton.style.visibility = 'visible';

//     var container = document.querySelector('.scroll-container');
//     container.scrollLeft += 1500; // Adjust the value as per your requirement

//     var scrollLeft = Math.ceil(container.scrollLeft);
//     var maxScroll = (container.scrollWidth - container.clientWidth);
    
//     var scrollRightButton = document.getElementById('scrollRightButtonElec');
//     // console.log(container.scrollLeft)

//     if (scrollLeft === maxScroll) {
//         console.log('h1')
//         scrollRightButton.style.visibility = 'hidden';
//     } 
//     else {
//         scrollRightButton.style.visibility = 'visible';
//     }
// });


// document.getElementById('scrollLeftButtonElec').addEventListener('click', function() {
//     var scrollRightButton = document.getElementById('scrollRightButtonElec');
//     scrollRightButton.style.visibility = 'visible';
    
//     var container = document.querySelector('.scroll-container');
//     container.scrollLeft -= 1500; // Adjust the value as per your requirement

//     var scrollLeft = container.scrollLeft;
//     console.log(scrollLeft)

//     var scrollLeftButton = document.querySelector('#scrollLeftButtonElec');

//     if (scrollLeft === 0) {
//         scrollLeftButton.style.visibility = 'hidden';
//     } 
//     else {
//         scrollLeftButton.style.visibility = 'visible';
//     }
// });



// const searchInp = document.querySelector('.searchinp');
// const searchBtn = document.querySelector('.searchbtn');

// searchBtn.addEventListener('click', async (ev)=>{
//     const text = searchInp.value.toUpperCase();
//     console.log(text)

//     await axios.get('/userfunctionality/certainprod',{
//         params:{
//             type: 'text'
//         }
//     })
// })



const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(
      ".slider-wrapper .slide-button"
    );
    const sliderScrollbar = document.querySelector(
      ".container .slider-scrollbar"
    );
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;
  
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
  
        // Ensure the scrollbar thumb stays within bounds
        const boundedPosition = Math.max(
          0,
          Math.min(maxThumbPosition, newThumbPosition)
        );
        const scrollPosition =
          (boundedPosition / maxThumbPosition) * maxScrollLeft;
  
        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
      };
  
      // Remove event listeners on mouse up
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
  
      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
  
    // Slide images according to the slide button clicks
    slideButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
  
    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };
  
    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
    };
  
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
    });
  };
  
  window.addEventListener("resize", initSlider);
  window.addEventListener("load", initSlider);
  



  // ------ searching products
  console.log('connected')
const searchInp = document.querySelector('.searchinp');
const searchBtn = document.querySelector('.searchbtn');

searchBtn.addEventListener('click', async (ev)=>{
  const text = searchInp.value.toUpperCase();
  console.log(text)

  try {
    const res = await axios({
      method: 'get',
      url: `/userfunctionality/profilesearch/${text}`,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    });
  } catch (ev) {
    console.error(error);
    window.location.replace('/shop/profile1');
  }
  

})
