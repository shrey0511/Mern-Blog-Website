import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";


export default function Header(){
    const {setUserInfo,userInfo} = useContext(UserContext);
    const [redirect,setRedirect] = useState(false);
    useEffect(() => {
      fetch('http://localhost:4000/profile',{
        credentials:'include',
      }).then(response =>{
        response.json().then(userInfo =>{
          setUserInfo(userInfo);
        });
      });
    }, []);

    function logout(){
      fetch('http://localhost:4000/logout',{
        credentials:'include',
        method:'POST',
      });
      setUserInfo(null);
      setRedirect(true);
    }

    const username = userInfo?.username;
    //userinfo can be sometimes new so we use a question mark

    return(
        <header>
        <div className="logo">
          <Link to='/' className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            MyBlog</Link>
          {username && (
              <>
                <span>Hello , {username}</span>
              </>
          )}
        </div>
        {/* <Link to='/' className='logo'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          MyBlog</Link>
        {username && (
            <>
              <span>Hello , {username}</span>
            </>
        )} */}
        <nav>
          {username && (
            <>
              <Link to={"/create"}>Create</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to='/login'>Login</Link>{/*Its a react-dom elemenet */}
              <Link to='/register'>Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}

