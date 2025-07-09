/**
 * Adoption page JavaScript for PawFind Pet Adoption Website
 * Handles pet data, filtering, searching, and adoption modal functionality
 */

// Mock pet data - in a real application, this would come from a database
const mockPets = [
    {
        id: 1,
        name: 'Buddy',
        species: 'dog',
        breed: 'Golden Retriever',
        age: 3,
        ageGroup: 'adult',
        gender: 'male',
        size: 'large',
        description: 'Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He gets along great with children and other dogs.',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 250
    },
    {
        id: 2,
        name: 'Luna',
        species: 'cat',
        breed: 'Siamese Mix',
        age: 2,
        ageGroup: 'adult',
        gender: 'female',
        size: 'medium',
        description: 'Luna is a beautiful and affectionate Siamese mix who loves to cuddle and play with feather toys. She would do best as the only cat in the home.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: false,
        adoptionFee: 150
    },
    {
        id: 3,
        name: 'Max',
        species: 'dog',
        breed: 'German Shepherd',
        age: 5,
        ageGroup: 'adult',
        gender: 'male',
        size: 'large',
        description: 'Max is a loyal and intelligent German Shepherd looking for an experienced owner. He knows basic commands and would make an excellent guard dog.',
        image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: false,
        goodWithPets: false,
        adoptionFee: 300
    },
    {
        id: 4,
        name: 'Whiskers',
        species: 'cat',
        breed: 'Maine Coon',
        age: 1,
        ageGroup: 'young',
        gender: 'male',
        size: 'large',
        description: 'Whiskers is a playful Maine Coon kitten with a gorgeous coat. He loves to explore and would do well in a home with other cats.',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: false,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 200
    },
    {
        id: 5,
        name: 'Bella',
        species: 'dog',
        breed: 'Labrador Mix',
        age: 8,
        ageGroup: 'senior',
        gender: 'female',
        size: 'medium',
        description: 'Bella is a sweet senior dog who enjoys gentle walks and lots of love. She would be perfect for a quiet home looking for a calm companion.',
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 100
    },
    {
        id: 6,
        name: 'Shadow',
        species: 'cat',
        breed: 'Black Domestic Shorthair',
        age: 4,
        ageGroup: 'adult',
        gender: 'male',
        size: 'medium',
        description: 'Shadow is a mysterious and independent black cat who enjoys quiet moments and gentle pets. He would thrive in a calm household.',
        image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 125
    },
    {
        id: 7,
        name: 'Charlie',
        species: 'dog',
        breed: 'Beagle',
        age: 2,
        ageGroup: 'adult',
        gender: 'male',
        size: 'medium',
        description: 'Charlie is an energetic Beagle who loves to explore and follow scents. He would be great for an active family who enjoys outdoor adventures.',
        image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 225
    },
    {
        id: 8,
        name: 'Mittens',
        species: 'cat',
        breed: 'Calico',
        age: 6,
        ageGroup: 'adult',
        gender: 'female',
        size: 'small',
        description: 'Mittens is a beautiful calico cat with a gentle personality. She loves sunbathing by windows and would make a wonderful lap cat.',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 175
    },
    {
        id: 9,
        name: 'Rocky',
        species: 'dog',
        breed: 'Bulldog',
        age: 4,
        ageGroup: 'adult',
        gender: 'male',
        size: 'medium',
        description: 'Rocky is a laid-back bulldog who enjoys short walks and lots of naps. He would be perfect for someone looking for a low-energy companion.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 275
    },
    {
        id: 10,
        name: 'Daisy',
        species: 'rabbit',
        breed: 'Holland Lop',
        age: 1,
        ageGroup: 'young',
        gender: 'female',
        size: 'small',
        description: 'Daisy is an adorable Holland Lop rabbit who loves to hop around and eat fresh vegetables. She would be great for a family with children.',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: true,
        houseTrained: true,
        goodWithKids: true,
        goodWithPets: true,
        adoptionFee: 75
    },
    {
        id: 11,
        name: 'Tweety',
        species: 'bird',
        breed: 'Canary',
        age: 2,
        ageGroup: 'adult',
        gender: 'male',
        size: 'small',
        description: 'Tweety is a cheerful canary who loves to sing beautiful songs. He would brighten up any home with his melodic voice.',
        image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: false,
        houseTrained: false,
        goodWithKids: true,
        goodWithPets: false,
        adoptionFee: 50
    },
    {
        id: 12,
        name: 'Coco',
        species: 'bird',
        breed: 'Cockatiel',
        age: 3,
        ageGroup: 'adult',
        gender: 'female',
        size: 'small',
        description: 'Coco is a smart and social cockatiel who can learn tricks and mimic sounds. She would love an interactive owner who can spend time with her.',
        image: 'https://images.unsplash.com/photo-1544923408-75c5cef46eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        vaccinated: true,
        spayedNeutered: false,
        houseTrained: false,
        goodWithKids: true,
        goodWithPets: false,
        adoptionFee: 125
    }
];

