import userimg from "../Images/user.png";
import { useSelector } from "react-redux";
import Location from "../Location";
const User = () => {
  const user = useSelector((state) => state.users.user);
  const email = useSelector((state)=>state.users.user?.email);
  const name = useSelector((state)=>state.users.user?.name);
  const picURL = useSelector((state)=>state.users.user?.profilePic);
  if (!user) {
    return <p>Loading...</p>; // or a fallback UI
  }
  console.log(picURL);
  return (
    <div>
       <img
        src={"http://localhost:3001/uploads/" + picURL
            
        }
        alt={user}
        className="userImage"
      />
      <p>{name}</p>
      <p>{email}</p>
      <Location/>
    </div>
  );
};

export default User;
