import React, { useState, useEffect } from 'react';
import type Breed from '../interfaces/breedInterface';
import type DecodedToken from '../interfaces/decodedTokenInterface';
import { fetchBreeds, saveBreed, saveUserBreed } from '../api/breedsApi';
import { fetchCatFact } from '../api/catFactsApi';
import { jwtDecode } from 'jwt-decode';
import Card from '../components/Card';

function extractCatData(data: any) {
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
                const structuredData = extractCatData(data);
                setBreeds(structuredData);
            } catch (err: any) {
                console.error('Failed to fetch breeds. Please try again later.', err);
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

        const currentBreed = breeds[currentIndex];
        try {
            // Step 1: Check if the breed exists in the database (happens inside of saveBreed)
            // Step 2: If it doesn't exist, save it
            await saveBreed(currentBreed);
            // Step 3: Save the breed to the user's saved breeds now that the cat definitely exists in the table so we can join them

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found when saving userBreed join');
                return;
            }
            const decodedToken = jwtDecode<DecodedToken>(token); // token parsed out with jwtDecode library
            const userId = decodedToken.id; // userId extracted from decoded token
            await saveUserBreed(userId, currentBreed.id);

            // Fetch a new cat fact when the breed is saved
            console.log('about to fetch cat fact');
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

    const currentBreed = breeds[currentIndex];

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {currentBreed ? (
                <>
                    <Card {...currentBreed} />
                    <div className="button-container">
                        if (localStorage.getItem('token')) {
                            <button className="button" onClick={handleBreedSave}>Save Breed</button>
                        }
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