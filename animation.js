import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";

export const initializeWinAnimation = () => {
  const winCanvas = document.querySelector("#win-dotLottie-canvas");

  if (!winCanvas) {
      console.error('Canvas element not found');
      return null;
  }

  const winSrc = "https://lottie.host/9ac9c440-c19e-4ac9-b60e-869b6d0ef8cb/7h97gYMCNE.lottie";

  const winDotLottie = new DotLottie({
    canvas: winCanvas,
    src: winSrc,
    loop: true,
    autoplay: true
  });

  return winDotLottie;
};

export const initializeLoseAnimation = () => {
  const loseCanvas = document.querySelector("#lose-dotLottie-canvas");

  if (!loseCanvas) {
      console.error('Canvas element not found');
      return null;
  }

  const loseSrc = "https://lottie.host/21bd2f1f-30ef-4dab-a770-c07d0f7314ed/Rdfx5xk96d.json";

  const loseDotLottie = new DotLottie({
    canvas: loseCanvas,
    src: loseSrc,
    loop: true,
    autoplay: true
  });

  return loseDotLottie;
};

// const windotLottie = initializeWinAnimation();
