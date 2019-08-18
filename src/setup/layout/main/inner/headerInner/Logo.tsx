import React from "react";
import { Link } from 'react-router-dom';

interface ILogoProps {
  onClick:(routePath:string) => void;
}

const Logo: React.FC<ILogoProps> = ( props ) => {
  return (
    <div className="qj-logo" onClick={() => props.onClick('/')}>
      <Link to={"/"}>
          <img src="/img/logo.png" className="qj-logo-img" id="logo-img"/>
      </Link>
    </div>
  )
}

export default Logo;