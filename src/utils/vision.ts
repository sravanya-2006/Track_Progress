const VISION_KEY = "timeflow_vision";

export function saveVision(
  image: string
) {
  localStorage.setItem(
    VISION_KEY,
    image
  );
}

export function loadVision() {
  return localStorage.getItem(
    VISION_KEY
  );
}