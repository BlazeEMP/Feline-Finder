import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import type Breed from '../interfaces/breedInterface';

const SavedCats: React.FC = () => {
    const [usersSavedCats, setUsersSavedCats] = useState<Breed[]>([]);
    
    //removed local storage to fetch directly from API, added useEffect hook to fetch saved breeds jan-21-njw
    useEffect(() => {
        const fetchSavedBreeds = async () => {
            try {
                // const token = localStorage.getItem('token');// TODO get user id from JWT token;
                // const userId = ; // token parsed out user id
                // TODO change userId back to variable when we have JWT token
                const response = await fetch(`/api/userBreeds/${1}`, {
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
                    </div>
                ))
            ) : (
                <p>No saved cats</p>
            )}
        </div>
    );
};

export default SavedCats;