import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const Books = ({ books }) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <br /> <br />
      <label htmlFor="name" className="search-label">
        Search (case sensitive):{" "}
      </label>
      <input
        name="name"
        id="name"
        value={params.term || ""}
        onChange={(ev) =>
          navigate(
            ev.target.value ? `/books/search/${ev.target.value}` : "/books"
          )
        }
      />
      <div className="books-title">
        <h2>All Books</h2>
      </div>
      <div className="all-books">
        {books
          .filter((book) => !params.term || book.title.includes(params.term))
          .map((book) => (
            <div key={book.id} className="book-card">
              <h4>{book.title}</h4>

              <br />
              <button onClick={() => navigate(`/books/${book.id}`)}>
                View Details
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Books;
