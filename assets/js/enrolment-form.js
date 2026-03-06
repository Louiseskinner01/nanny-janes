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
    if (input.offsetParent === null || input.disabled) continue; // skip hidden elements

    const type = input.type;

    // Handle checkbox/radio groups
    if (type === 'checkbox' || type === 'radio') {

      // Skip optional top-up checkboxes
      if (input.name === "topup") continue;

      const name = input.name || input.id;

      if (!groups[name]) groups[name] = [];
      groups[name].push(input);
    }

    // Select dropdown
    else if (input.tagName === 'SELECT') {
      if (!input.value) {
        input.focus();
        alert('Please select an option.');
        return false;
      }
    }

    // Text inputs and textareas
    else {
      // skip optional fields
      if (input.classList.contains('optional-info')) continue;
    
      if (!input.value.trim()) {
        input.focus();
        alert('Please fill out all fields before continuing.');
        return false;
      }
    }
  }

  // Validate checkbox/radio groups
  for (let groupName in groups) {
    const group = groups[groupName];

    if (!group.some(input => input.checked)) {
      group[0].focus();
      alert('Please select at least one session.');
      return false;
    }
  }

  return true;
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

const noImmunisations = document.getElementById('noImmunisations');
const immunDates = document.querySelectorAll('.immun-date');

noImmunisations.addEventListener('change', function () {

    immunDates.forEach(input => {

        if (this.checked) {
            input.value = "";
            input.disabled = true;
        } else {
            input.disabled = false;
        }

    });

});

const noParent2 = document.getElementById('parent2-form');
const parent2Info = document.querySelectorAll('.parent2-info');

noParent2.addEventListener('change', function () {

  parent2Info.forEach(input => {

        if (this.checked) {
            input.value = "";
            input.disabled = true;
        } else {
            input.disabled = false;
        }

    });

});

const noContact2 = document.getElementById('contact2-form');
const contact2Info = document.querySelectorAll('.contact2-info');

noContact2.addEventListener('change', function () {

  contact2Info.forEach(input => {

        if (this.checked) {
            input.value = "";
            input.disabled = true;
        } else {
            input.disabled = false;
        }

    });

});