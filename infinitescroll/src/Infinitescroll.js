// InfiniteScroll.js
import React, { useState, useRef, useEffect } from 'react';
import DataList from './DataList';

function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulate fetching more data
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const newData = [...data, ...Array.from({ length: 10 }, (_, i) => `Item ${data.length + i + 1}`)];
        setData(newData);
        setLoading(false);
      }, 1000);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        fetchData();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [data, loading]);

  return (
    <div>
      <DataList data={data} />
      {loading && <div>Loading...</div>}
      <div ref={containerRef}></div>
    </div>
  );
}

export default InfiniteScroll;
