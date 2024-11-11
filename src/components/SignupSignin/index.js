import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true); // To show loading on buttons
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirm Password", confirmPassword);

    // Authenticate or create a user using Email and Password

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      // To check all field are filled
      if (password == confirmPassword) {
        // To check both passwords are same
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!"); // To generate successful popup
            setLoading(false); // To dont  show loading on button
            setName(""); // To reset name
            setEmail(""); // To reset email
            setPassword(""); // To reset password
            setConfirmPassword(""); // To reset confirm password
            createDoc(user); // To create user doc
            navigate("/dashboard"); // After login sending to dashboard
            // Create a doc with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false); // To dont  show loading on button
            // ..
          });
      } else {
        toast.error("Passwords don't match!"); // To generate error popup
        setLoading(false); // To dont  show loading on button
      }
    } else {
      toast.error("All fields are mandatory"); // To generate error popup
      setLoading(false); // To dont show loading on button
    }
  }

  // Function for Log in & validate email & password
  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);

    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Logged in", user);
          setLoading(false);
          navigate("/dashboard"); // After login, sending to dashboard
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  // Function to create doc for authenticated users
  async function createDoc(user) {
    setLoading(true);
    //Make sure that the doc with the UID doesn't exist
    // create a doc
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  //Function for Signup using google
  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("User>>>>", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated");
        })
        .catch((error) => {
          setLoading(false);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>TrackIt</span>
          </h2>

          <form>
            <Input // Getting fields as props in Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />

            <Input // Getting fields as props in Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button // Getting fields as props in Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email & Password"}
              blue={true}
              onClick={loginUsingEmail}
            />

            <p className="p-login">or</p>

            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login using Google"}
            />

            <p className="p-login">
              Don't have an account ?
              <span
                style={{
                  cursor: "pointer",
                  color: "var(--theme)",
                  marginLeft: "0.2rem",
                }}
                onClick={() => setLoginForm(!loginForm)}
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>TrackIt</span>
          </h2>

          <form>
            <Input // Getting fields as props in Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />

            <Input // Getting fields as props in Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />

            <Input // Getting fields as props in Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Input // Getting fields as props in Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />

            <Button // Getting fields as props in Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email & Password"}
              blue={true}
              onClick={signupWithEmail}
            />

            <p className="p-login">or</p>

            <Button
              text={loading ? "Loading..." : "Signup using Google"}
              onClick={googleAuth}
            />

            <p className="p-login">
              Already have an account ?
              <span
                style={{
                  cursor: "pointer",
                  color: "var(--theme)",
                  marginLeft: "0.2rem",
                }}
                onClick={() => setLoginForm(!loginForm)}
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
