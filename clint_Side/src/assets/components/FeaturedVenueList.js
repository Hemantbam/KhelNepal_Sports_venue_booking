import React,{useState} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isMoving, setIsMoving] = useState(false);
  const cardData = [
    { id: 1, title: "Beach House", price: "$200/night", location: "Maldives", imageUrl: "https://via.placeholder.com/300" },
    { id: 2, title: "Mountain Cabin", price: "$150/night", location: "Switzerland", imageUrl: "https://via.placeholder.com/300" },
    { id: 3, title: "City Apartment", price: "$100/night", location: "New York", imageUrl: "https://via.placeholder.com/300" },
    { id: 4, title: "Lake Cottage", price: "$180/night", location: "Canada", imageUrl: "https://via.placeholder.com/300" }
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <Carousel
    responsive={responsive}
    ssr
    infinite={false}
    beforeChange={() => setIsMoving(true)}
    afterChange={() => setIsMoving(false)}
    containerClass="carousel-container"
    itemClass="carousel-item"
    >
      {cardData.map(card => (
        <div key={card.id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img className="w-full h-60 object-cover object-center" src={card.imageUrl} alt={card.title} />
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h2>
            <p className="text-gray-600 mb-2">{card.price}</p>
            <p className="text-gray-600 mb-4">{card.location}</p>
            <Link to={`/venues/1212`} className="px-3 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300">Book now</Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Index;
