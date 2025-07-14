/**
 * Authentication JavaScript for PawFind Pet Adoption Website
 * Handles login, signup, form validation, and user session management
 */

// Mock user database (in a real app, this would be server-side)
let mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '(555) 123-4567',
        createdAt: new Date('2024-01-15')
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'mypassword',
        phone: '(555) 987-6543',
        createdAt: new Date('2024-02-20')
    }
];

// Initialize authentication functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthForms();
    loadMockUsers();
});

/**
 * Initialize authentication forms and event listeners
 */
function initializeAuthForms() {
    // Initialize login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        initializeLoginForm(loginForm);
    }

    // Initialize signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        initializeSignupForm(signupForm);
    }

    // Initialize password toggles
    initializePasswordToggles();

    // Initialize success modal
    initializeSuccessModal();
}

/**
 * Load mock users from localStorage or use default data
 */
function loadMockUsers() {
    const storedUsers = localStorage.getItem('pawfind_mock_users');
    if (storedUsers) {
        try {
            mockUsers = JSON.parse(storedUsers);
        } catch (error) {
            console.error('Error loading mock users:', error);
        }
    } else {
        // Save default users to localStorage
        saveMockUsers();
    }
}

/**
 * Save mock users to localStorage
 */
function saveMockUsers() {
    localStorage.setItem('pawfind_mock_users', JSON.stringify(mockUsers));
}

/**
 * Initialize login form functionality
 * @param {HTMLFormElement} form - Login form element
 */
function initializeLoginForm(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe') === 'on';
        
        // Validate form
        if (validateLoginForm(email, password)) {
            // Attempt login
            const user = authenticateUser(email, password);
            if (user) {
                loginSuccess(user, rememberMe);
            } else {
                showToast('Invalid email or password. Please try again.', 'error');
            }
        }
    });

    // Real-time validation
    const emailInput = form.querySelector('#email');
    const passwordInput = form.querySelector('#password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmailField(this);
        });
        emailInput.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validatePasswordField(this);
        });
        passwordInput.addEventListener('input', function() {
            clearFieldError(this);
        });
    }
}

/**
 * Initialize signup form functionality
 * @param {HTMLFormElement} form - Signup form element
 */
function initializeSignupForm(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const userData = {
            name: formData.get('fullName').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            agreeTerms: formData.get('agreeTerms') === 'on'
        };
        
        // Validate form
        if (validateSignupForm(userData)) {
            // Check if email already exists
            if (isEmailTaken(userData.email)) {
                showToast('An account with this email already exists. Please login instead.', 'error');
                return;
            }
            
            // Create new user
            const newUser = createUser(userData);
            if (newUser) {
                signupSuccess(newUser);
            } else {
                showToast('Error creating account. Please try again.', 'error');
            }
        }
    });

    // Real-time validation for all fields
    const fields = form.querySelectorAll('input[required]');
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateSignupField(this);
        });
        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Special handling for confirm password
    const confirmPasswordField = form.querySelector('#confirmPassword');
    const passwordField = form.querySelector('#password');
    
    if (confirmPasswordField && passwordField) {
        confirmPasswordField.addEventListener('input', function() {
            if (this.value && passwordField.value) {
                validatePasswordMatch(passwordField.value, this.value);
            }
        });
    }
}

/**
 * Initialize password toggle functionality
 */
function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('#togglePassword, #toggleConfirmPassword');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = 'Hide';
            } else {
                input.type = 'password';
                this.textContent = 'Show';
            }
        });
    });
}

/**
 * Initialize success modal for signup
 */
