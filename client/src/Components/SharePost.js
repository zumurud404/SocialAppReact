import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
} from "reactstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePost } from "../Features/PostSlice";

const SharePosts = () => {
const [postMsg, setpostMsg]= useState("");
const dispatch= useDispatch();
const navigate= useNavigate();
const email = useSelector((state) => state.users.user?.email);
const handlePost = async() =>{
  if (!postMsg.trim())
  {
    alert("Post Message is required.");
    return;
  }
  const postData = {
    postMsg:postMsg,
    email:email,
  };
  dispatch(savePost(postData));
  setpostMsg("");
};

  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={(e)=>setpostMsg(e.target.value)}
                   
          />
          <Button onClick = {()=>handlePost()}>
            PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
