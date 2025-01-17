const Homepage = () => {
    async function handleBreedSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.preventDefault();
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