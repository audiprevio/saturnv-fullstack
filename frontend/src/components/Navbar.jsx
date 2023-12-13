import { Typography } from "@material-tailwind/react";
import { Link  } from 'react-router-dom';


function Navbar() {

  return (
    <div className="w-full m-0 h-10 mt-2 bg-zinc-100 flex flex-row border-b border-gray-200 z-1000 shadow-l">
        <div className="relative flex flex-row pl-10">
        <Link to={`/`}>
          <Typography variant="h4" >
            Orbital
          </Typography>
        </Link>
        </div>
    </div>
  );
}

export default Navbar;