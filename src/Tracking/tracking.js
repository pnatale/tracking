import React, { useState } from 'react';
import axios from 'axios';
import './tracking.css';

function Tracking() {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState('DHL');
  const [error, setError] = useState('');

  const handleTrackingCodeChange = (event) => {
    setTrackingCode(event.target.value);
  };

  const handleCourierChange = (event) => {
    setSelectedCourier(event.target.value);
  };

  const handleTrackingSubmit = async (event) => {
    event.preventDefault();

    try {
      let apiUrl = '';
      let apiKey = '';

      if (selectedCourier === 'DHL') {
        apiUrl = 'https://api-eu.dhl.com/track/shipments';
        apiKey = 'hTtA04UxOo9C0Jytej9CGGv2Jv0iJ94G';
      } else if (selectedCourier === 'GLS') {
        apiUrl = 'https://api.gls-group.eu/public/v2/tracking';
        apiKey = 'nur5aN5t9dmJYGARJlzRAwySKn9z3Bds';
      }

      const response = await axios.get(`${apiUrl}?trackingNumber=${trackingCode}`, {
        headers: {
          'Accept': 'application/json',
          'DHL-API-Key': apiKey,
        //   'GLS-API-Key': apiKey,
        },
      });

      setTrackingResult(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setTrackingResult(null);
      setError('Spedizione non trovata. Controlla il codice di tracciabilità e riprova.');
    }
  };

  return (
    <div className="container">
      <h2>Tracking</h2>
      <form onSubmit={handleTrackingSubmit}>
        <div className="form-group">
          <label htmlFor="trackingCode">Numero di tracciabilità</label>
          <input
            type="text"
            id="trackingCode"
            className="form-control"
            value={trackingCode}
            onChange={handleTrackingCodeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courier">Corriere</label>
          <select id="courier" className="form-control" value={selectedCourier} onChange={handleCourierChange}>
            <option value="DHL">DHL</option>
            <option value="GLS">GLS</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Traccia</button>
      </form>
      {trackingResult && (
        <div className="mt-4">
          <h3>Risultati Tracking</h3>
          {/* Display tracking result based on selected courier */}
          {selectedCourier === 'DHL' && (
            <>
            <p>Codice tracciabilità: {trackingResult.shipments[0].id}</p>
            <p>Stato: {trackingResult.shipments[0].status.statusCode}</p>
            <p>Servizio: {trackingResult.shipments[0].service}</p>
            <p>Luogo: {trackingResult.shipments[0].status.description}</p>
            <p>
              Data di consegna prevista:{" "}
              {trackingResult.shipments[0].estimatedTimeOfDelivery}
            </p>
            <p>
              CAP di consegna:{" "}
              {trackingResult.shipments[0].destination.address.postalCode}
            </p>
            <p>
              Ultima posizione:{" "}
              {
                trackingResult.shipments[0].status.location.address
                  .addressLocality
              }
            </p>
          </>
          )}
          {selectedCourier === 'GLS' && (
            <>
              <p>Codice tracciabilità: {trackingResult.trackingNumber}</p>
              <p>Stato: {trackingResult.status}</p>
              {/* Display additional tracking information for GLS as needed */}
            </>
          )}
        </div>
      )}
      {error && <div className="alert alert-danger mt-4">{error}</div>}
    </div>
  );
}

export default Tracking;
