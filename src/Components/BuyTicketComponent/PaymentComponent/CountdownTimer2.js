import React, { useState, useEffect } from 'react';

const CountdownTimer2 = ({ initialMinutes = 10, initialSeconds = 0 }) => {
    const [time, setTime] = useState(initialMinutes * 60 + initialSeconds);

    // Hàm để định dạng thời gian thành mm:ss
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    useEffect(() => {
        // Cập nhật mỗi giây
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Hủy bỏ interval khi component bị unmounted
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div style={{color:"red"}}>{formatTime(time)}</div>
        </div>
    );
};

export default CountdownTimer2;
