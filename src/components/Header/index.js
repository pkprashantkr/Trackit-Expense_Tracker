import React, { useEffect, useState } from "react";
import "./style.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "../../assets/user.svg";
import logo from "../../assets/logowhite.png";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Listen for scroll events to add transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Adjust this value based on where you want the effect
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out Successfully!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className={`navbar ${isTransparent ? "transparent" : ""}`}>
      <img
        src={logo}
        style={{
          height: "1.6rem",
          width: "10rem",
          padding: "0.8rem 1rem",
        }}
        alt="Logo"
      />
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ borderRadius: "50%", height: "1.8rem", width: "1.8rem" }}
            alt="User"
          />
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
