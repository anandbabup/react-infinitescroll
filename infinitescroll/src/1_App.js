import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
    const observeMeColumn1Ref = useRef(null);
    const observeMeColumn2Ref = useRef(null);

    useEffect(() => {
        const options = {
            root: null, // Use the document's viewport as the root by default
            rootMargin: '0px',
            threshold: 0.5,
        };

        // Observer for elements in column 1
        const observerColumn1 = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('Element in column 1 is in the viewport!');
                } else {
                    console.log('Element in column 1 is out of the viewport.');
                }
            });
        }, options);

        // Observer for elements in column 2
        const observerColumn2 = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('Element in column 2 is in the viewport!');
                } else {
                    console.log('Element in column 2 is out of the viewport.');
                }
            });
        }, options);

        if (observeMeColumn1Ref.current) {
            observerColumn1.observe(observeMeColumn1Ref.current);
        }

        if (observeMeColumn2Ref.current) {
            observerColumn2.observe(observeMeColumn2Ref.current);
        }

        // Cleanup: Disconnect the observers when the component unmounts
        return () => {
            if (observeMeColumn1Ref.current) {
                observerColumn1.unobserve(observeMeColumn1Ref.current);
            }

            if (observeMeColumn2Ref.current) {
                observerColumn2.unobserve(observeMeColumn2Ref.current);
            }
        };
    }, []);

    return (
        <div>
            <h1>IntersectionObserver Example</h1>

            <div className="row">
                <div className="column">
                    {/* Content in the first column */}
                    <div ref={observeMeColumn1Ref} className="observe-me"
                    style={{
                        backgroundColor: 'lightblue',
                    }}
                    >
                        Element in column 1 to observe
                    </div>
                </div>
                <div className="column">
                    {/* Content in the second column */}
                    <div
                        ref={observeMeColumn2Ref}
                        className="observe-me"
                        style={{
                            height: '200vh', // Make column 2 taller to enable scrolling
                            backgroundColor: 'lightgray',
                        }}
                    >
                        Element in column 2
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
