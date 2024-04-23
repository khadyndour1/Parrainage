import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // États pour stocker les informations de l'électeur, le code d'authentification, le candidat choisi, et le code de vérification
  const [electeur, setElecteur] = useState({});
  const [codeAuthentification, setCodeAuthentification] = useState('');
  const [candidats, setCandidats] = useState([]);
  const [candidatChoisi, setCandidatChoisi] = useState({});
  const [codeVerification, setCodeVerification] = useState('');
  const [messageConfirmation, setMessageConfirmation] = useState('');

  // Fonction pour soumettre les informations de l'électeur
  const handleSubmitElecteur = (event) => {
    event.preventDefault();
    // Logique pour valider et soumettre les informations de l'électeur
    // Cette partie du code devrait être remplacée par votre propre logique
    // Exemple : appel à une API pour vérifier les informations de l'électeur
    // et mise à jour de l'état electeur si les informations sont valides
    setElecteur({
      nom: 'NDOUR',
      prenom: 'khadija',
      dateNaissance: '01/01/1980',
      bureauVote: 'Bureau 123',
      // Ajouter phoneNumber et email ici
      phoneNumber: '123456789', // Exemple de numéro de téléphone
      email: 'example@example.com', // Exemple d'adresse email
    });
  };

  // Fonction pour soumettre le code d'authentification
  const handleSubmitCodeAuthentification = (event) => {
    event.preventDefault();
    // Logique pour valider le code d'authentification
    // Cette partie du code devrait être remplacée par votre propre logique
    // Exemple : appel à une API pour vérifier le code d'authentification
    // et afficher les détails du candidat si le code est valide
    setCandidats([
      { id: 1, nom: 'Anta Babacar Ngom', slogan: 'LA RELÈVE ', photo: 'https://cdn.al-ain.com/images/2024/3/21/248-180339--1-_165fc3e3b233be_700x400.png' },
      { id: 2, nom: 'Amadou Ba', slogan: 'Kheud dem voté, Ndogou jubiler', photo: 'https://www.lactuacho.com/wp-content/uploads/2023/07/Amadou-Ba.jpg' },
      { id: 3, nom: 'Bassirou Diomaye Faye', slogan: 'Beneen senegal', photo: 'https://kewoulo.info/wp-content/uploads/2024/01/diomaye-faye.jpg' },
      {id: 4, nom: 'Khalifa Sall', slogan: 'Motaali Yéné', photo: 'https://lequotidien.sn/wp-content/uploads/2023/12/Khalifa-Sall.jpg' },
      // Ajouter d'autres candidats si nécessaire
    ]);
  };

  // Fonction pour choisir un candidat
  const handleChoisirCandidat = (candidat) => {
    setCandidatChoisi(candidat);
  };

  // Fonction pour soumettre le code de vérification
  const handleSubmitCodeVerification = (event) => {
    event.preventDefault();
    // Logique pour valider et soumettre le code de vérification
    // Cette partie du code devrait être remplacée par votre propre logique
    // Exemple : appel à une API pour vérifier le code de vérification
    // et afficher un message de confirmation si le code est valide
    setMessageConfirmation('Votre parrainage a été enregistré avec succès.');
    // Appel de la fonction pour envoyer le code de vérification
    sendVerificationCode(electeur.phoneNumber, electeur.email, codeVerification);
  };

  // Fonction pour envoyer le code de vérification via SMS/email
  const sendVerificationCode = async (phoneNumber, email, verificationCode) => {
    try {
      const response = await axios.post('URL_DE_VOTRE_API', {
        phoneNumber: phoneNumber,
        email: email,
        verificationCode: verificationCode,
      });
      console.log(response.data); // Afficher la réponse de l'API (par exemple, un message de confirmation)
    } catch (error) {
      console.error('Erreur lors de l\'envoi du code de vérification:', error);
    }
  };

  return (
    <div>
      <h1>Enregistrement d'un parrainage</h1>

      {/* Formulaire pour saisir les informations de l'électeur */}
      <form onSubmit={handleSubmitElecteur}>
        {/* Champs pour le numéro de carte d'électeur et le numéro de carte d'identité nationale */}
        <input type="text" placeholder="Numéro de carte d'électeur" />
        <input type="text" placeholder="Numéro de carte d'identité nationale" />
        {/* Bouton pour soumettre les informations de l'électeur */}
        <button type="submit">Valider</button>
      </form>

      {/* Affichage des détails de l'électeur (une fois les informations soumises) */}
      {Object.keys(electeur).length > 0 && (
        <div>
          <p>Nom: {electeur.nom}</p>
          <p>Prénom: {electeur.prenom}</p>
          <p>Date de naissance: {electeur.dateNaissance}</p>
          <p>Bureau de vote: {electeur.bureauVote}</p>
      
          {/* Formulaire pour saisir le code d'authentification */}
          <form onSubmit={handleSubmitCodeAuthentification}>
            <input type="text" placeholder="Code d'authentification" value={codeAuthentification} onChange={(e) => setCodeAuthentification(e.target.value)} />
            <button type="submit">Valider</button>
          </form>

          {/* Affichage de la liste des candidats (une fois le code d'authentification soumis) */}
          {candidats.length > 0 && (
            <div>
              <h2>Liste des candidats</h2>
              {candidats.map(candidat => (
                <div key={candidat.id}>
                  <img src={candidat.photo} alt={candidat.nom} />
                  <p>{candidat.nom}</p>
                  <p>{candidat.slogan}</p>
                  <button onClick={() => handleChoisirCandidat(candidat)}>Choisir</button>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire pour saisir le code de vérification */}
          {Object.keys(candidatChoisi).length > 0 && (
            <form onSubmit={handleSubmitCodeVerification}>
              <input type="text" placeholder="Code de vérification" value={codeVerification} onChange={(e) => setCodeVerification(e.target.value)} />
              <button type="submit">Valider</button>
            </form>
          )}

          {/* Affichage du message de confirmation */}
          {messageConfirmation && (
            <p>{messageConfirmation}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
