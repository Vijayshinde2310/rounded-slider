// Select the box element
const box = document.getElementById('box');

// Select all the items within the box using querySelectorAll
const items = box.querySelectorAll('.item');

// Calculate the radius of the circular placement
let radius = box.offsetWidth / 2; // Adjust this value to change the radius

// Calculate the angle between each item
const angle = (2 * Math.PI) / items.length;

// Function to update item positions
function updateItemPositions() {
  items.forEach((item, index) => {
    // Calculate the position of each item
    const x = radius * Math.cos(index * angle);
    const y = radius * Math.sin(index * angle);

    // Use GSAP to animate the position
    gsap.to(item, { x, y, duration: 0.6 });
  });
}

// Initial item positioning
updateItemPositions();

// Add click event listener to each item
items.forEach((item, index) => {
  item.addEventListener('click', () => {
    const itemAngle = (index * angle * 180) / Math.PI; // Calculate the angle in degrees
    console.log(`Item ${index + 1} Angle: ${itemAngle.toFixed(2)} degrees`);

    // Get the data-target attribute value
    const targetID = item.getAttribute('data-target');

    // Remove 'active' class from previously clicked item
    const activeItem = box.querySelector('.item.active');
    if (activeItem) {
      activeItem.classList.remove('active');
    }

    // Add 'active' class to the clicked item
    item.classList.add('active');

    // Add 'active' class to the target element with matching ID
    const targetElement = document.getElementById(targetID);
    if (targetElement) {
      targetElement.classList.add('active');

      // Remove 'active' class from sibling elements
      const siblings = Array.from(targetElement.parentNode.children);
      siblings.forEach(sibling => {
        if (sibling !== targetElement) {
          sibling.classList.remove('active');
        }
      });
    }

    // Rotate the box
    gsap.to(box, { rotation: 360 - itemAngle, duration: 0.6 });

    gsap.to(items, { rotation: -(360 - itemAngle), duration: 0.6 });
  });
});

// Resize event handler
function handleResize() {
  radius = box.offsetWidth / 2;
  updateItemPositions();
}

// Attach the resize event listener
window.addEventListener('resize', handleResize);
