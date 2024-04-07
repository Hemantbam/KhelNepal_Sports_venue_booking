import React, { useState, useEffect } from 'react';

const Recent = () => {
  const [recentItems, setRecentItems] = useState([
    { id: 1, name: 'Item 1', price: 10, capacity: 50 },
    { id: 2, name: 'Item 2', price: 20, capacity: 30 },
    { id: 3, name: 'Item 3', price: 15, capacity: 40 },
    { id: 4, name: 'Item 4', price: 25, capacity: 20 },
    { id: 5, name: 'Item 5', price: 30, capacity: 35 }
  ]);

  const [visibleItems, setVisibleItems] = useState(3);
  const [showMore, setShowMore] = useState(false); // Initially hide "Show Less"
  const [showLess, setShowLess] = useState(false); // Initially hide "Show More"

  useEffect(() => {
    if (recentItems.length > visibleItems) {
      setShowMore(true); // Show "Show More" when not all items are visible
    } else {
      setShowMore(false); // Hide "Show More" when all items are visible
    }
    if (visibleItems > 3) {
      setShowLess(true); // Show "Show Less" when more than 3 items are visible
    } else {
      setShowLess(false); // Hide "Show Less" when only 3 or fewer items are visible
    }
  }, [recentItems, visibleItems]);

  const handleSeeMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };

  const handleShowLess = () => {
    setVisibleItems(prevVisibleItems => Math.max(prevVisibleItems - 10, 3));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
      <ul>
        {recentItems.slice(0, visibleItems).map((item, index) => (
          <li key={item.id} className="py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold w-6">{index + 1}</span>
              <div className="flex-1 ml-4">
                <p className="font-semibold">{item.name}</p>

                <p className="text-gray-600">Capacity: {item.capacity}</p>
              </div>
              <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                View Detail
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        {showLess && (
          <button
            onClick={handleShowLess}
            className="text-orange-600"
          >
            Show Less
          </button>
        )}
        {showMore && (
          <button
            onClick={handleSeeMore}
            className="text-orange-600"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Recent;
