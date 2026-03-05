const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.btn-next');
const prevBtns = document.querySelectorAll('.btn-prev');
const progressBar = document.getElementById('form-progress');

let currentStep = 0;

// Show only the first step
formSteps.forEach((step, index) => {
  step.style.display = index === 0 ? 'block' : 'none';
});

function updateProgressBar() {
  const totalSteps = formSteps.length;
  const percent = ((currentStep + 1) / totalSteps) * 100;
  progressBar.style.width = `${percent}%`;
  progressBar.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
}

function validateStep(step) {
    const inputs = step.querySelectorAll('input, textarea, select');
    const groups = {};
  
    for (let input of inputs) {
      if (input.offsetParent === null) continue; // skip hidden elements
  
      const type = input.type;
  
      // Track checkboxes and radio buttons
      if (type === 'checkbox' || type === 'radio') {
        const name = input.name || input.id;
        if (!groups[name]) groups[name] = [];
        groups[name].push(input);
      }
      // Select dropdown
      else if (input.tagName === 'SELECT') {
        if (!input.value) {
          input.focus();
          alert('Please select an option.');
          return false; // stop validation immediately
        }
      }
      // Text inputs and textareas
      else {
        if (!input.value.trim()) {
          input.focus();
          alert('Please fill out all fields before continuing.');
          return false; // stop validation immediately
        }
      }
    }
  
    // Check checkbox/radio groups
    for (let groupName in groups) {
      const group = groups[groupName];
      if (!group.some(input => input.checked)) {
        group[0].focus();
        alert('Please select at least one option.');
        return false; // stop validation immediately
      }
    }
  
    return true; // all fields valid
  }
   
 
  

// Next button click
nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const step = formSteps[currentStep];
    if (!validateStep(step)) return;

    // Move to next step
    step.style.display = 'none';
    currentStep = Math.min(currentStep + 1, formSteps.length - 1);
    formSteps[currentStep].style.display = 'block';
    updateProgressBar();
  });
});

// Previous button click
prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    formSteps[currentStep].style.display = 'none';
    currentStep = Math.max(currentStep - 1, 0);
    formSteps[currentStep].style.display = 'block';
    updateProgressBar();
  });
});

// Initialize progress bar
updateProgressBar();