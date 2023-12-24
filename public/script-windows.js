document.addEventListener('DOMContentLoaded', function() {
    // Get references to taskbar, popup, and folder elements
    const taskbar = document.getElementById('taskbar');
    const popup = document.getElementById('popup');
    const folderContainer = document.querySelector('.folder-container');


    // Audio
    const audioFile = "audio/windows-xp-shutdown.mp3"; // Default audio file path
    const audio = new Audio(audioFile); // Initialize audio object

    // Set the coordinates of the clickable area on the left side of the taskbar
    const taskbarClickableArea = {
        startX: 0,   // X-coordinate starts from the left edge
        startY: 0,   // Y-coordinate starts from the top edge
        width: 160,  // Width of the clickable area
        height: taskbar.offsetHeight  // Height of the taskbar
    };

    const popupClickableArea = {
        startX: 10,  // Adjust the coordinates based on your design
        startY: 10,  // Adjust the coordinates based on your design
        width: 30,   // Adjust the width based on your design
        height: 30   // Adjust the height based on your design
    };

    ////////////////////// - FOLDER CONTENT - ///////////////////////////
    
 // The new code for showing inside folders
 const insideFolderAboutMe = document.querySelector('.inside-folder-aboutme');
 const insideFolderProjects = document.querySelector('.inside-folder-projects');
 const insideFolderContact = document.querySelector('.inside-folder-contact');
 insideFolderAboutMe.style.display = 'none';
 insideFolderProjects.style.display = 'none';
 insideFolderContact.style.display = 'none';

 // Add click event listener to folder container
 folderContainer.addEventListener('click', function(event) {
     const folder = event.target.closest('.folder');
     if (folder) {
         const content = folder.getAttribute('data-content');
         showInsideFolder(content);
     }
 });

 // Add click event listener to document to close the inside folder container when clicked outside
 document.addEventListener('click', function(event) {
     if (!event.target.closest('.inside-folder') && !event.target.closest('.folder')) {
         // Hide all inside folders when clicking outside
         insideFolderAboutMe.style.display = 'none';
         insideFolderProjects.style.display = 'none';
         insideFolderContact.style.display = 'none';
     }
 });

 // Function to show inside folder
 function showInsideFolder(content) {
     // Hide all inside folders
     insideFolderAboutMe.style.display = 'none';
     insideFolderProjects.style.display = 'none';
     insideFolderContact.style.display = 'none';

     // Show the specific inside folder based on the 'content' parameter
     if (content === 'aboutme') {
         insideFolderAboutMe.style.display = 'block';
     } else if (content === 'projects') {
         insideFolderProjects.style.display = 'block';
     } else if (content === 'contact') {
         insideFolderContact.style.display = 'block';
     }
 }
    ////////////////////////////////////////////////////////////////





    // Add click event listener to taskbar
    taskbar.addEventListener('click', function(event) {
        // Check if the click is within the clickable area on the left side of the taskbar
        if (isWithinClickableArea(event, taskbar, taskbarClickableArea)) {
            // Display the popup
            popup.style.display = 'block';
        }
    });

    // Add click event listener to document to close the popup when clicked outside
    document.addEventListener('click', function(event) {
        // Check if the click is outside of the popup and not within the clickable area of the taskbar
        if (!isWithinPopup(event, popup) && !isWithinClickableArea(event, taskbar, taskbarClickableArea)) {
            // Hide the popup
            popup.style.display = 'none';
        }
    });

    // Add click event listener to popup to navigate to index.html when clicked inside the popup
    popup.addEventListener('click', function(event) {
        // Check if the click is within the popup area
        if (isWithinPopup(event, popup)) {

            audio.volume = 0.1; // Set volume to 20%
            // Play the audio
            audio.play();

            // Hide the popup
            popup.style.display = 'none';
            insideFolderAboutMe.style.display = 'none';
            insideFolderProjects.style.display = 'none';
            insideFolderContact.style.display = 'none';
            // Decrease brightness gradually while the audio is playing
            decreaseBrightness(3); // Adjust the duration as needed

            // Wait for the audio to finish before navigating
            audio.onended = function() {
                // Navigate to index.html
                window.location.href = 'index.html';
            };


        }
});


    // Function to check if the click is within the specified clickable area
    function isWithinClickableArea(event, element, clickableArea) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        return (
            x >= clickableArea.startX &&
            x <= clickableArea.startX + clickableArea.width &&
            y >= clickableArea.startY &&
            y <= clickableArea.startY + clickableArea.height
        );
    }

    // Function to check if the click is within the popup
    function isWithinPopup(event, popup) {
        const rect = popup.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;

        return (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        );
    }


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


});