import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";

export const handleWinAnimation = () => {
  const winCanvas = document.querySelector("#win-dotLottie-canvas");

  if (!winCanvas) {
      console.error('Canvas element not found');
      return null;
  }

  winCanvas.width = 80;
  winCanvas.height = 80;

  const winSrc = "https://lottie.host/9ac9c440-c19e-4ac9-b60e-869b6d0ef8cb/7h97gYMCNE.lottie";

  const winDotLottie = new DotLottie({
    canvas: winCanvas,
    src: winSrc,
    loop: true,
    autoplay: false
  });

  return winDotLottie;
};


// const button = document.querySelector('#clue');

// button.addEventListener('click', () => winDotLottie.pause());
