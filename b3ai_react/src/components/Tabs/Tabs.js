import { useState } from 'react';
import './Tabs.css';

function TabsComponent({ tabs }) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        console.log('index', index);
        setToggleState(index);
    }

    return (
        <div className="container">
            <div className="bloc-tabs">
                {tabs.map((tab, index) => (
                    <div 
                        key={index}
                        className={toggleState === index + 1 ? "tabs active-tab" : "tabs"}
                        onClick={() => toggleTab(index + 1)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className="content-tabs">
                {tabs.map((tab, index) => (
                    <div 
                        key={index}
                        className={toggleState === index + 1 ? "content active-content" : "content"}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}



// function TabsComponent({ children }) {

//     const [toggleState, setToggleState] = useState(1);
    
//     const toggleTab = (index) => {
//         console.log('index', index);
//         setToggleState(index);
//     }

//     return (
//         <div className="container">
//             <div className="bloc-tabs">
//                 <div 
//                     className={toggleState === 1 ? "tabs active-tab" : "tabs"}
//                     onClick={() => toggleTab(1)}
//                 >
//                     Tab 1
//                 </div>
//                 <div 
//                     className={toggleState === 2 ? "tabs active-tab" : "tabs"}
//                     onClick={() => toggleTab(2)}
//                 >
//                     Tab 2
//                 </div>
//                 <div 
//                     className={toggleState === 3 ? "tabs active-tab" : "tabs"}
//                     onClick={() => toggleTab(3)}
//                 >
//                     Tab 3
//                 </div>
//             </div>
//             <div className="content-tabs">
//                 <div className="content active-content">{children}</div>
//                 <div className="content">{children}</div>
//                 <div className="content">{children}</div>
//             </div>
//         </div>
//     );
// }



export default TabsComponent ;