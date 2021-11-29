import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
export default function Logout(params) {
	const [loggedOut, setLoggedOut] = useState(false)
	const nav = useNavigate();
	if (loggedOut) {
		nav("/");
	}
	useEffect(() => {
		window.setTimeout(e=>{
			const auth = getAuth()
			signOut(auth).then(()=>setLoggedOut(true));
		}, 1000)
	}, [])
	return (
			<p>logging you out...</p>
	)
}