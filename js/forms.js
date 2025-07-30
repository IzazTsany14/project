/* ==========================================================================
   Forms JavaScript - UKM Kewirausahaan UNESA Kampus 5
   ========================================================================== */

// Form validation rules
const validationRules = {
    required: {
        test: (value) => value.trim() !== '',
        message: 'Field ini wajib diisi'
    },
    email: {
        test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Format email tidak valid'
    },
    phone: {
        test: (value) => /^(\+62|62|0)[0-9]{9,13}$/.test(value.replace(/\s/g, '')),
        message: 'Format nomor telepon tidak valid'
    },
    minLength: {
        test: (value, min) => value.length >= min,
        message: (min) => `Minimal ${min} karakter`
    },
    maxLength: {
        test: (value, max) => value.length <= max,
        message: (max) => `Maksimal ${max} karakter`
    },
    npm: {
        test: (value) => /^[0-9]{8,10}$/.test(value),
        message: 'NPM harus berupa angka 8-10 digit'
    },
    url: {
        test: (value) => /^https?:\/\/.+/.test(value),
        message: 'URL harus dimulai dengan http:// atau https://'
    }
};

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializeFormValidation();
    initializeFileUploads();
    initializeFormAnimations();
});

// Initialize all forms
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add form submission handler
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
        
        // Add form reset handler
        const resetButton = form.querySelector('[type="reset"]');
        if (resetButton) {
            resetButton.addEventListener('click', () => resetForm(form));
        }
    });
}

// Form validation
function initializeFormValidation() {
    // Custom validation messages
    const validationMessages = {
        valueMissing: 'Field ini wajib diisi',
        typeMismatch: 'Format input tidak valid',
        tooShort: 'Input terlalu pendek',
        tooLong: 'Input terlalu panjang',
        patternMismatch: 'Format tidak sesuai dengan yang diharapkan'
    };
    
    // Set custom validation messages
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
        input.addEventListener('invalid', function(e) {
            const validity = e.target.validity;
            let message = 'Input tidak valid';
            
            for (const key in validationMessages) {
                if (validity[key]) {
                    message = validationMessages[key];
                    break;
                }
            }
            
            e.target.setCustomValidity(message);
        });
        
        input.addEventListener('input', function(e) {
            e.target.setCustomValidity('');
        });
    });
}

// File upload handling
function initializeFileUploads() {
    const fileInputs = document.querySelectorAll('.form-file-input');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const label = e.target.nextElementSibling;
            const maxSize = parseInt(input.getAttribute('data-max-size')) || 5000000; // 5MB default
            const allowedTypes = input.getAttribute('data-allowed-types')?.split(',') || [];
            
            if (file) {
                // Validate file size
                if (file.size > maxSize) {
                    showFieldError(input, `Ukuran file terlalu besar. Maksimal ${formatFileSize(maxSize)}`);
                    input.value = '';
                    return;
                }
                
                // Validate file type
                if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
                    showFieldError(input, 'Tipe file tidak diizinkan');
                    input.value = '';
                    return;
                }
                
                // Update label
                label.innerHTML = `
                    <span class="form-file-icon">📄</span>
                    <span>${file.name}</span>
                    <small>(${formatFileSize(file.size)})</small>
                `;
                
                clearFieldError(input);
            } else {
                // Reset label
                label.innerHTML = `
                    <span class="form-file-icon">📁</span>
                    <span>Pilih file atau drag & drop</span>
                `;
            }
        });
        
        // Drag and drop handling
        const label = input.nextElementSibling;
        
        label.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        label.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
        });
        
        label.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                input.dispatchEvent(new Event('change'));
            }
        });
    });
}

