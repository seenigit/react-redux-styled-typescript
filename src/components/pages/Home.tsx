import React from 'react';
import { Link } from "react-router-dom";
import { NewRequestBtn } from "./../../styles/style"

const Home : React.FC = () => {
  return (
    <Link to="/add_parts"><NewRequestBtn>New Request</NewRequestBtn></Link>
  );
}

export default Home;