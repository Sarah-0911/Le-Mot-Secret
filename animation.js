import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";

export const initializeWinAnimation = () => {
  const winCanvas = document.querySelector("#win-dotLottie-canvas");

  if (!winCanvas) {
      console.error('Canvas element not found');
      return null;
  }

  const winSrc = "https://lottie.host/4b017b00-3e43-41a5-a63d-c83310acac83/PH3pDfagrf.json";

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
