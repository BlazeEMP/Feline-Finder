// This is a factCard component that can be used in the App component. It fetches a random cat fact from an API and displays it on the page. The fact is fetched when the component mounts and is stored in state. The fact is displayed in a paragraph element with the class 'fact-card-text'. If the fact has not been fetched yet, a loading message is displayed instead. The component is styled with the 'fact-card' class.

// import React, { useEffect, useState } from 'react';

// const FactCard: React.FC = () => {
//     const [fact, setFact] = useState<string>('');

//     useEffect(() => {
//         const fetchFact = async () => {
//             try {
//                 const response = await fetch('https://meowfacts.herokuapp.com/');
//                 const data = await response.json();
//                 setFact(data.data[0]);
//             } catch (error) {
//                 console.error('Error fetching fact:', error);
//             }
// };
//         fetchFact();
//     }, []);

//     return (
//         <div className='fact-card'>
//             <h3>Random Cat Fact:</h3>
//             {fact ? <p className='fact-card-text'>{fact}</p> : <p>Loading Cat Fact!</p>}
//         </div>
//         );
//     };
    
//     export default FactCard;