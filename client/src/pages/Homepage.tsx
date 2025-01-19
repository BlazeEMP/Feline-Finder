const Homepage = () => {
    async function handleBreedSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.preventDefault();
        // TODO
        // make sure logic follows this...
        // 1.) check if breed id has been saved by anyone (will be in the database in breeds table)
        // 2.) if it hasnt been saved, save it to the breeds table first then move on, if its in the breed table already, move on
        // 3.) check if the breed id has been saved by the user (will be in the database in user_breeds table under the users email)
        // 4.) if it hasnt been saved, save it to the user_breeds table under their email, if it has been saved, ignore the save request and move on
        // 5.) now that the new breed has been saved, or existing accessed, and also been saved to the user as a saved breed, we can render the next breed from our stored info from the initial API call
        // (the info should be stored in the state of the component, and we can just render the next breed in the list)
        //
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
    }

    return (
        <div>
            <button onClick={handleBreedSave}>Save Breed</button>
        </div>
    );
};

export default Homepage;