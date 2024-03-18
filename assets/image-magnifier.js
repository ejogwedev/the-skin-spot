'use strict'

class Magnifier {
  constructor(containerSelector, imageSelector, options) {
    // Set default values
    const defaultOptions = {
      zoomFactor: 1.5,
      scrollStep: 0.01,
      maxZoom: 5
    };

    this.containers = document.querySelectorAll(containerSelector);
    // Merge default values with provided options
    this.options = Object.assign(defaultOptions, options);

    this.containers.forEach((container) => {
      const image = container.querySelector(imageSelector);
      let zoomFactor = this.options.zoomFactor;

      container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const posX = x / container.clientWidth * 100;
        const posY = y / container.clientHeight * 100;

        image.style.transformOrigin = `${posX}% ${posY}%`;
        image.style.transform = `scale(${zoomFactor})`;
      });

      container.addEventListener('wheel', (event) => {
        event.preventDefault();
        const scrollStep = this.options.scrollStep / 400
        zoomFactor += event.deltaY * -scrollStep;
        zoomFactor = Math.min(Math.max(zoomFactor, 1), this.options.maxZoom);
        image.style.transform = `scale(${zoomFactor})`;
      });

      container.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        zoomFactor = this.options.zoomFactor;
      });
    });
  }
}