/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

function SingleBook({ books }) {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const params = useParams();
  const id = params.id * 1;
  const book = books.find((book) => book.id === id);
  if (!book) {
    return null;
  }

  const reserve = async () => {
    try {
      const response = await fetch(
        `
      https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            available: false,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error reserving book:", error);
    }
  };

  return (
    <>
      <div className="single-book">
        <h3>{book.title}</h3>
        <p>{book.description}</p>
        <h4>{book.author}</h4>
        <img src={book.coverimage} alt={`An image of ${book.title}`} />
        <br />
        <button onClick={() => navigate(`/`)}>All Books</button>
        <button onClick={() => reserve()}>Reserve this book</button>
      </div>
    </>
  );
}

export default SingleBook;