// Current filter state
let currentFilters = {
    search: '',
    species: '',
    age: ''
};

// Current pets being displayed
let displayedPets = [...mockPets];

// Initialize adoption page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAdoptionPage();
});

/**
 * Initialize all adoption page functionality
 */
function initializeAdoptionPage() {
    setupSearchAndFilters();
    setupAdoptionModal();
    displayPets(mockPets);
    updatePetCount(mockPets.length);
}

/**
 * Setup search and filter functionality
 */
function setupSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const speciesFilter = document.getElementById('speciesFilter');
    const ageFilter = document.getElementById('ageFilter');
    const clearFilters = document.getElementById('clearFilters');
    const resetSearch = document.getElementById('resetSearch');

    // Search functionality with debounce
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            currentFilters.search = this.value.toLowerCase().trim();
            filterAndDisplayPets();
        }, 300));
    }

    // Species filter
    if (speciesFilter) {
        speciesFilter.addEventListener('change', function() {
            currentFilters.species = this.value;
            filterAndDisplayPets();
        });
    }

    // Age filter
    if (ageFilter) {
        ageFilter.addEventListener('change', function() {
            currentFilters.age = this.value;
            filterAndDisplayPets();
        });
    }

    // Clear all filters
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            clearAllFilters();
        });
    }

    // Reset search (show all pets)
    if (resetSearch) {
        resetSearch.addEventListener('click', function() {
            clearAllFilters();
        });
    }
}

/**
 * Filter pets based on current filter settings and display results
 */
function filterAndDisplayPets() {
    let filteredPets = mockPets.filter(pet => {
        // Search filter
        if (currentFilters.search && 
            !pet.name.toLowerCase().includes(currentFilters.search) &&
            !pet.breed.toLowerCase().includes(currentFilters.search)) {
            return false;
        }

        // Species filter
        if (currentFilters.species && pet.species !== currentFilters.species) {
            return false;
        }

        // Age filter
        if (currentFilters.age && pet.ageGroup !== currentFilters.age) {
            return false;
        }

        return true;
    });

    displayedPets = filteredPets;
    displayPets(filteredPets);
    updatePetCount(filteredPets.length);
    
    // Show/hide no results message
    const noPetsMessage = document.getElementById('noPetsMessage');
    if (noPetsMessage) {
        if (filteredPets.length === 0) {
            noPetsMessage.classList.remove('hidden');
        } else {
            noPetsMessage.classList.add('hidden');
        }
    }
}

/**
 * Clear all filters and show all pets
 */
function clearAllFilters() {
    // Reset filter inputs
    const searchInput = document.getElementById('searchInput');
    const speciesFilter = document.getElementById('speciesFilter');
    const ageFilter = document.getElementById('ageFilter');

    if (searchInput) searchInput.value = '';
    if (speciesFilter) speciesFilter.value = '';
    if (ageFilter) ageFilter.value = '';

    // Reset filter state
    currentFilters = {
        search: '',
        species: '',
        age: ''
    };

    // Display all pets
    displayedPets = [...mockPets];
    displayPets(mockPets);
    updatePetCount(mockPets.length);
    
    // Hide no results message
    const noPetsMessage = document.getElementById('noPetsMessage');
    if (noPetsMessage) {
        noPetsMessage.classList.add('hidden');
    }
}

