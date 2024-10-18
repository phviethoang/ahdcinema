

import MemberInfo from "./Components/MemberInfoComponent/MemberInfo"
import CinemaList from './Components/CinemaListComponent/CinemaList'; // Điều chỉnh đường dẫn nếu cần
import './Components/icons';


export default function App() {
  return (
    <div className="App">
      <MemberInfo/>
      <CinemaList/>
    </div>
    
  );
}