import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import bookLogo from "./assets/books.png";
import Books from "./components/Books";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";

function App() {
  const [books, setBooks] = useState([]);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const attemptLoginWithToken = async () => {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    };
    const token = window.localStorage.getItem("token");
    if (token) {
      attemptLoginWithToken();
    }
  }, []);

  const login = async (credentials) => {
    let response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    if (response.ok) {
      const token = json.token;
      window.localStorage.setItem("token", token);
      response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    } else {
      console.log(json);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
      );
      const json = await response.json();
      setBooks(json.books);
    };
    fetchBooks();
  }, []);

  const register = async (payload) => {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: payload.firstName,
            lastname: payload.lastName,
            email: payload.email,
            password: payload.password,
          }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        console.log("Registration successful:", json);
        // Optionally, you can redirect the user to a different page after successful registration
      } else {
        console.error("Registration failed:", json);
      }
    } catch (error) {
      console.error("Error registering account:", error);
    }
  };

  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} alt="Book Logo" />
        Library App
      </h1>

      <nav>
        <Link to="/books">Books</Link>
        {auth.id ? <Link to="/account">Account</Link> : null}
      </nav>
      <br />
      {auth.id ? (
        <button onClick={logout}>Welcome {auth.email} (Click to logout)</button>
      ) : (
        <Login login={login} />
      )}
      {!auth.id ? <Register register={register} /> : null}

      <Routes>
        <Route path="/books/:id" element={<SingleBook books={books} />} />
        <Route path="/books" element={<Books books={books} />} />
        <Route path="/books/search/:term" element={<Books books={books} />} />
        {auth.id ? (
          <Route path="/account" element={<Account auth={auth} />} />
        ) : null}
      </Routes>
    </>
  );
}

export default App;
