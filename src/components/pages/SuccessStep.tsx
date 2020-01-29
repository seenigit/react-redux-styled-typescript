import React from 'react';
import { Link } from "react-router-dom";
import { HomeBtn, SuccessText } from "../../styles/style"

const Success : React.FC = () => {
  return (
    <div>
      <div className="col-12">
        <SuccessText>Success</SuccessText>
      </div>
      <div className="col-12">
        <Link to="/"><HomeBtn>Home</HomeBtn></Link>
      </div>
    </div>
    
  );
}

export default Success;