const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Yeni kullanıcı oluştur
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Kullanıcının var olup olmadığını kontrol et
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Şifreyi kontrol et
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Oturum kimliği oluştur
      const sessionId = generateSessionId();
  
      // Kullanıcıyı oturuma kaydet (örneğin, veritabanında)
      await saveSession(user._id, sessionId);
  
      // Oturum kimliğini kullanıcıya yanıt olarak gönder
      res.json({ message: 'Login successful', sessionId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Rastgele bir oturum kimliği oluştur
  function generateSessionId() {
    return Math.random().toString(36).substring(2);
  }
  
  // Oturumu kullanıcıya bağla ve veritabanında sakla
  async function saveSession(userId, sessionId) {
    // Bu fonksiyon, veritabanında kullanıcı oturumunu saklamak için kullanılabilir
    // Örnek olarak, MongoDB'de bir belge oluşturulabilir
    // await Session.create({ userId, sessionId });
  }

  
  exports.logout = async (req, res) => {
    try {
      const { sessionId } = req.body;
  
      // Oturumu veritabanında bul ve sil
      await deleteSession(sessionId);
  
      res.json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Oturumu veritabanından sil
  async function deleteSession(sessionId) {
    // Bu fonksiyon, veritabanından oturumu silmek için kullanılabilir
    // Örnek olarak, MongoDB'de ilgili belgeyi silmek için kullanılabilir
    // await Session.deleteOne({ sessionId });
  }
  
