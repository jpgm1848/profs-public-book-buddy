import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const Books = ({ books }) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <br /> <br />
      <input
        value={params.term || ""}
        onChange={(ev) =>
          navigate(
            ev.target.value ? `/books/search/${ev.target.value}` : "/books"
          )
        }
      />
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
    </>
  );
};

export default Books;