/**
 * Display pets in the grid
 * @param {Array} pets - Array of pet objects to display
 */
function displayPets(pets) {
    const petsGrid = document.getElementById('petsGrid');
    if (!petsGrid) return;

    if (pets.length === 0) {
        petsGrid.innerHTML = '<p class="text-center">No pets available at the moment.</p>';
        return;
    }

    petsGrid.innerHTML = pets.map(pet => createPetCard(pet)).join('');
}

/**
 * Create HTML for a pet card
 * @param {Object} pet - Pet object
 * @returns {string} HTML string for pet card
 */
function createPetCard(pet) {
    const ageText = pet.age === 1 ? '1 year' : `${pet.age} years`;
    
    return `
        <div class="card pet-card" data-pet-id="${pet.id}">
            <img src="${pet.image}" alt="${pet.name}" onerror="this.src='https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
            <div class="pet-info">
                <span class="pet-age">${ageText} old</span>
                <h3>${pet.name}</h3>
                <p class="pet-breed">${pet.breed}</p>
                <p class="mb-1">${pet.description}</p>
                
                <div class="pet-details" style="margin: 1rem 0; font-size: 0.9rem; color: var(--text-light);">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                        ${pet.vaccinated ? '<span style="background: var(--accent); color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">✓ Vaccinated</span>' : ''}
                        ${pet.spayedNeutered ? '<span style="background: var(--secondary); color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">✓ Spayed/Neutered</span>' : ''}
                        ${pet.houseTrained ? '<span style="background: var(--primary); color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">✓ House Trained</span>' : ''}
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${pet.goodWithKids ? '<span style="color: var(--accent);">👶 Good with kids</span>' : ''}
                        ${pet.goodWithPets ? '<span style="color: var(--secondary);">🐾 Good with pets</span>' : ''}
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <span style="font-weight: bold; color: var(--primary); font-size: 1.1rem;">
                        $${pet.adoptionFee} adoption fee
                    </span>
                    <button class="btn btn-primary btn-adopt" data-pet-id="${pet.id}">
                        Adopt Me! ❤️
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update the pet count display
 * @param {number} count - Number of pets currently displayed
 */
function updatePetCount(count) {
    const petCount = document.getElementById('petCount');
    if (petCount) {
        if (count === 0) {
            petCount.innerHTML = '<p>No pets match your search criteria</p>';
        } else if (count === 1) {
            petCount.innerHTML = '<p>Showing 1 adorable pet waiting for a home</p>';
        } else {
            petCount.innerHTML = `<p>Showing ${count} adorable pets waiting for their homes</p>`;
        }
    }
}

/**
 * Setup adoption modal functionality
 */
function setupAdoptionModal() {
    const modal = document.getElementById('adoptionModal');
    const closeButton = document.getElementById('closeAdoptionModal');
    const adoptionForm = document.getElementById('adoptionForm');

    // Handle adopt button clicks (event delegation)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-adopt')) {
            const petId = parseInt(event.target.getAttribute('data-pet-id'));
            openAdoptionModal(petId);
        }
    });

    // Close modal functionality
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeAdoptionModal();
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeAdoptionModal();
            }
        });
    }

    // Handle form submission
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitAdoptionApplication();
        });
    }

    // Set minimum date to tomorrow
    const adoptionDateInput = document.getElementById('adoptionDate');
    if (adoptionDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        adoptionDateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

/**
 * Open adoption modal for specific pet
 * @param {number} petId - ID of the pet to adopt
 */
function openAdoptionModal(petId) {
    const pet = mockPets.find(p => p.id === petId);
    if (!pet) return;

    const modal = document.getElementById('adoptionModal');
    const petNameInput = document.getElementById('petName');
    
    if (petNameInput) {
        petNameInput.value = pet.name;
    }

    // Pre-fill user data if logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        const applicantName = document.getElementById('applicantName');
        const applicantEmail = document.getElementById('applicantEmail');
        const applicantPhone = document.getElementById('applicantPhone');
        
        if (applicantName) applicantName.value = currentUser.name;
        if (applicantEmail) applicantEmail.value = currentUser.email;
        if (applicantPhone) applicantPhone.value = currentUser.phone || '';
    }

    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * Close adoption modal
 */
function closeAdoptionModal() {
    const modal = document.getElementById('adoptionModal');
    const form = document.getElementById('adoptionForm');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    if (form) {
        form.reset();
    }
}

/**
 * Submit adoption application
 */
function submitAdoptionApplication() {
    const form = document.getElementById('adoptionForm');
    const formData = new FormData(form);
    
    // Get form data
    const applicationData = {
        petName: formData.get('petName') || document.getElementById('petName').value,
        applicantName: formData.get('applicantName') || document.getElementById('applicantName').value,
        applicantEmail: formData.get('applicantEmail') || document.getElementById('applicantEmail').value,
        applicantPhone: formData.get('applicantPhone') || document.getElementById('applicantPhone').value,
        applicantAddress: formData.get('applicantAddress') || document.getElementById('applicantAddress').value,
        adoptionDate: formData.get('adoptionDate') || document.getElementById('adoptionDate').value,
        experience: formData.get('experience') || document.getElementById('experience').value,
        additionalInfo: formData.get('additionalInfo') || document.getElementById('additionalInfo').value || 'No additional information provided'
    };

    // Basic validation
    if (!applicationData.applicantName || !applicationData.applicantEmail || 
        !applicationData.applicantPhone || !applicationData.applicantAddress || 
        !applicationData.adoptionDate || !applicationData.experience) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Validate email
    if (!isValidEmail(applicationData.applicantEmail)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Validate phone
    if (!isValidPhone(applicationData.applicantPhone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    // Validate adoption date (must be in the future)
    const selectedDate = new Date(applicationData.adoptionDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) {
        showToast('Please select a future date for adoption', 'error');
        return;
    }

    // Simulate application submission
    setTimeout(() => {
        // Store application (in real app, this would go to a server)
        storeAdoptionApplication(applicationData);
        
        // Close modal
        closeAdoptionModal();
        
        // Show success message
        showToast(`Thank you! Your adoption application for ${applicationData.petName} has been submitted. We'll contact you within 24-48 hours.`, 'success', 5000);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 1000);
}

