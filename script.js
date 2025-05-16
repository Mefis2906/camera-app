const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture-button");
const previewContainer = document.getElementById("preview-container");
const previewImage = document.getElementById("preview");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const cameraContainer = document.getElementById("camera-container");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    alert("Не удалось получить доступ к камере.");
    console.error(error);
  }
}

captureButton.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageDataURL = canvas.toDataURL("image/png");
  previewImage.src = imageDataURL;

  cameraContainer.classList.add("hidden");
  previewContainer.classList.remove("hidden");
});

cancelButton.addEventListener("click", () => {
  previewContainer.classList.add("hidden");
  cameraContainer.classList.remove("hidden");
});

saveButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = previewImage.src;
  link.download = "photo.png";
  link.click();

  previewContainer.classList.add("hidden");
  cameraContainer.classList.remove("hidden");
});

startCamera();
