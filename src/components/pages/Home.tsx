import React from 'react';
import { Link } from "react-router-dom";
import { NewRequest } from "./../../styles/style"

const Home : React.FC = () => {
  return (
    <Link to="/add_parts"><NewRequest>New Request</NewRequest></Link>
  );
}

export default Home;