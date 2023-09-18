import React, { Children, useEffect, useRef } from 'react';

function ScrollToBottomDetector({children, onReachBottom}) {
  const containerRef = useRef();

  const handleScroll = () => {
    const container = containerRef.current;

    console.log('scrolltop', container.scrollTop);
    console.log('clienthei', container.clientHeight);
    console.log('scrollhei', container.scrollHeight);
    console.log(container.scrollTop + container.clientHeight >= container.scrollHeight)

    // Check if the user has scrolled to the bottom
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      onReachBottom();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ overflowY: 'scroll', height: '300px', border:'1px solid grey' }}>
     {children}
    </div>
  );
}

export default ScrollToBottomDetector;
