import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import UpdateUser from "./Components/UpdateUser";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.users.user);
  return (
    <Container fluid>
      <Router>
      <Row>
          {user ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>

      <Row className="main">
      <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/update/:user_email/:user_name/:user_password"
             element={<UpdateUser />}></Route>
      </Routes>
      </Row>
      <Row>
          {user ? (
            <>
              <Footer />
            </>
          ) : null}
        </Row>
      </Router>
    </Container>
  );
};

export default App;