// Form animations
function initializeFormAnimations() {
    // Floating label effect
    const floatingInputs = document.querySelectorAll('.form-floating .form-input');
    
    floatingInputs.forEach(input => {
        const label = input.nextElementSibling;
        
        function checkFloating() {
            if (input.value || input === document.activeElement) {
                label.classList.add('floating');
            } else {
                label.classList.remove('floating');
            }
        }
        
        input.addEventListener('focus', checkFloating);
        input.addEventListener('blur', checkFloating);
        input.addEventListener('input', checkFloating);
        
        // Initial check
        checkFloating();
    });
    
    // Form step animations
    const steppers = document.querySelectorAll('.form-stepper');
    
    steppers.forEach(stepper => {
        const steps = stepper.querySelectorAll('.form-step');
        const nextButtons = stepper.querySelectorAll('.btn-next');
        const prevButtons = stepper.querySelectorAll('.btn-prev');
        let currentStep = 0;
        
        function showStep(index) {
            steps.forEach((step, i) => {
                step.classList.toggle('active', i === index);
                step.style.transform = `translateX(${(i - index) * 100}%)`;
            });
            
            // Update step indicators
            const indicators = stepper.querySelectorAll('.step-indicator');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
                indicator.classList.toggle('completed', i < index);
            });
        }
        
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStepElement = steps[currentStep];
                const inputs = currentStepElement.querySelectorAll('.form-input, .form-select, .form-textarea');
                
                if (validateStep(inputs)) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentStep--;
                showStep(currentStep);
            });
        });
        
        // Initial setup
        showStep(0);
    });
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('[type="submit"]');
    
    // Validate entire form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Mengirim...';
    submitButton.disabled = true;
    submitButton.classList.add('btn-loading');
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('btn-loading');
        
        // Show success message
        showFormMessage(form, 'success', 'Form berhasil dikirim!');
        
        // Reset form
        resetForm(form);
    }, 2000);
}

// Form validation functions
function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateStep(inputs) {
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    const rules = input.getAttribute('data-rules')?.split('|') || [];
    
    // Clear previous errors
    clearFieldError(input);
    
    // Check each rule
    for (const rule of rules) {
        const [ruleName, ruleParam] = rule.split(':');
        const validationRule = validationRules[ruleName];
        
        if (validationRule) {
            const isValid = ruleParam
                ? validationRule.test(value, ruleParam)
                : validationRule.test(value);
            
            if (!isValid) {
                const message = typeof validationRule.message === 'function'
                    ? validationRule.message(ruleParam)
                    : validationRule.message;
                
                showFieldError(input, message);
                return false;
            }
        }
    }
    
    // HTML5 validation
    if (!input.checkValidity()) {
        showFieldError(input, input.validationMessage);
        return false;
    }
    
    // Show success state
    showFieldSuccess(input);
    return true;
}

function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error') || createErrorElement();
    
    formGroup.classList.add('has-error');
    formGroup.classList.remove('has-success');
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    if (!formGroup.querySelector('.form-error')) {
        formGroup.appendChild(errorElement);
    }
    
    // Add shake animation
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
}

function showFieldSuccess(input) {
    const formGroup = input.closest('.form-group');
    
    formGroup.classList.add('has-success');
    formGroup.classList.remove('has-error');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function clearFieldError(input) {
    const formGroup = input.closest('.form-group');
    
    formGroup.classList.remove('has-error', 'has-success');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function createErrorElement() {
    const errorElement = document.createElement('small');
    errorElement.className = 'form-error';
    return errorElement;
}

// Form message display
function showFormMessage(form, type, message) {
    const messageElement = form.querySelector('.form-message') || createMessageElement();
    
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    if (!form.querySelector('.form-message')) {
        form.insertBefore(messageElement, form.firstChild);
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

function createMessageElement() {
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    return messageElement;
}

// Form reset
function resetForm(form) {
    form.reset();
    
    // Clear validation states
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('has-error', 'has-success');
        const errorElement = group.querySelector('.form-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    });
    
    // Reset file inputs
    const fileInputs = form.querySelectorAll('.form-file-input');
    fileInputs.forEach(input => {
        const label = input.nextElementSibling;
        label.innerHTML = `
            <span class="form-file-icon">📁</span>
            <span>Pilih file atau drag & drop</span>
        `;
    });
    
    // Hide form message
    const messageElement = form.querySelector('.form-message');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Auto-save functionality
function initializeAutoSave() {
    const autoSaveForms = document.querySelectorAll('[data-auto-save]');
    
    autoSaveForms.forEach(form => {
        const formId = form.getAttribute('data-auto-save');
        const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        // Load saved data
        const savedData = localStorage.getItem(`autosave_${formId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            inputs.forEach(input => {
                if (data[input.name]) {
                    input.value = data[input.name];
                }
            });
        }
        
        // Save data on input
        inputs.forEach(input => {
            input.addEventListener('input', debounce(() => {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                localStorage.setItem(`autosave_${formId}`, JSON.stringify(data));
            }, 1000));
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', () => {
            localStorage.removeItem(`autosave_${formId}`);
        });
    });
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize auto-save when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAutoSave);

// Export form utilities
window.FormUtils = {
    validateForm,
    validateField,
    showFieldError,
    showFieldSuccess,
    clearFieldError,
    resetForm,
    showFormMessage,
    formatFileSize,
    validationRules
};