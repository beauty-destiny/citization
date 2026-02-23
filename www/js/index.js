document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // This line creates the physical .db file if it's the first time the app is opened.
    // Otherwise, it simply establishes a connection to the existing file.
    // Open the database
    db = window.sqlitePlugin.openDatabase({
        name: 'citization.db',
        location: 'default', // Essential for Android/iOS
        androidDatabaseProvider: 'system' // Recommended for modern Android
    });

    // If the tables already exist, does nothing, and moves to the "Success" callback
    // Initialize your tables
    db.transaction(function(tx) {
        // user Management Tables
        tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' + 
            'username TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL, date_registered DATETIME, ' +
            'date_updated DATETIME DEFAULT CURRENT_TIMESTAMP)');

        tx.executeSql('CREATE TABLE IF NOT EXISTS citizen (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
            'user_id INTEGER NOT NULL, spouse_id INTEGER, firstname TEXT NOT NULL, lastname TEXT NOT NULL, ' +
            'home_address TEXT NOT NULL, contact INTEGER, DOB DATETIME NOT NULL, village TEXT NOT NULL, ' +
            'district TEXT NOT NULL, treditional_authority TEXT, date_registered DATETIME NOT NULL, ' +
            'date_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)');
    }, function(error) {
        alert("Database creation Error! : " + error.message);
    });
}