function initializeSuccessModal() {
    const modal = document.getElementById('successModal');
    const closeButton = document.getElementById('closeModal');
    
    if (closeButton && modal) {
        closeButton.addEventListener('click', function() {
            modal.classList.remove('show');
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
}

/**
 * Validate login form
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {boolean} True if form is valid
 */
function validateLoginForm(email, password) {
    let isValid = true;
    
    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate signup form
 * @param {Object} userData - User data object
 * @returns {boolean} True if form is valid
 */
function validateSignupForm(userData) {
    let isValid = true;
    
    // Validate name
    if (!userData.name || userData.name.length < 2) {
        showFieldError('fullName', 'Please enter your full name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    if (!userData.email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(userData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!userData.phone) {
        showFieldError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(userData.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate password
    if (!userData.password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (userData.password.length < 6) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // Validate confirm password
    if (!userData.confirmPassword) {
        showFieldError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (userData.password !== userData.confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    
    // Validate terms agreement
    if (!userData.agreeTerms) {
        showFieldError('agreeTerms', 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate individual signup field
 * @param {HTMLInputElement} field - Form field to validate
 */
function validateSignupField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'fullName':
            if (!value || value.length < 2) {
                showFieldError(field.id, 'Please enter your full name (at least 2 characters)');
                return false;
            }
            break;
        case 'email':
            if (!value) {
                showFieldError(field.id, 'Email is required');
                return false;
            } else if (!isValidEmail(value)) {
                showFieldError(field.id, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'phone':
            if (!value) {
                showFieldError(field.id, 'Phone number is required');
                return false;
            } else if (!isValidPhone(value)) {
                showFieldError(field.id, 'Please enter a valid phone number');
                return false;
            }
            break;
        case 'password':
            if (!value) {
                showFieldError(field.id, 'Password is required');
                return false;
            } else if (value.length < 6) {
                showFieldError(field.id, 'Password must be at least 6 characters');
                return false;
            }
            break;
        case 'agreeTerms':
            if (!field.checked) {
                showFieldError(field.id, 'You must agree to the terms and conditions');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Validate email field
 * @param {HTMLInputElement} field - Email field
 */
function validateEmailField(field) {
    const value = field.value.trim();
    if (!value) {
        showFieldError(field.id, 'Email is required');
    } else if (!isValidEmail(value)) {
        showFieldError(field.id, 'Please enter a valid email address');
    } else {
        clearFieldError(field);
    }
}

/**
 * Validate password field
 * @param {HTMLInputElement} field - Password field
 */
function validatePasswordField(field) {
    const value = field.value;
    if (!value) {
        showFieldError(field.id, 'Password is required');
    } else if (value.length < 6) {
        showFieldError(field.id, 'Password must be at least 6 characters');
    } else {
        clearFieldError(field);
    }
}

/**
 * Validate password match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 */
function validatePasswordMatch(password, confirmPassword) {
    const confirmField = document.getElementById('confirmPassword');
    if (confirmField) {
        if (password !== confirmPassword) {
            showFieldError('confirmPassword', 'Passwords do not match');
        } else {
            clearFieldError(confirmField);
        }
    }
}

/**
 * Show field error
 * @param {string} fieldId - ID of the field
 * @param {string} message - Error message
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear field error
 * @param {HTMLInputElement} field - Form field
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Authenticate user credentials
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {Object|null} User object if authenticated, null otherwise
 */
function authenticateUser(email, password) {
    return mockUsers.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
    );
}

/**
 * Check if email is already taken
 * @param {string} email - Email to check
 * @returns {boolean} True if email exists
 */
function isEmailTaken(email) {
    return mockUsers.some(user => 
        user.email.toLowerCase() === email.toLowerCase()
    );
}

/**
 * Create new user
 * @param {Object} userData - User data
 * @returns {Object} New user object
 */
function createUser(userData) {
    const newUser = {
        id: mockUsers.length + 1,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        createdAt: new Date()
    };
    
    mockUsers.push(newUser);
    saveMockUsers();
    
    return newUser;
}

/**
 * Handle successful login
 * @param {Object} user - User object
 * @param {boolean} rememberMe - Whether to remember user
 */
function loginSuccess(user, rememberMe) {
    // Store user session (excluding password for security)
    const userSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        loginTime: new Date(),
        rememberMe: rememberMe
    };
    
    localStorage.setItem('pawfind_user', JSON.stringify(userSession));
    
    showToast(`Welcome back, ${user.name}!`, 'success');
    
    // Redirect to home page after successful login
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Handle successful signup
 * @param {Object} user - New user object
 */
function signupSuccess(user) {
    // Show success modal
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');
    }
    
    showToast('Account created successfully!', 'success');
}

// Demo login functionality for testing
function demoLogin(email = 'john@example.com', password = 'password123') {
    const user = authenticateUser(email, password);
    if (user) {
        loginSuccess(user, false);
    } else {
        showToast('Demo user not found', 'error');
    }
}

// Make demo function available globally for testing
window.demoLogin = demoLogin;