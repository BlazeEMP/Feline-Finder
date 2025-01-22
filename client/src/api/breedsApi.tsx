import type Breed from '../interfaces/breedInterface';

// Fetch all breeds from the API
export const fetchBreeds = async (): Promise<Breed[]> => {
    const response = await fetch('/api/breeds');
    if (!response.ok) {
        throw new Error('Failed to fetch breeds');
    }
    return response.json();
};

// Check if a breed exists in the database
export const checkBreedExists = async (breedId: string): Promise<boolean> => {
    const response = await fetch(`/api/breeds/check/${breedId}`);
    if (!response.ok) {
        throw new Error('Failed to check breed existence');
    }
    return response.json();
};

// Save a breed to the database
export const saveBreed = async (breed: Breed): Promise<void> => {
    const response = await fetch('/api/breeds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(breed),
    });
    if (!response.ok) {
        throw new Error('Failed to save breed');
    }
};

// Save a breed to a user's saved breeds
export const saveUserBreed = async (breedId: string): Promise<void> => {
    const response = await fetch('/api/user/breeds/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ breedId }),
    });
    if (!response.ok) {
        throw new Error('Failed to save breed to user');
    }
};