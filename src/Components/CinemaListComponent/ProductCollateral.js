// src/components/ProductCollateral.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import styles from "./cinemaList.module.css";
import DateScroller from "./DateScroller";
import TicketPriceTable from "./TicketPriceTable";
export default function ProductCollateral() {
    const [activeTab, setActiveTab] = useState('lichChieu'); // Trạng thái cho tab hiện tại

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.productCollateral}>
            <ul className={styles.toggleTabs} style={{listStyleType: 'none'}}>
                <li 
                    className={`${styles.tabItem} ${activeTab === 'lichChieu' ? styles.tabCurrent : ''}`} 
                    onClick={() => handleTabClick('lichChieu')}
                >
                    <span >
                        {activeTab === 'lichChieu' && <FontAwesomeIcon icon={faHandPointRight} />} {/* Hiển thị icon nếu tab hiện tại */}
                        Lịch chiếu
                    </span>
                </li>
                <li 
                    className={`${styles.tabItem} ${activeTab === 'giaVe' ? styles.tabCurrent : ''}`} 
                    onClick={() => handleTabClick('giaVe')}
                >
                    <span >
                    {activeTab === 'giaVe' && <FontAwesomeIcon icon={faHandPointRight} />} {/* Hiển thị icon nếu tab hiện tại */}
                        Giá vé
                    </span>
                </li>
            </ul>

            <div className={styles.tabContent}>
                {activeTab === 'lichChieu' && (
                    <div>
                        {/* Nội dung cho Lịch chiếu */}
                        <DateScroller/>
                    </div>
                )}
                {activeTab === 'giaVe' && (
                    <div>
                        {/* Nội dung cho Giá vé */}
                        <TicketPriceTable/>
                    </div>
                )}
            </div>
        </div>
    );
}
