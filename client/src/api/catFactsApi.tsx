export const fetchCatFact = async (): Promise<string> => {
    try {
        const response = await fetch('https://meowfacts.herokuapp.com');
        if (!response.ok) {
            throw new Error('Failed to fetch cat facts');
        }
        const data = await response.json();
        return data.data[0]; // The API returns the fact in a `data` array
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        throw error;
    }
};