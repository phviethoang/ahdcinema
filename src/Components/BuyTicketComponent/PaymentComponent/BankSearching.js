import React, { useState, useEffect } from 'react';
// import styles from './BankSearching.module.css';
import styles from './PaymentPage.module.css';

import clsx from 'clsx'; 

import CountdownTimer from '../ComboComponent/CountdownTimer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import logo1 from './PaymentIcon/logoMBbank.png';  
import logo2 from './PaymentIcon/logoTechcombank.png';

const BankSearching = ({ onBankSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const[selectedBank, setSelectedBank]=useState(null);

  const data = [
    { name: "MBbank", key: "mbbank", icon: logo1 },
    { name: "Techcombank", key: "techcombank", icon: logo2 }
  ];

  useEffect(() => {
    setFilteredData(data);
  }, []);

  const handleInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    if (searchQuery === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.key.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  };
  const handleBankClick =(item)=>{
    setSelectedBank(item);
    onBankSelect(item);
  }

  return (
    <div >
      <div className={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Tìm kiếm ngân hàng"
          value={query}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.bankSearchingItem}>
      <div className={styles.resultList}>
        {filteredData.length === 0 ? (
          <div style={{ fontSize: "20px", color: "red", padding:"30px 20px 10px 20px"}}>Không tìm thấy ngân hàng nào</div>
        ) : (
          <>
            <div style={{ fontSize: "30px", padding:"30px 20px 10px 20px"}}>Các ngân hàng</div>
            {filteredData.map((item, index) => (
              <img
                src={item.icon}
                alt={item.name}
                key={index}
                className={clsx(styles.resultItem,selectedBank===item&&styles.selectedBank)}
                onClick={() => handleBankClick(item)} 
              />
            ))}
          </>
        )}
      </div>
      <CountdownTimer initialMinutes={5} initialSeconds={0} />
      </div>
    </div>
  );
};

export default BankSearching;
