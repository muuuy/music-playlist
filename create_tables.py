import sqlite3

conn = sqlite3.connect('database.db')
print("Connected to database successfully")

# Create User Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS user (
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
''')
print("Created table user successfully!")

# Create Music Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS music (
        trackId INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        album TEXT NOT NULL,
        releaseDate TEXT
    )
''')
print("Created table music successfully!")

# Create Playlist Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS playlist (
        playlistId INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        created_at TEXT,
        userId INTEGER,
        FOREIGN KEY (userId) REFERENCES user(userId)
    )
''')
print("Created table playlist successfully!")

# Create Junction Table for Many-to-Many Relationship between Music and Playlist
conn.execute('''
    CREATE TABLE IF NOT EXISTS music_playlist (
        musicId INTEGER,
        playlistId INTEGER,
        FOREIGN KEY (musicId) REFERENCES music(trackId),
        FOREIGN KEY (playlistId) REFERENCES playlist(playlistId),
        PRIMARY KEY (musicId, playlistId)
    )
''')
print("Created junction table music_playlist successfully!")

# Create Artist Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS artist (
        artistId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        bio TEXT,
        genre TEXT
    )
''')
print("Created table artist successfully!")

# Create Album Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS album (
        albumId INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artistId INTEGER,
        releaseDate TEXT,
        FOREIGN KEY (artistId) REFERENCES artist(artistId)
    )
''')
print("Created table album successfully!")

# Create User-Playlist Relationship Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS user_playlist (
        userId INTEGER,
        playlistId INTEGER,
        PRIMARY KEY (userId, playlistId),
        FOREIGN KEY (userId) REFERENCES user(userId),
        FOREIGN KEY (playlistId) REFERENCES playlist(playlistId)
    )
''')
print("Created table user_playlist successfully!")

# Create User-Favorite Tracks Table
conn.execute('''
    CREATE TABLE IF NOT EXISTS user_favorite_tracks (
        userId INTEGER,
        trackId INTEGER,
        PRIMARY KEY (userId, trackId),
        FOREIGN KEY (userId) REFERENCES user(userId),
        FOREIGN KEY (trackId) REFERENCES music(trackId)
    )
''')
print("Created table user_favorite_tracks successfully!")

conn.close()
