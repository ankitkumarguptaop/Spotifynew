import React from 'react'
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
import "./Navbar.css"
export default function Navbar({navBackground}) {
const [{ userInfo}] = useStateProvider();
const imge ="https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"


const parent = navBackground ? "navBackground NavContainer" : "noNavBackground NavContainer";
  return (
    <div className={parent} >
    <div className="search__bar">
      <FaSearch />
      <input type="text" placeholder="Artists, songs, or podcasts" />
    </div>
    <div className="avatar">
      <a href={userInfo?.userUrl}>
      <img src={userInfo?.userUrl ? userInfo.userUrl : imge} alt="userimg" />
        <span>{userInfo?.name}</span>
      </a>
     
    </div>

  </div>
  )
}
