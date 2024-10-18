// src/components/MovieRating.jsx
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../style.css"; // Đảm bảo rằng bạn có tệp CSS để định dạng

import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';


export default function MovieRating({ rating }) {
    // Hàm để lấy icon và màu sắc dựa trên mức phân loại
    const getRatingDetails = (rating) => {
        switch (rating) {
            case "T18":
                return { icon: "shield-alt", color: "#FF0000" }; // Đỏ
            case "T16":
                return { icon: "user-shield", color: "#FFA500" }; // Cam
            case "R":
                return { icon: "exclamation-circle", color: "#FFD700" }; // Vàng
            default:
                return { icon: "shield-alt", color: "#808080" }; // Xám cho mặc định
        }
    };

    const { icon, color } = getRatingDetails(rating);

    return (
        <div className="movie-rating">
            <FontAwesomeIcon icon={icon} style={{ color: color, marginRight: '5px' }} />
            <span style={{ color: color, fontWeight: 'bold' }}>{rating}</span>
        </div>
    );
}
