/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Account({ auth }) {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [reservations, setReservations] = useState({});

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setReservations(json);
    } catch (error) {
      console.error("Could not fetch reservations:", error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setReservations(
        reservations.reservation?.filter((book) => book.id !== id)
      );
      return json;
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <>
      <div key={auth.id} className="profile-card">
        <p>
          {" "}
          Name: {auth.firstname} {auth.lastname}
        </p>
        <p>Email: {auth.email}</p>

        <h2>Reservations</h2>

        {reservations?.reservation?.map((book) => (
          <div key={book.id} className="book-card">
            <h4>{book.title}</h4>
            <img src={book.coverimage} alt={`An image of ${book.title}`} />
            <br />

            <button onClick={() => deleteReservation(book.id * 1)}>
              Delete this reservation
            </button>
          </div>
        ))}

        <br />
        <button onClick={() => navigate(`/books/`)}>
          Return to all books{" "}
        </button>
      </div>
    </>
  );
}

export default Account;
