import React from "react";
import { FaFilm } from "react-icons/fa";

const MovieLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh]">
    <FaFilm className="animate-spin text-4xl text-brand-primary mb-4" style={{ animationDuration: '1s' }} />
    <span className="text-lg font-semibold text-brand-primary">Loading...</span>
  </div>
);

export default MovieLoader; 