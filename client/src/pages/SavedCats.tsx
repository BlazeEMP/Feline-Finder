import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Card from '../components/Card';
import type Breed from '../interfaces/breedInterface';

const SavedCats: React.FC = () => {
    const [usersSavedCats, setUsersSavedCats] = useState<Breed[]>([]);
    // use this when parsing from JWT since type of id doesnt exist in JWTPayload but can be parsed out from it
    interface DecodedToken {
        id: string;
        // add other properties if needed
    }
    
    //removed local storage to fetch directly from API, added useEffect hook to fetch saved breeds jan-21-njw
    useEffect(() => {
        const fetchSavedBreeds = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const decodedToken = jwtDecode<DecodedToken>(token); // token parsed out with jwtDecode library
                const userId = decodedToken.id; // userId extracted from decoded token
                const response = await fetch(`/api/userBreeds/${userId}`, {
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