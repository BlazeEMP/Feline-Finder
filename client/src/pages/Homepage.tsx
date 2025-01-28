import React, { useState, useEffect } from 'react';
import type Breed from '../interfaces/breedInterface';
import { fetchBreeds, saveBreed, saveUserBreed } from '../api/breedsApi';
import { fetchCatFact } from '../api/catFactsApi';
import Card from '../components/Card';

function extractCatData(data: any) {
    //TODO: Extract the data from the API response and and map through the array of objects to return the required data
    return data.map((item: any) => {
        const {
            breeds: [
                {
                    weight: { imperial: weight },
                    id,
                    name,
                    origin,
                    description,
                    life_span: lifeSpan,
                    child_friendly: childFriendly,
                    dog_friendly: dogFriendly,
                    hairless,
                },
            ],
            url: imgUrl, // Extract the image URL from the top level
        } = item;

        return {
            id,
            name,
            imgUrl,
            weight,
            lifeSpan,
            origin,
            hairless: Boolean(hairless), // Convert 0/1 to boolean
            description,
            childFriendly,
            dogFriendly,
        };
    });
}

const Homepage: React.FC = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [catFact, setCatFact] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBreeds = async () => {
            try {
                const data = await fetchBreeds();
                // TODO : Set the breeds state with the fetched data but we need to structure the saved items to match our interface for breed
                console.log('data from fetchBreeds():', data); // TODO: Remove this line
                const structuredData = extractCatData(data);
                console.log('structuredData from extractCatData():', structuredData); // TODO: Remove this line
                setBreeds(structuredData);
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
            // Step 1: Check if the breed exists in the database (happens inside of saveBreed)
            // Step 2: If it doesn't exist, save it
            await saveBreed(currentBreed);

            // Step 3: Save the breed to the user's saved breeds now that the cat definitely exists in the table so we can join them
            await saveUserBreed(currentBreed.name);

            // Fetch a new cat fact when the breed is saved
            const fact = await fetchCatFact();
            setCatFact(fact);

            // Step 4: Move to the next breed
            setCurrentIndex((prevIndex) =>
                prevIndex < breeds.length - 1 ? prevIndex + 1 : 0 // Loop back to the start
            );
        } catch (err) {
            setError('Failed to save breed. Please try again.');
            console.error(err);
        }
    };

    const handleNextBreed = async () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < breeds.length - 1 ? prevIndex + 1 : 0 // Loop back to the start
        );

        // Fetch a new cat fact when the next breed is displayed
        const fact = await fetchCatFact();
        setCatFact(fact);
    };

    // this will handle loading a breed once the breeds array gets populated or we update the index
    const currentBreed = breeds[currentIndex];
    console.log(currentBreed); // TODO: Remove this line

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {currentBreed ? (
                <>
                    <Card {...currentBreed} />
                    <div className="button-container">
                        <button className="button" onClick={handleBreedSave}>Save Breed</button>
                        <button className="button" onClick={handleNextBreed}>Next Breed</button>
                    </div>
                </>
            ) : (
                <p>Loading breeds...</p>
            )}
            {catFact ? (
                <div className="fact-card">
                    <h3>Random Cat Fact!</h3>
                    <p className="fact-card-text">{catFact}</p>
                </div>
            ) : (
                <p>Loading cat fact...</p>

            )}
        </div>
    );
};

export default Homepage;