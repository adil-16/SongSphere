const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.signUp = async (req, res) => {
  const { fullName, displayName, email, password } = req.body;


  const userQuerySnapshot = await db.collection('users').where('email', '==', email).get();
  if (!userQuerySnapshot.empty) {
    return res.status(400).send('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserRef = await db.collection('users').add({
    fullName,
    displayName,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  res.status(201).send({ userId: newUserRef.id, message: 'User created successfully' });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  
  const userRef = db.collection('users').doc(email);
  const doc = await userRef.get();
  if (!doc.exists) {
    return res.status(400).send('Invalid email or password');
  }

  const user = doc.data();

  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }

  res.send('User logged in successfully');
};
