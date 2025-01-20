import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import type Breed from '../interfaces/breedInterface';

const SavedCats: React.FC = () => {
    const [usersSavedCats, setUsersSavedCats] = useState<Breed[]>([]);

    // Fetch saved cats from local storage
    useEffect(() => {
        const savedBreeds = JSON.parse(localStorage.getItem('savedBreeds') || '{}');
        const breeds = JSON.parse(localStorage.getItem('breeds') || '[]');
        const userId = 'user1'; // Replace with the actual logged-in user ID

        const userBreedIds = savedBreeds[userId] || [];
        const userBreeds = breeds.filter((breed: Breed) => userBreedIds.includes(breed.id));

        setUsersSavedCats(userBreeds);
    }, []);

    return (
        <div>
            {usersSavedCats.length > 0 ? (
                usersSavedCats.map((breed) => (
                    <div key={breed.id}>
                        <Card
                            id={breed.id}
                            name={breed.name}
                            imgUrl={breed.imgUrl}
                            weight={breed.weight}
                            origin={breed.origin}
                            description={breed.description}
                            lifeSpan={breed.lifeSpan}
                            childFriendly={breed.childFriendly}
                            dogFriendly={breed.dogFriendly}
                            hairless={breed.hairless}
                        />
                    </div>
                ))
            ) : (
                <p>No saved cats</p>
            )}
        </div>
    );
};

export default SavedCats;