/**
 * Store adoption application (mock function)
 * @param {Object} applicationData - Application data
 */
function storeAdoptionApplication(applicationData) {
    // In a real application, this would send data to a server
    const applications = JSON.parse(localStorage.getItem('pawfind_applications') || '[]');
    
    const application = {
        id: generateId(),
        ...applicationData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };
    
    applications.push(application);
    localStorage.setItem('pawfind_applications', JSON.stringify(applications));
    
    console.log('Application stored:', application);
}

/**
 * Get pet by ID
 * @param {number} petId - Pet ID
 * @returns {Object|null} Pet object or null if not found
 */
function getPetById(petId) {
    return mockPets.find(pet => pet.id === petId);
}

/**
 * Get pets by species
 * @param {string} species - Species to filter by
 * @returns {Array} Array of pets matching the species
 */
function getPetsBySpecies(species) {
    return mockPets.filter(pet => pet.species === species);
}

/**
 * Get pets by age group
 * @param {string} ageGroup - Age group to filter by
 * @returns {Array} Array of pets matching the age group
 */
function getPetsByAgeGroup(ageGroup) {
    return mockPets.filter(pet => pet.ageGroup === ageGroup);
}

// Make functions available globally for debugging
window.adoptionPageFunctions = {
    getPetById,
    getPetsBySpecies,
    getPetsByAgeGroup,
    clearAllFilters,
    mockPets
};