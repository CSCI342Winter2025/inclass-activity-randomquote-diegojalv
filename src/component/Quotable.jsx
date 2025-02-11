// src/components/Quotable.jsx
import React, { useState, useEffect } from "react"; // Import necessary hooks
import "./quote.css"; // Ensure you have your CSS set up for styling

function Quotable() {
  // Step 1: Initialize state variables.
  const [quotes, setQuotes] = useState([]); // Array to hold fetched quotes
  const [loading, setLoading] = useState(false); // Loading state indicator
  const [error, setError] = useState(null); // Error message state
  const [selectedCategory] = useState(""); // For consistency, although ZenQuotes doesn't support categories directly

  // Step 2: Create a function "updateQuote" to fetch a random quote from the ZenQuotes API.
  const updateQuote = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Reset any previous error

    try {
      // Make a GET request to the ZenQuotes API using a CORS proxy
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      // Extract the first element from the response array
      const data = await response.json();
      const newQuote = data[0];

      // Append the new quote to the "quotes" array
      setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
    } catch (err) {
      // Update the error state with the error message
      setError(err.message);
    } finally {
      // Set the loading state to false
      setLoading(false);
    }
  };

  // Step 3: Use useEffect to fetch an initial quote when the component mounts.
  useEffect(() => {
    updateQuote();
  }, []);

  // Step 4: Create a function "deleteQuote" to delete a single quote.
  const deleteQuote = (indexToDelete) => {
    // Update the quotes state by filtering out the quote at indexToDelete
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
              <button className="delete-btn" onClick={() => deleteQuote(index)}>
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