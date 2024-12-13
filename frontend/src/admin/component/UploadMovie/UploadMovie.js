import React, { useState } from "react";

const UploadMovie = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    duration: "",
    releaseDate: "",
    genre: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const generateId = (movies = []) =>
    movies && movies.length > 0 ? Number(movies[movies.length - 1].id) + 1 : 1;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/movies");
      const movies = await response.json();

      const newMovie = {
        ...movieData,
        id: generateId(movies),
      };

      await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      alert("Movie uploaded successfully!");
      setMovieData({
        title: "",
        duration: "",
        releaseDate: "",
        genre: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error uploading movie:", error);
      alert("Failed to upload movie. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Upload Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Movie Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            className="form-control"
            value={movieData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="form-control"
            value={movieData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="form-control"
            value={movieData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            value={movieData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload Movie
        </button>
      </form>
    </div>
  );
};

export default UploadMovie;
