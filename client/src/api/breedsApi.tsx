import type Breed from '../interfaces/breedInterface';

const API_KEY = import.meta.env.VITE_THE_CAT_API;

// Fetch 100 cats from the API
export const fetchBreeds = async (): Promise<Breed[]> => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=50&has_breeds=1`, {
        headers: {
            'x-api-key': API_KEY,
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch breeds');
    }
    return response.json();
};

// Check if a breed exists in the database
// TODO test in tandem with saveBreed function
export const checkBreedExists = async (breedId: string): Promise<boolean> => {
    const response = await fetch(`/api/breeds/${breedId}`);
    if (!response.ok) {
        return false;
    }
    return true;
};

// Save a breed to the database
// TODO test this function
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
// TODO fix to route to userBreeds saving by user id of logged in user decoded from JWT
export const saveUserBreed = async (userId: number, breedId: string): Promise<void> => {
    const response = await fetch(`/api/userBreeds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // TODO add auth implemented on adding breeds through table, should check JWT for auth and userID
        },
        body: JSON.stringify({ userId, breedId }),
    });
    if (!response.ok) {
        throw new Error('Failed to save breed to user');
    }
};