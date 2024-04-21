import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../Data/baseIndex';
import { Link } from 'react-router-dom';

const VenueName = ({ venueId }) => {
  const [venueName, setVenueName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVenueName();
  }, []);

  const fetchVenueName = async () => {
    try {
      const response = await axios.get(`${API}api/venues?id=${venueId}`);
      if (response.data.venues.length > 0) {
        setVenueName(response.data.venues[0]);
      } else {
        setVenueName(null);
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setError('Error fetching venue name');
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && venueName && (
        <Link to={`/venues/${venueName._id}`}>{venueName.name}</Link>
      )}
      {!loading && !error && !venueName && (
        <span>Deleted</span>
      )}
    </>
  );
};

export default VenueName;
