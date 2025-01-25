import React, { useEffect, useState } from 'react';
import '../styles/factCard.css';

const FactCard: React.FC = () => {
    const [fact, setFact] = useState<string>('');

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const response = await fetch('https://meowfacts.herokuapp.com/');
                const data = await response.json();
                setFact(data.data[0]);
            } catch (error) {
                console.error('Error fetching fact:', error);
            }
};
        fetchFact();
    }, []);

    return (
        <div className='fact-card'>
            <h2>Random Cat Fact:</h2>
            {fact ? <p className='fact-card-text'>{fact}</p> : <p>Loading Cat Fact!</p>}
        </div>
        );
    };
    
    export default FactCard;