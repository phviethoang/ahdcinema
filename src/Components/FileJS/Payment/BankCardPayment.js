import React, { useState, useRef, useEffect } from 'react';
// import styles from './BankCardPayment.module.css';
import styles from
'../../FileCSS/BuyTicketPage/Step4/PaymentPage.module.css';

import PaymentButton from './PaymentButton';
import TopUpComplete from '../MemberPage/TopUpComplete'

import backgroundCard from '../../../img/PaymentIcon/backgroundCard.png';
import logo1 from '../../../img/PaymentIcon/logoMBbank.png'; 
import logo2 from '../../../img/PaymentIcon/logoTechcombank.png';
import icon1 from '../../../img/PaymentIcon/visaSymbol.png';
import icon2 from '../../../img/PaymentIcon/activeSymbol.png';
import icon3 from '../../../img/PaymentIcon/chip.png';
import icon4 from '../../../img/PaymentIcon/contactless.png';
import icon5 from '../../../img/PaymentIcon/napas.png';

const BankCardPayment = ({Logo,Icon1_2, finalAmount, useFor, handleTopUp, transactionInfo, onPaymentSuccessful}) => {
  const [satisfied, setSatisfied]=useState(false);
  const form1 = "CARD NUMBER";
  const form2 ="VALID FROM";
  const form3 = "XX/XX";
  const form4 = "VALID THRU";
  const form5 = "XX/XX"
  const form6 = "FULL NAME";

  const allItemPosition =[
    {item:logo1, x: 10, y:2, key:0},
    {item:logo2, x:10,y:2, key:0},
    {item:icon1, x:65, y:2,  key:0},
    {item:icon2, x:65, y:7,  key:0},
    {item:icon3, x:10, y:30,  key:0},
    {item:icon4, x:25, y:30,  key:0},
    {item:icon5, x:60, y:75,  key:0},
    {item:form1, x:10, y:50, key: "1"},
    {item:form2, x:8, y: 65, key: "2"},
    {item:form3, x:15, y: 65, key: "3"},
    {item:form4, x:33, y: 65, key: "4"},
    {item:form5, x:40, y: 65, key: "5"},
    {item:form6, x:5, y: 80, key: "6"},
  ]

 

  const [itemPosition, setItemPosition] = useState(allItemPosition); 

  const imageContainerRef = useRef(null);


  useEffect(() => {
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();

      const updatedIconPosition = allItemPosition.map((item) => ({
        ...item,
        x: item.x * (rect.width / 100), // Điều chỉnh `x` theo tỷ lệ container
        y: item.y * (rect.height / 100) // Điều chỉnh `y` theo tỷ lệ container
      }));

      setItemPosition(updatedIconPosition);
    }
  }, []);



  const handleTextChange = (e, index) => {
    // Tìm phần tử cần cập nhật trong itemPosition
    let tem = itemPosition.find((c) => c.key === index);
  
    // Đối tượng ánh xạ các giá trị form
    const formMap = {
      1: form1,
      3: form3,
      5: form5,
      6: form6,
    };
  
    // Lấy giá trị form mặc định dựa trên index
    const formX = formMap[index] || "";
  
    if (tem) {
      // Xử lý riêng cho trường hợp index là "1"
      if (index === "1") {
        // Chuyển giá trị nhập vào thành chuỗi chỉ chứa số
        let value = e.target.value.replace(/\D/g, "");
  
        // Giới hạn độ dài là 16 chữ số
        value = value.slice(0, 16);
  
        // Tự động thêm dấu cách sau mỗi 4 chữ số
        tem.item = value.replace(/(\d{4})(?=\d)/g, "$1 ") || formX;
      } else if (index === "3" || index === "5") {
        // Chuyển giá trị nhập vào thành chuỗi chỉ chứa số
        let value = e.target.value.replace(/\D/g, "").slice(0, 4);
  
        // Kết hợp `value` với `formX` để đạt định dạng `XX/XX`
        let formattedValue = `${value.padEnd(2, "X")}/${formX.slice(3, 5)}`;
        if (value.length > 2) {
          // Nếu người dùng đã nhập hơn 2 ký tự, hoàn thiện với định dạng `XX/XX`
          formattedValue = `${value.slice(0, 2)}/${value.slice(2).padEnd(2, "X")}`;
        }
  
        tem.item = formattedValue;
      } else if(index === "6"){
        
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
        tem.item = value || formX;
      }
  
      // Cập nhật lại state với mảng mới
      setItemPosition([...itemPosition]);
    }
  
    console.log(tem);
    console.log(itemPosition);
  };
  

  useEffect(() => {
    // Lấy giá trị hiện tại của các form từ `itemPosition`
    const form1Value = itemPosition.find(x => x.key === "1").item;
    const form3Value = itemPosition.find(x => x.key === "3").item;
    const form5Value = itemPosition.find(x => x.key === "5").item;
    const form6Value = itemPosition.find(x => x.key === "6").item;
  
    // Kiểm tra điều kiện
    const isForm1Valid = form1Value.length === 19;
    const isForm3Valid = form3Value.length === 5 && !form3Value.includes("X"); // Kiểu `XX/XX` nên chiều dài là 5
    const isForm5Valid = form5Value.length === 5 && !form5Value.includes("X"); // Kiểu `XX/XX` nên chiều dài là 5
    const isForm6Valid = form6Value.length > 0 && !(form6Value===form6);   
  
    // Nếu tất cả các điều kiện đều đúng, đặt `satisfied` thành true
    setSatisfied(isForm1Valid && isForm3Valid && isForm5Valid && isForm6Valid);
  }, [itemPosition]);
  



  const logo1Position = itemPosition.find(icon=>icon.item===logo1);
  const logo2Position = itemPosition.find(icon=>icon.item==logo2);
  const icon1Position = itemPosition.find(icon => icon.item === icon1);
  const icon2Position = itemPosition.find(icon => icon.item === icon2);
  const icon3Position = itemPosition.find(icon => icon.item === icon3);
  const icon4Position = itemPosition.find(icon => icon.item === icon4);
  const icon5Position = itemPosition.find(icon => icon.item === icon5);
  const form1Position = itemPosition.find(x => x.key === "1");
  const form2Position = itemPosition.find(x => x.key === "2");
  const form3Position = itemPosition.find(x => x.key === "3");
  const form4Position = itemPosition.find(x => x.key === "4");
  const form5Position = itemPosition.find(x => x.key === "5");
  const form6Position = itemPosition.find(x => x.key === "6");

  return (
    <div className={styles.bankCardPaymentContainer}>
    <div className ={styles.fillingCard}>

      <div ref={imageContainerRef} className={styles.imageContainer}>
        <img src={backgroundCard} alt="Sample" className={styles.image} />

        {/* Overlay chứa tiêu đề và mô tả */}


        {/* Hình ảnh icon đè lên */}

        {Logo==="mb"&&<img
          src={logo1} // Đổi thành icon bạn muốn hiển thị
          alt="Overlay Icon"
          className={styles.iconOverlay}
          style={{
            // top: `${itemPosition.y}px`,
            top: `${logo1Position.y}px`,
            left: `${logo1Position.x}px`,
            width: `150px`,
            height:`100px`,
            
      
          }}
          />}
          {Logo==="tech"&&<img
          src={logo2} // Đổi thành icon bạn muốn hiển thị
          alt="Overlay Icon"
          className={styles.iconOverlay}
          style={{
            top: `${logo2Position.y}px`,
            left: `${logo2Position.x}px`,
            width: `150px`,
            height:`100px`,
      
          }}
          />}
        {Icon1_2==="visa" &&<img
          src={icon1} 
          alt="Overlay Icon"
          className={styles.iconOverlay}
          style={{
            top: `${icon1Position.y}px`,
            left: `${icon1Position.x}px`,
            width: `150px`,
            height:`100px`,
      
          }}
        />}
        {Icon1_2==="active" && <img
          src={icon2} 
          alt="Overlay Icon"
          className={styles.iconOverlay}
          style={{
            // top: `${itemPosition.y}px`,
            top: `${icon2Position.y}px`,
            left: `${icon2Position.x}px`,
            width: `140px`,
            height:`50px`,
      
          }}
        /> }
        
        <img
        src={icon3} 
        alt="Overlay Icon"
        className={styles.iconOverlay}
        style={{
          top: `${icon3Position.y}px`,
          left: `${icon3Position.x}px`,
        }}
      />
      <img
        src={icon4} 
        alt="Overlay Icon"
        className={styles.iconOverlay}
        style={{
          top: `${icon4Position.y}px`,
          left: `${icon4Position.x}px`,
        }}
      />
      {Icon1_2==="active"&&<img
        src={icon5} // Đổi thành icon bạn muốn hiển thị
        alt="Overlay Icon"
        className={styles.iconOverlay}
        style={{
          top: `${icon5Position.y}px`,
          left: `${icon5Position.x}px`,
          width: `150px`,
          height:`50px`,
        }}
      />}
      <div
          className={styles.overlay}
          style={{
            top: `${form1Position.y}px`,
            left: `${form1Position.x}px`,
          }}
        >
          <h2 className={styles.overlayText} style={{fontSize:"px"}}>{form1Position.item}</h2>
          
        </div>
        <div
          className={styles.overlay}
          style={{
            top: `${form2Position.y}px`,
            left: `${form2Position.x}px`,
          }}
        >
          <div className={styles.annotationText}>{form2Position.item}</div>
          
        </div>
        <div
          className={styles.overlay}
          style={{
            top: `${form3Position.y}px`,
            left: `${form3Position.x}px`,
          }}
        >
          <h2 className={styles.overlayText}>{form3Position.item}</h2>
          
        </div>
        <div
          className={styles.overlay}
          style={{
            top: `${form4Position.y}px`,
            left: `${form4Position.x}px`,
          }}
        >
          <div className={styles.annotationText}>{form4Position.item}</div>
          
        </div>
        <div
          className={styles.overlay}
          style={{
            top: `${form5Position.y}px`,
            left: `${form5Position.x}px`,
          }}
        >
          <h2 className={styles.overlayText}>{form5Position.item}</h2>
          
        </div>
        <div
          className={styles.overlay}
          style={{
            top: `${form6Position.y}px`,
            left: `${form6Position.x}px`,
          }}
        >
          <h2 className={styles.overlayText}>{form6Position.item}</h2>
          
        </div>
      </div>


      <div className={styles.inputContainer}>
        <div style={{fontSize:"20px"}}>Tổng số tiền thanh toán <span style={{color:"red"}}>{finalAmount.toLocaleString()} đ</span></div>
        <input
          type="text"
          placeholder="Nhập số thẻ"
          maxLength={19}
          onChange={e=>handleTextChange(e, "1")}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Ngày phát hành (ví dụ 10/22)"
          // value={overlayDescription}
          onChange={e=>handleTextChange(e, "3")}
          className={styles.input}
        />
         <input
          type="text"
          placeholder="Ngày hết hạn (ví dụ 10/29)"
          onChange={e=>handleTextChange(e, "5")}
          className={styles.input}
        />
         <input
          type="text"
          placeholder="Tên chủ thẻ"
          onChange={e=>handleTextChange(e, "6")}
          className={styles.input}
        />
      </div>

    </div>
        {useFor==='ahd'&&<p>Bằng cách chọn Nạp tiền, Quý khách đồng ý với <span style={{color:"blue"}}>Điều khoản giao dịch</span> của AHD.</p>}
        {!(useFor==='ahd')&&<PaymentButton satisfied={satisfied} useFor='online' transactionInfo={transactionInfo} paymentData={{paymentType:"bankCard",info :itemPosition}} onPaymentSuccessful={onPaymentSuccessful} finalAmount={finalAmount}/>} 
        {useFor==='ahd'&& <TopUpComplete valueInput={finalAmount} handleTopUp={handleTopUp} satisfied={satisfied} paymentData={{paymentType:"bankCard",info :itemPosition}}/>}
              
    {/* <div className={styles.agreementSection}>
        <label>
          <input type="checkbox" />
            <span>Tôi đồng ý với điều khoản sử dụng và mua vé cho người có độ tuổi phù hợp</span>
        </label>
      </div> */}
    </div>
  );
};

export default BankCardPayment;
