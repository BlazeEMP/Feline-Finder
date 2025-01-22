import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import CardTwo from '../components/cardTwo';
import type Breed from '../interfaces/breedInterface';

const SavedCats: React.FC = () => {
    const [usersSavedCats, setUsersSavedCats] = useState<Breed[]>([]);
    //commented out original code lines 9-18 and added lines 20-36 jan-21-njw
    // Fetch saved cats from local storage
    // useEffect(() => {
    //     const savedBreeds = JSON.parse(localStorage.getItem('savedBreeds') || '{}');
    //     const breeds = JSON.parse(localStorage.getItem('breeds') || '[]');
    //     const userId = 'user1'; // Replace with the actual logged-in user ID

    //     const userids = savedBreeds[userId] || [];
    //     const userBreeds = breeds.filter((breed: Breed) => userids.includes(breed.id));

    //     setUsersSavedCats(userBreeds);
    // }, []);
    //removed local storage to fetch directly from API, added useEffect hook to fetch saved breeds jan-21-njw
    useEffect(() => {
        const fetchSavedBreeds = async () => {
          try {
            const response = await fetch('/api/user/breeds', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            const data = await response.json();
            setUsersSavedCats(data);
          } catch (error) {
            console.error('Error fetching saved breeds:', error);
          }
        };
    
        fetchSavedBreeds();
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
                        <CardTwo
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

