import { useParams } from "react-router-dom";
import { updateUsers } from "../Features/UserSlice";
import { useDispatch } from "react-redux";
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

import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

function UpdateUser()
{
const {user_email,user_name,user_password}=useParams();
   const [name,setname]= useState(user_name);
   const [email,setemail]= useState(user_email);
   const [password,setpassword]= useState(user_password);
   const [confirmPassword,setconfirmPassword]= useState(user_password);
   const dispatch= useDispatch();
console.log(name);
   const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });
  const handleUpdate=(data)=>
   {
     try{
            const userData={
              name:name,
              email:email,
              password:password,
            };
            dispatch(updateUsers(userData));
            console.log(userData);
            alert("Validation all good.")
        }
        catch(error)
        {
            console.log(error);
        }
   }
   return(
    <Container>
       <Row className="formrow">
        <Col className="columndiv1" lg="6">
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <form className="div-form" onSubmit={handleSubmit(handleUpdate)}>
            <div className="appTitle">
            </div>
            <section className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  value={name}
                  {...register("name", {onChange:(e)=>
                    setname(e.target.value),
                  })} 
                />
                 <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input readOnly
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  value={email}
                  {...register("email", {
                    onChange: (e) => setemail(e.target.value),
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
                  value={password}
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
                  value={confirmPassword}
                  {...register("confirmPassword", {onChange:(e)=>
                    setconfirmPassword(e.target.value),
                  })} 
                />
                 <p className="error">{errors.confirmPassword?.message}</p>

              </div>
              <Button type="submit" color="primary" className="button">
                Update
              </Button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6">
        </Col>
      </Row>
    </Container>
   )
}
export default UpdateUser;