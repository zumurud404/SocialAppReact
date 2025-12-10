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
import { useNavigate } from "react-router-dom";
import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
const Register = () => {
 
   const dispatch = useDispatch();
   const navigate = useNavigate() 

   const [name,setname]= useState("");
   const [email,setemail]= useState("");
   const [password,setpassword]= useState("");
   const [confirmPassword,setconfirmPassword]= useState("");

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });
 
 

    // Handle form submission
    const onSubmit = (data) => {
      try{
        const UserData={
          name:data.name,
          email:data.email,
          password:data.password,
        }
        dispatch(registerUser(UserData));
      console.log("Form Data", data); // You can handle the form submission here
      alert("Validation all good.")
      navigate("/login"); 
      }
      catch(error)
      {
        alert("Error Occures")
      }
    }
  return (
    <Container fluid>
      <Row className="formrow">
        <Col className="columndiv1" lg="6">
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="appTitle">
            </div>
            <section className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  {...register("name", {onChange:(e)=>
                    setname(e.target.value),
                  })} 
                />
                 <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  {...register("email", {onChange:(e)=>
                    setemail(e.target.value),
                  })} 

                />
              <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  {...register("password", {onChange:(e)=>
                    setpassword(e.target.value),
                  })} 

                />
                 <p className="error">{errors.password?.message}</p>

              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  {...register("confirmPassword", {onChange:(e)=>
                    setconfirmPassword(e.target.value),
                  })} 
                />
                 <p className="error">{errors.confirmPassword?.message}</p>

              </div>
              <Button color="primary" className="button">
                Register
              </Button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6">
        </Col>
      </Row>
      
    </Container>
  );
};

export default Register;
