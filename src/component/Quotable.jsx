import React, { useState, useEffect } from "react";
import "./quote.css"; // Ensure you have your CSS set up for styling

function Quotable() {
  // Step 1: Initialize state variables.
  const [quotes, setQuotes] = useState([]); // Array to hold fetched quotes
  const [loading, setLoading] = useState(false); // Loading state indicator
  const [error, setError] = useState(null); // Error message state

  // Step 2: Create a function "updateQuote" to fetch a random quote from the ZenQuotes API.
  const updateQuote = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Log the API response
  
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("No quote found in the response");
      }
  
      setQuotes((prevQuotes) => [...prevQuotes, data[0]]);
    } catch (err) {
      console.error("Fetch error:", err); // Log the error
      setError(`Failed to fetch quote: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Use useEffect to fetch an initial quote when the component mounts.
  useEffect(() => {
    updateQuote(); // Fetch an initial quote when the component mounts
  }, []);

  // Step 4: Create a function "deleteQuote" to delete a single quote.
  const deleteQuote = (indexToDelete) => {
    setQuotes((prevQuotes) =>
      prevQuotes.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="app-container">
      <h1 className="title">Random Quote Generator</h1>

      {/* Step 5: Render a button to fetch a new quote */}
      <button className="btn1" onClick={updateQuote}>
        New Quote
      </button>

      {/* Step 6: Display loading and error messages if applicable */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Step 7: Display the list of fetched quotes */}
      <div className="quotes-container">
        {quotes.length === 0 && !loading ? (
          <p>No quotes available. Click "New Quote" to fetch one.</p>
        ) : (
          quotes.map((quote, index) => (
            <div key={quote._id ? quote._id : index} className="quote-card">
              {/* Display the quote content */}
              <p className="quote-content">{quote.q}</p>
              {/* Conditionally display the author if available */}
              {quote.a && <p className="quote-author">— {quote.a}</p>}
              {/* Attach the deleteQuote function to the onClick event of this button, passing the current index */}
              <button
                className="delete-btn"
                onClick={() => deleteQuote(index)}
              >
                Delete Quote
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Quotable;