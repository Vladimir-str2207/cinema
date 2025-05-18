import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "./movieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useSelector((state) => state.films);
  const movie = movies.find((m) => m._id === id);
  const [showVideo, setShowVideo] = useState(false);

  if (!movie) return <div className="movie-not-found">Фильм не найден</div>;

  const isYouTube = movie.video_path?.match(/youtube\.com|youtu\.be/);
  const isRutube = movie.video_path?.match(/rutube\.ru/);

  const getVideoId = (url) => {
    if (isYouTube) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    }

    if (isRutube) {
      const regExp = /rutube\.ru\/video\/([a-zA-Z0-9]+)/;
      const match = url.match(regExp);
      return match ? match[1] : null;
    }

    return null;
  };

  const videoId = getVideoId(movie.video_path);

  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}мин`;
  };

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">
        Назад
      </Link>
      <div className="movie-content">
        <div className="movie-poster-container">
          <img
            className="movie-poster"
            src={movie.poster_path}
            alt={movie.title}
          />
          {movie.video_path && (
            <button className="play-button" onClick={() => setShowVideo(true)}>
              ▶ Смотреть
            </button>
          )}
        </div>

        <div className="movie-info">
          <h1 className="movie-title">
            {movie.title} ({movie.year})
          </h1>

          <div className="movie-meta">
            <span>Продолжительность: {formatDuration(movie.duration)}</span>
            <span>Рейтинг: {movie.rating}</span>
            <span>Оценили: {movie.voteCount.length || 0}</span>
          </div>

          <div className="movie-genres">
            Жанры:
            {movie.genre &&
              movie.genre.map((g) => (
                <span key={`genre-${g._id}`} className="genre">
                  {" "}
                  {g.genre}
                </span>
              ))}
          </div>

          <div className="movie-description">
            <p>Описание:</p>
            {movie.description || "Описание отсутствует"}
          </div>
        </div>
      </div>

      {showVideo && movie.video_path && (
        <div className="video-modal">
          <div className="video-container">
            <button
              className="close-button"
              onClick={() => setShowVideo(false)}
            >
              X
            </button>

            {isYouTube ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={`Трейлер: ${movie.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isRutube ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://rutube.ru/play/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                controls
                autoPlay
                className="movie-video"
                onError={(e) => console.error("Video error:", e)}
              >
                <source
                  src={movie.video_path}
                  type={`video/${movie.video_path.split(".").pop()}`}
                />
                Ваш браузер не поддерживает видео тег.
              </video>
            )}
          </div>
        </div>
      )}

      <div className="movie-credits">
        <div className="directors-section">
          <h2>
            Режиссер:
            {movie.director &&
              movie.director.map((d) => (
                <span key={`director-${d._id}`} className="director">
                  {d.name}
                </span>
              ))}
          </h2>
        </div>

        <div className="reviews-section">
          <h2>Отзывы: ({movie.reviews ? movie.reviews.length : 0})</h2>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
