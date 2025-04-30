// Sayfa yüklendiğinde çalışacak fonksiyon
window.onload = function() {
     // localStorage'dan sessionId'yi alır
    const sessionId = localStorage.getItem("sessionId");
    // Eğer sessionId mevcutsa, admin.html sayfasına yönlendirir
    if (sessionId) {
        window.location.href = "admin.html"; // Kayıtlı bir session kimliği varsa yönlendirme admin.html sayfasına yapılıyor
    }
};

// Register form
document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();// Formun varsayılan gönderme davranışını engeller
// Kullanıcı adı, email ve şifre alanlarının değerlerini alır
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        // Kayıt işlemi için API isteği gönderir
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',// POST yöntemi ile istek yapar
            headers: {
                'Content-Type': 'application/json'// JSON formatında veri gönderir
            },
            body: JSON.stringify({ username, email, password })// İstek gövdesine kullanıcı bilgilerini ekler
        });
// Yanıt başarısız ise hata fırlatır
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
// Kayıt başarılı mesajı gösterir
        alert('Registration successful');
    } catch (error) {
         // Hata durumunda konsola ve kullanıcıya hata mesajı gösterir
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
    }
});

// Login form
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();// Formun varsayılan gönderme davranışını engeller
 // Email ve şifre alanlarının değerlerini alır
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // Giriş işlemi için API isteği gönderir
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',// POST yöntemi ile istek yapar
            headers: {
                'Content-Type': 'application/json' // JSON formatında veri gönderir
            },
            body: JSON.stringify({ email, password })// İstek gövdesine kullanıcı bilgilerini ekler
        });
 // Yanıt başarısız ise hata fırlatır
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
// Yanıt verilerini alır
        const data = await response.json();
        // Giriş başarılı mesajı gösterir
        alert('Login successful');
        // Session kimliğini localStorage'a kaydeder
        localStorage.setItem('sessionId', data.sessionId); // Başarılı giriş sonrası session kimliği localStorage'a kaydediliyor
        // Ana sayfaya yönlendirir
        window.location.href = "index.html"; 
    } catch (error) {
        // Hata durumunda konsola ve kullanıcıya hata mesajı gösterir
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
    }
});
