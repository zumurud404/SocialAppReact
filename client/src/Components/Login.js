import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import{Form,FormGroup,Label,Button, Container, Row,Col, Input} from "reactstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
 
const Login = () => {
  const [email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate();
 
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
 
useEffect(() => {
  if (isSuccess) {
    alert("Login success!");
    navigate("/");
  }
}, [isSuccess, navigate]);


 
  const handleLogin = () => {
   try { 
    
     dispatch(login({
       email,
       password,
     }));
     
   } catch (error) {
    console.log(error)
   }
  };
 
   return (
    <div>
      <Container>
      <Form >
        <Row>
          <Col md={3}>
          <img src={logo}/>
          </Col>
        </Row>  
 
         <Row>
          <Col md={3}>  
          <FormGroup>
            <Label for="email">
              Email
              </Label>
              <Input
              id="email"
              name="email"
              placeholder="enter email..."
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              />
            </FormGroup>        
          </Col>
        </Row>
        <Row>
          <Col md={3}>
          <FormGroup>
            <Label for="password">
              password
              </Label>
              <Input
              id="password"
              name="password"
              placeholder="enter password..."
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              />  
            </FormGroup>
     </Col>
        </Row>
        <Row>
          <Col md={3}>
          <Button 
  color="primary"
  className="button"
  type="button"
  onClick={handleLogin}
>
  Login
</Button>
          </Col>
        </Row>
        </Form>
        <p className="smalltext">
          no Account? <Link to="/register">sign up now,</Link>
        </p>
      </Container>  
    </div>
  );
           
 
};
 
export default Login;