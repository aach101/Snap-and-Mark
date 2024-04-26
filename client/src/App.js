import GetAttendance from "./facultySidePages/GetAttendance";
import PostAttendance from "./facultySidePages/PostAttendance";
import UploadVid from "./facultySidePages/UploadVid";
import LoginPage from "./facultySidePages/components/LoginPage";
import LoadingIcon from "./utils/Loadingicon";

function App() {
  return (
    <div >
      {/* <LoginPage/> */}
      <UploadVid/>
     <PostAttendance/>
     <GetAttendance/>
       </div>
  );
}

export default App;
