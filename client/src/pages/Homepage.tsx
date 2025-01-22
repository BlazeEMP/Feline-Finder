import React, { useState, useEffect } from 'react';
import type Breed from '../interfaces/breedInterface'; //added import for Breed jan-21-njw
import Card from '../components/Card';

const Homepage = () => {   //working on bugs and TODO list-jan-21-njw
    //state for managing breeds
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [currentBreedIndex, setCurrentBreedIndex] = useState(0);

    //fetch breeds on component mount
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await fetch('/api/breeds');
                const data = await response.json();
                setBreeds(data);
            } catch (error) {
              console.error('Error fetching breeds:', error);
            }
        };

        fetchBreeds();
    }, []);

    const currentBreed = breeds[currentBreedIndex];
    // async function handleBreedSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    const handleBreedSave = async (event: React.MouseEvent<HTMLButtonElement>) => {  //modified jan-20-njw
        event.preventDefault();
        // TODO
        // make sure logic follows this...
        // 1.) check if breed id has been saved by anyone (will be in the database in breeds table)
        // 2.) if it hasnt been saved, save it to the breeds table first then move on, if its in the breed table already, move on
        // 3.) check if the breed id has been saved by the user (will be in the database in user_breeds table under the users email)
        // 4.) if it hasnt been saved, save it to the user_breeds table under their email, if it has been saved, ignore the save request and move on
        // 5.) now that the new breed has been saved, or existing accessed, and also been saved to the user as a saved breed, we can render the next breed from our stored info from the initial API call
        // (the info should be stored in the state of the component, and we can just render the next breed in the list)
        
        try {   //modified jan-20/jan-21-njw
        //1.) check if bread exists 
        const checkResponse = await fetch(`/api/breeds/check/${currentBreed.id}`);
        const breedExists = await checkResponse.json();

        //if breed doesn't exist, save it
        if (!breedExists) {
            await fetch('/api/breeds', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(currentBreed)
            });
          }
        //2.) save to user's breeds
        const saveResponse = await fetch('/api/user/breeds/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                breedId: currentBreed.id
                // userId: currentUser.id //will need to get from auth context
            })
        });
        // move to next breed
        
        if (saveResponse.ok) {
        // Move to next breed - do we have an action for this? njw
        setCurrentBreedIndex(prev => 
          prev < breeds.length - 1 ? prev + 1 : prev
        );
      }
    } catch (error) {
      console.error('Error saving breed:', error);
    }
  };
    
  return (
    <div>
      {currentBreed && (
        <>
          <Card {...currentBreed} />
          <div>
            <button onClick={handleBreedSave}>Save Breed</button>
          </div>
        </>
      )}
    </div>
);
};

export default Homepage;        
                  
           
            
             
        
        // const breed = "someBreed"; // Replace with actual breed data
        // try {
        //     const response = await fetch('/api/saveBreed', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ breed }),
        //     });
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     const data = await response.json();
        //     console.log('Breed saved successfully:', data);
        // } catch (error) {
        //     console.error('Error saving breed:', error);
        // }
 
