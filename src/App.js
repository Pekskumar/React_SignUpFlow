import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import Dashboard from './pages/Dashboard';
import UpdateProfile from './pages/UpdateProfile';
import UploadDocuments from './pages/UploadDocuments';
import Inquery from './pages/Inquery';
import Pricing from './pages/Pricing';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <main>
      <BrowserRouter>
        <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="updateprofile" element={<UpdateProfile />} />
        <Route path="updateprofile" element={<UpdateProfile />} />
        <Route path="inquery" element={<Inquery />} />
        <Route path="pricing" element={<Pricing />} />
        
        <Route path='uplaodDocument' element={<UploadDocuments />} />
          
        </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
