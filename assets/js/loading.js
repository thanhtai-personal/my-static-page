let matrixAnimationFrameId = null;
let overlayElement = null;
let showOverlayTimeoutId = null;

function triggerMatrixLoading() {
  const loadingContainer = document.getElementById("loading-container");
  if (!loadingContainer) return;
  if (showOverlayTimeoutId !== null) {
    clearTimeout(showOverlayTimeoutId);
  }

  showOverlayTimeoutId = window.setTimeout(() => {
    overlayElement = document.createElement("div");
    overlayElement.style.background = "#000";
    overlayElement.style.position = "fixed";
    overlayElement.style.zIndex = 99999;
    overlayElement.style.width = "100vw";
    overlayElement.style.height = "100vh";
    overlayElement.style.top = 0;
    overlayElement.style.left = 0;

    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    overlayElement.appendChild(canvas);
    loadingContainer.appendChild(overlayElement);

    const ctx = canvas.getContext("2d");
    const cols = Math.floor(canvas.width / 20) + 1;
    const ypos = Array(cols).fill(0);

    const drawMatrix = () => {
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = "15pt monospace";

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(33 + Math.random() * 94);
        const x = ind * 20;
        ctx.fillText(text, x, y);

        ypos[ind] = y > 100 + Math.random() * 10000 ? 0 : y + 20;
      });

      matrixAnimationFrameId = requestAnimationFrame(drawMatrix);
    };

    matrixAnimationFrameId = requestAnimationFrame(drawMatrix);
  }, 150);
}

function clearLoadingOverlay() {
  const loadingContainer = document.getElementById("loading-container");
  if (!loadingContainer) return;

  if (showOverlayTimeoutId !== null) {
    clearTimeout(showOverlayTimeoutId);
    showOverlayTimeoutId = null;
  }

  if (matrixAnimationFrameId !== null) {
    cancelAnimationFrame(matrixAnimationFrameId);
    matrixAnimationFrameId = null;
  }

  if (overlayElement) {
    overlayElement.remove();
    overlayElement = null;
  }
}

(function main() {
  triggerMatrixLoading();

  const onDomReady = () => {
    clearLoadingOverlay();
    document.removeEventListener("DOMContentLoaded", onDomReady);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDomReady);
  } else {
    onDomReady();
  }
})();
