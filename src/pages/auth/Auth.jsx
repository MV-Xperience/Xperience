import React, { useEffect, useState } from "react";
// IMPORT THIS WHENEVER YOU NEED AUTHENTICATION
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, getDoc, doc, setDoc } from "@firebase/firestore";
import Loading from "../../components/loading/Loading";
import "./auth.css";
const db = getFirestore();
var provider = new GoogleAuthProvider();

const FirebaseContainer = () => {
    const [loading, setLoading] = useState(true);

    const auth = getAuth();
    const nav = useNavigate();

    const signIn = () => {
        signInWithPopup(auth, provider);
    };

    useEffect(() => {
        setLoading(true);
        const checkUser = async (user) => {
            const docRef = doc(db, "users", `${user.uid}`);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    questionIds: [],
                    reviewedClasses: [],
                });
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                checkUser(user).then(() => nav("/"));
            }
        });

        setLoading(false);
    }, [auth, nav]);

    const GoogleButton = () => {
        return (
            <button onClick={signIn} className='google-button'>
                <img src='images/googleLogo.png' alt='google' style={{ width: "auto", height: 100 + "%" }}></img>
                <p style={{ lineHeight: 5 + "rem", fontSize: 1.5 + "rem", paddingLeft: 0.5 + "rem" }}>Sign In with Google</p>
            </button>
        );
    };

    return <>{loading ? <Loading /> : <GoogleButton />}</>;
};
export default FirebaseContainer;
