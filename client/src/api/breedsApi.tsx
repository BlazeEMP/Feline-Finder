import type Breed from '../interfaces/breedInterface';

const API_KEY = import.meta.env.VITE_THE_CAT_API;

// Fetch 100 cats from the API
export const fetchBreeds = async (): Promise<Breed[]> => {
    console.log('API-KEY', API_KEY);
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&has_breeds=1`,{
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
// TODO test in taandem with saveBreed function in insomnia
export const checkBreedExists = async (id: string): Promise<boolean> => {
    const response = await fetch(`/api/breeds/check/${id}`);
    if (!response.ok) {
        throw new Error('Failed to check breed existence');
    }
    return response.json();
};

// Save a breed to the database
// TODO test this function in insomnia
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
export const saveUserBreed = async (id: string): Promise<void> => {
    const response = await fetch('/api/user/breeds/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // TODO Delete next line? unused?
            // 'Authorization': `Bearer ${localStorage.getItem(API_KEY)}`,
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new Error('Failed to save breed to user');
    }
};