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

//ALTERNATE CODE FOR LINES 5-46 posted jan-21-njw
//this replaces the empty compenent with functional code, using existing Card component to display breeds, fetches saved breeds using authenticated API endpoint, displays all saved breeds in grid layout - claude.ai
// const SavedCats = () => {
// const [savedBreeds, setSavedBreeds] = useState<Breed[]>([]);

// useEffect(() => {
//  const fetchSavedBreeds = async () => {
//    const response = await fetch('/api/user/breeds', {
//     headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
// });
//   const data = await response.json();
//    setSavedBreeds(data);
//   } catch (error) {
//     console.error('Error fetching saved breeds:', error);
//   }
// };

// fetchSavedBreeds();
// }, []);

// return (
//  <div>
//     <h1>My Saved Cat Breeds</h1>
//       <div className="breeds-grid">
//       {savedBreeds.map((breed) => (
//         <Card key={breed.id} {...breed} />
//     ))}
//   </div>
// </div>
//   );
// };
