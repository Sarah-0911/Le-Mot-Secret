import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";

const winCanvas = document.querySelector("#win-dotLottie-canvas");
const winSrc = "https://lottie.host/9ac9c440-c19e-4ac9-b60e-869b6d0ef8cb/7h97gYMCNE.lottie";

export const winDotLottie = new DotLottie({
  canvas: winCanvas,
  src: winSrc,
  loop: true,
  autoplay: true
});
