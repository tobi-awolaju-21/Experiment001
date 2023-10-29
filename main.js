modelArray = [];
let modelCounter = 0; // Initialize a counter for unique model identifiers
let selectedModelId = null;

modal = document.getElementById("modal");
modalText = document.getElementById("modal-text");
modalInput = document.getElementById("input-box");
closeBtn = document.getElementById("close");
explainButton = document.createElement("button");

let isDragging = false;
let selectedCircle = null;

// Function to create a new circle
function createCircle(x, y,id) {
    const circle = document.createElement('div');
    circle.id = id;
    circle.className = 'circle';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            isDragging = true;
            selectedCircle = circle;
        } else if (e.button === 2) {

            var elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);

  // Check if the element is a div element.
  if (elementUnderMouse.tagName === "DIV") {
    // Return the id of the div element.
    showInputBox(elementUnderMouse.id); 
       }
        }
    });

    document.getElementById('circle-container').appendChild(circle);
}

// Event listener for the Add Button
btn = document.getElementById("add-button");
btn.addEventListener('click', () => {
    const container = document.getElementById('circle-container');
    const rect = container.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    createCircle(x, y,"model-"+ modelCounter);

    // Update the modelArray with a unique model identifier and "nill" description
    modelArray.push({ model: `model-${modelCounter}`, description: "nill" });
    console.log(modelArray);

    modelCounter++; // Increment the modelCounter for the next model
});

// Event listeners for mousemove and mouseup
document.addEventListener('mousemove', (e) => {
    if (isDragging && selectedCircle) {
        selectedCircle.style.left = e.clientX - 25 + 'px';
        selectedCircle.style.top = e.clientY - 25 + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    selectedCircle = null;
});

function showInputBox(selectedModelId) {
    modal.style.display = "block";
    modalText.textContent = "Describe the Model and its stage in the reaction and purpose in the reaction";
  
    // Set the value of the modalInput element to the ID of the selected model
    //get description for model in position
    i = selectedModelId.replace("model-","")
    var model = modelArray[i];
    var description = model.description;
    modalInput.value = description;
    console.log(selectedModelId);
  }
  

// Event listener for Enter key in the input box
// Event listener for Enter key in the input box
modalInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      var description = modalInput.value;
      modal.style.display = "none";
      modelArray[i].description = modalInput.value;
      console.log(modelArray[i].description);
      console.log(modelArray);
  
      modalInput.value = ""; // Clear the input box
    }
  });
  

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


// Function to convert the array to a JSON string
function convertArrayToJsonString(array) {
    return JSON.stringify(array);
  }
  
  // Add an event listener to the button with the ID `rest`
  document.getElementById("run-button").addEventListener("click", () => {
  // Display the JSON string to the user
    simulateModel();
  });



 // Add an event listener to the button with the ID `clear`
 document.getElementById("clear-button").addEventListener("click", () => {
// Get the div element with the ID `circle-container`
const circleContainer = document.getElementById("circle-container");

// Remove all of the child elements from the div element
circleContainer.innerHTML = "";

// Clear the array
modelArray = [];
});




  function simulateModel(){
      // Convert the array to a JSON string
      const jsonString = convertArrayToJsonString(modelArray);
    // this is where PaLM 2 and Prompt modifers, rules comes in.
    
    console.log(jsonString)
  }
