document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Attach the click event to your button
    if (document.getElementById('signinBtn')) {
        document.getElementById('signinBtn').addEventListener('click', Login);
    }
    if (document.getElementById('signupBtn')) {
        document.getElementById('signupBtn').addEventListener('click', Signup);
    }
}

function Login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM user WHERE username=? AND password=?', [user, pass], function(tx, results) {
            if (results.rows.length > 0) {
                window.location.href = "../home.html"; // Move to the next page
            } else {
                alert("Invalid username or password.");
            }
        });
    });
}

function Signup() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const passConfirm = document.getElementById('passConfirm').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const address = document.getElementById('address').value;
    const contact = parseInt(document.getElementById('contact').value);
    const dob = document.getElementById('address').value;
    const village = document.getElementById('village').value;
    const district = document.getElementById('district').value;
    const TA = document.getElementById('TA').value;
    const now = new Date().toISOString();

    if (pass == passConfirm) {
        db.transaction(function(tx) {
        tx.executeSql('INSERT INTO user (username, password, role, date_registered, date_updated) VALUES (?, ?, ?, ?, ?)', [user, pass, 'citizen', now, now], function(tx, res) {
            const userId = res.insertId;
            tx.executeSql('INSERT INTO citizen (user_id, firstname, lastname, address, contact, dob, village, district, TA, date_updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, firstname, lastname, address, contact, dob, village, district, TA, now], function(tx, res2) {
                window.location.href = "../home.html"; // Move to the next page
            }, function(tx, error) {
                alert("User registration failed: " + error.message);
            });
        }, function(tx, error) {
            alert("Citizen registration failed: " + error.message);
        });
        }, function(error) {
            alert("Transaction failed: " + error.message);
        });
    } else {
        alert("Passwords do not match.");
        window.location.href = "../index.html"; // Move back to signup
    }
}