import User from "./User"
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { updateUserProfile } from "../Features/UserSlice";
const Profile = () => {
const user = useSelector((state) => state.users.user);
const [userName, setUserName] = useState(user.name);
const [Pwd, setPwd] = useState(user.password);
const [confirmPassword, setConfirmPassword] = useState(user.password);
const [profilePic, setProfilePic] = useState(user.profilePic);
const navigate = useNavigate();
const dispatch=useDispatch();

const handleFileChange = (e) => {
  setProfilePic(e.target.files[0]);
};
const handleUpdate = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Prepare the user data object with the current user's email and updated details
    const userData = {
      email: user.email, // Retrieve email from the Redux store
      name: userName, // Get the updated name from the state variable
      password: Pwd, // Get the updated password from the state variable
      profilePic: profilePic,
    };
    console.log(userData);
    // Dispatch the updateUserProfile action to update the user profile in the Redux store
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
    navigate("/profile");
  };



  return (
    <Container fluid>
      
      <Row>
        <Col md={2}>
        <h1>Profile</h1>
          <User />
        </Col>
        <Col md={4}><h1> Update Profile</h1>
        <Form onSubmit={handleUpdate}>
            <input type="file" name="profilePic" 
            onChange={handleFileChange}/>
            <div className="appTitle"></div>
            <Button>Update Profile Pic</Button>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" name="name" placeholder="Name..."
               type="text" value ={userName}
               onChange={(e) => setUserName(e.target.value)}/>
            </FormGroup>
            
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type="password"
                value = {Pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword "
                name="confirmPassword"
                placeholder="Confirm Password..."
                type="password"
                value = {confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="button">
                Update Profile
              </Button>
            </FormGroup>
          </Form>

        </Col>
      </Row>
    </Container>

  );
};

export default Profile;
