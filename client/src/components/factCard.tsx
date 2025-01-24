// TODO: Create a card component that will display a fact about cats by making an API call to an API that provides random facts about cats. The fact that is displayed will be completely random and everytime the user refreshes the page, a new fact will be displayed. The user will not be able to interact with, save or store these facts, they are just a fun little add on to the application to enhance the user experience. The api that will be used is coming from https://github.com/wh-iterabb-it/meowfacts. 

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