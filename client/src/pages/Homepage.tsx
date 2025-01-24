import React, { useState, useEffect } from 'react';
import type Breed from '../interfaces/breedInterface';
import { fetchBreeds, checkBreedExists, saveBreed, saveUserBreed } from '../api/breedsApi';
import { fetchCatFact } from '../api/catFactsApi';
import Card from '../components/Card';

const Homepage: React.FC = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [catFact, setCatFact] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBreeds = async () => {
            try {
                const data = await fetchBreeds();
                setBreeds(data);
            } catch (err) {
                setError('Failed to fetch breeds. Please try again later.');
                console.error(err);
            }
        };

        loadBreeds();
    }, []);

    useEffect(() => {
        const loadCatFact = async () => {
            try {
                const fact = await fetchCatFact();
                setCatFact(fact);
            } catch (err) {
                console.error('Error fetching cat fact:', err);
                setError('Failed to load cat fact. Please try again later.');
            }
        };

        loadCatFact();
    }, []);

    const handleBreedSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!breeds.length) return;

        const currentBreed = breeds[currentIndex];
        try {
            // Step 1: Check if the breed exists in the database
            const breedExists = await checkBreedExists(currentBreed.id);

            // Step 2: If it doesn't exist, save it
            if (!breedExists) {
                await saveBreed(currentBreed);
            }

            // Step 3: Save the breed to the user's saved breeds
            await saveUserBreed(currentBreed.name);

            // Step 4: Move to the next breed
            setCurrentIndex((prevIndex) =>
                prevIndex < breeds.length - 1 ? prevIndex + 1 : 0 // Loop back to the start
            );
        } catch (err) {
            setError('Failed to save breed. Please try again.');
            console.error(err);
        }
    };

    const handleNextBreed = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < breeds.length - 1 ? prevIndex + 1 : 0 // Loop back to the start
        );
    };

    const currentBreed = breeds[currentIndex];

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {currentBreed ? (
                <>
                    <Card {...currentBreed} />
                    <div>
                        <button onClick={handleBreedSave}>Save Breed</button>
                        <button onClick={handleNextBreed}>Next Breed</button>
                    </div>
                </>
            ) : (
                <p>Loading breeds...</p>
            )}
            {catFact ? (
                <div>
                <h3>Random Cat Fact!</h3>
                <p>{catFact}</p>
                </div>
            ) : (
                <p>Loading cat fact...</p>

            )}
        </div>
    );
};

export default Homepage;
 
