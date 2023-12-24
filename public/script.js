document.addEventListener("DOMContentLoaded", function () {
  const clickText = document.getElementById("click-text");
  const textToType = "CLICK ME";

  // Delay for 1000 milliseconds (1 second) before starting to type
  setTimeout(function () {
    typeText();
  }, 1000);

  let index = 0;

  function typeText() {
    if (index < textToType.length) {
      clickText.innerHTML += textToType.charAt(index);
      index++;
      setTimeout(typeText, 150);
    } else {
      // Add the blinking effect after typing
      clickText.classList.add("blink");
    }
  }

  const audioFile = "audio/windows-xp-startup.mp3"; // Default audio file path
  const clickMeBox = document.querySelector(".clickme-box");
  const backgroundImage = document.querySelector(".background");
  const audio = new Audio(audioFile); // Initialize audio object

  clickMeBox.addEventListener("click", function () {
    // Call the function to decrease background brightness
    decreaseBrightness(0.4);

    setTimeout(function () {
      if (window.innerWidth < 1000) {
        // Resize the image if the screen width is smaller than 1000 pixels
        backgroundImage.style.backgroundImage = "url('photos/windows-xp-loading-phone-size.png')";
      }
      else backgroundImage.style.backgroundImage = "url('photos/windows-xp-loading.webp')";
      increaseBrightness(2);

      // Hide the "CLICK ME" text
      clickText.style.display = "none";
    }, 1200);

    setTimeout(function () {
      if (backgroundImage.style.backgroundImage === "url('photos/windows-xp-loading.webp')") {
        audioFile = "windows-xp-loading.mp3";
      } else if (backgroundImage.style.backgroundImage === "url('photos/windows-xp-pixel.jpg')") {
        audioFile = "audio/windows-xp-pixel.ogg";
      }
      audio.src = audioFile; // Update audio source
      audio.volume = 0.1; // Set volume to 20%
      audio.play(); // Play the audio
    }, 1200);

    audio.addEventListener("ended", function () {
      backgroundImage.style.transform = "scale(1)";
      window.location.href = "home.html"; // Redirect to home.html
    });
  });

  function decreaseBrightness(durationInSeconds) {
    const currentBrightness = parseFloat(getComputedStyle(document.body).getPropertyValue('--brightness'));
    const targetBrightness = 0; // Set the target brightness
    const startTime = performance.now();
  
    function animate() {
      const elapsed = performance.now() - startTime;
      const progress = elapsed / (durationInSeconds * 1000); // Convert to seconds
  
      if (progress < 1) {
        const newBrightness = currentBrightness - progress * (currentBrightness - targetBrightness);
        document.body.style.filter = `brightness(${newBrightness})`;
        requestAnimationFrame(animate);
      } else {
        document.body.style.filter = `brightness(${targetBrightness})`;
      }
    }
  
    animate();
  }

  function increaseBrightness(durationInSeconds) {
    const currentBrightness = parseFloat(getComputedStyle(document.body).getPropertyValue('--brightness'));
    const targetBrightness = 1; // Set the target brightness
    const startTime = performance.now();
  
    function animate() {
      const elapsed = performance.now() - startTime;
      const progress = elapsed / (durationInSeconds * 1000); // Convert to seconds
  
      if (progress < 1) {
        const newBrightness = currentBrightness - progress * (currentBrightness - targetBrightness);
        document.body.style.filter = `brightness(${newBrightness})`;
        requestAnimationFrame(animate);
      } else {
        document.body.style.filter = `brightness(${targetBrightness})`;
      }
    }
  
    animate();
  }
});
