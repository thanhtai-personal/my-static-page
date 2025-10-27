let matrixIntervalId = null;

function triggerMatrixLoading() {
  const loadingContainer = document.getElementById("loading-container");
  console.log("loadingContainer", loadingContainer);
  if (!loadingContainer) return;
  const loadingElement = document.createElement("div");
  loadingElement.innerHTML = "";
  loadingElement.style.background = "#000";
  loadingElement.style.position = "fixed";
  loadingElement.style.zIndex = 99999;
  loadingElement.style.width = "100vw";
  loadingElement.style.height = "100vh";
  loadingElement.style.top = 0;
  loadingElement.style.left = 0;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  loadingElement.appendChild(canvas);
  loadingContainer.appendChild(loadingElement);

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  const cols = Math.floor(w / 20) + 1;
  const ypos = Array(cols).fill(0);

  function matrix() {
    ctx.fillStyle = "#0001";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#0f0";
    ctx.font = "15pt monospace";

    ypos.forEach((y, ind) => {
      const text = String.fromCharCode(33 + Math.random() * 94);
      const x = ind * 20;
      ctx.fillText(text, x, y);

      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      else ypos[ind] = y + 20;
    });
  }

  matrixIntervalId = setInterval(matrix, 50);
}

function clearLoadingOverlay() {
  const loadingContainer = document.getElementById("loading-container");
  if (!loadingContainer) return;

  loadingContainer.innerHTML = "";

  if (matrixIntervalId !== null) {
    clearInterval(matrixIntervalId);
    matrixIntervalId = null;
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
