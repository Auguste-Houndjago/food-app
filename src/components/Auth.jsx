
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(email, password);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(email, password);
  };

  const handleSignOut = () => {
    signOut();
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (user) {
    return (
      <div>
        <p>Connecté en tant que : {user.email}</p>
        <button onClick={handleSignOut}>Se déconnecter</button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <button onClick={handleSignUp}>S'inscrire</button>
      <button onClick={handleSignIn}>Se connecter</button>
      {error && <p>Erreur : {error.message}</p>}
    </div>
  );
};

export default Auth;