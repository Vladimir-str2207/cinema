import React, { useState } from "react";
import "./adminPanel.css";
import Input from "../../ui/input/Input";
import { addMovie } from "../../../actions/film";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


function AdminPanel() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [reviews, setReviews] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [video_path, setVideo_path] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="adminPanel">
      <div className="admin__header">Панель администратора</div>
      <Input
        value={title}
        setValue={setTitle}
        type="text"
        placeholder="Название..."
      />
      <Input
        value={year}
        setValue={setYear}
        type="number"
        placeholder="Год..."
      />
      <Input
        value={duration}
        setValue={setDuration}
        type="number"
        placeholder="Продолжительность..."
      />
      
      <Input
        value={genre}
        setValue={setGenre}
        type="text"
        placeholder="Жанр..."
      />
      <Input
        value={director}
        setValue={setDirector}
        type="text"
        placeholder="Режиссер..."
      />
      <Input
        value={reviews}
        setValue={setReviews}
        type="text"
        placeholder="Отзыв..."
      />
      <Input
        value={poster_path}
        setValue={setPoster_path}
        type="text"
        placeholder="Постер..."
      />
      <Input
        value={video_path}
        setValue={setVideo_path}
        type="text"
        placeholder="Видео..."
      />
      <Input
        value={description}
        setValue={setDescription}
        type="text"
        placeholder="Описание..."
      />
      <button
        className="addMovie__btn"
        onClick={() => dispatch
          (addMovie(
            title,
            year,
            duration,
            genre,
            director,
            reviews,
            poster_path,
            video_path,
            description
          ))
        }
      >
        Добавить фильм
      </button>
      <Link to="/" className="back-button_admin">
        Выйти из панели
      </Link>
    </div>
  );
}

export default AdminPanel;
