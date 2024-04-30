from flask import Flask, jsonify, Response, session
from flask import render_template
from flask import request
from flask_cors import CORS
from flask_login import UserMixin
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = '522df36e51694f0012cc55f3b640088b82c2806e6a957eca'
CORS(app, supports_credentials=True)

jwt = JWTManager(app)

#base directory
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
db = SQLAlchemy(app)


# user class
class User(UserMixin, db.Model):
    __tablename__ = 'user'
    userId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userName = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.userName)
    #def is_active(self):
        #return self.is_active()
    def is_anonymous(self):
         return False
    def is_authenticated(self):
         return self.userId is not None
    def is_active(self):
         return True
    def get_id(self):
         return self.userId


# Home Page route
@app.route("/")
def home():
    return "<p>Hello, sqlite3</p>"


# Route to add a new record (INSERT) student data to the database
@app.route("/addUser", methods=['POST', 'GET', 'OPTIONS'])
def addrec():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    # Data will be available from POST submitted by the form
    if request.method == 'POST':
        try:
            print("test")
            data = request.get_json()
            userName = data['username']
            email = data['email']
            password = data['password']

            # hashing password
            hashed_password = generate_password_hash(password)

            # Check if the userName already exists in the database
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("SELECT userName FROM user WHERE userName=?", (userName,))
                existing_id = cur.fetchone()

                if existing_id:
                    msg = f"Record with userName {userName} already exists in the database"
                else:
                    # Perform the INSERT operation only if the ID doesn't exist
                    cur.execute("INSERT INTO user (userName, email, password) VALUES (?,?,?)", (userName, email, hashed_password))
                    con.commit()
                    msg = "Record successfully added to the database"
        except Exception as e:
            con.rollback()
            msg = f"Error in the INSERT: {str(e)}"
        finally:
            con.close()
            #get_data()  # Refresh the data after adding or rejecting the entry
            # Send the transaction message to the front-end
            response = jsonify({'message': msg})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


@app.route("/login", methods=['POST'])
def login():
    # Get inputted credentials from login attempt
    entered_username = request.form['username']
    entered_password = request.form['password']

    user = User.query.filter(or_(User.userName.like(f"%{entered_username}%"))).first()

    print("USER:", user)

    if user and check_password_hash(user.password, entered_password):
        access_token = create_access_token(identity=user.userId)
        with sqlite3.connect('database.db') as con:
            cur = con.cursor()
            # Query the database to retrieve the userId based on the username
            cur.execute("SELECT userId FROM user WHERE userName = ?", (entered_username,))
            row = cur.fetchone()

            # Close the database connection
            cur.close()

            # Check if the user was found
            if row:
                user_id = row[0]
                return jsonify(access_token=access_token, username =entered_username, userId = user_id), 200

            else:
                return jsonify(access_token=access_token, username =entered_username), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
    

# Route used to DELETE a specific record in the database    
@app.route("/removeUser", methods=['POST','GET', 'OPTIONS'])
def delete():
    if request.method == 'POST':
        try:
            # Use the hidden input value of ID from the form to get the rowid
            data = request.get_json()
            userName = data.get('userName')

            # Connect to the database and DELETE a specific record based on rowid
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("DELETE FROM user WHERE userName=?", (userName,))

                con.commit()
                msg = "Record successfully deleted from the database"
        except Exception as e:
            con.rollback()
            msg = f"Error in the DELETE: {str(e)}"
        finally:
            con.close()
            # Send the transaction message to the f
            # ont-end
            return jsonify({'message': msg})

@app.route('/get_playlists_by_user/<user_id>', methods=['GET'])
def get_playlists_by_user(user_id):
    print("getting playlist from user")
    try:
        with sqlite3.connect('database.db') as con:
            cursor = con.cursor()
            cursor.execute("SELECT * FROM playlist WHERE userId=?", (user_id,))
            playlists = cursor.fetchall()
            playlists_data = [{'playlistId': row[0], 'userId': row[1], 'title': row[2], 'description': row[3], 'created_at': row[4]} for row in playlists]
            return jsonify(playlists_data)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/create_playlist', methods=['POST', 'OPTIONS'])
def create_playlist():
    con = None
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            userId = data['userId']
            title = data['title']
            description = data['description']
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute('INSERT INTO playlist (userId, title, description, created_at) VALUES (?, ?, ?, datetime("now"))',
                            (userId, title, description))
                con.commit()
        except Exception as e:
            con.rollback()
        finally:
            con.close()
            #get_data()  # Refresh the data after adding or rejecting the entry
            # Send the transaction message to the front-end
            msg = "playlist created successfully"
            response = jsonify({'message': msg})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        
@app.route("/delete_playlist", methods=['POST','GET', 'OPTIONS'])
def delete_playlist():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    if request.method == 'POST':
        try:
            data = request.get_json()
            playlist_id = data.get('playlistId')

            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                # Delete playlist from the playlist table
                cur.execute("DELETE FROM playlist WHERE playlistId=?", (playlist_id,))
                # Also delete entries from user_playlist and playlist_track tables if any
                cur.execute("DELETE FROM user_playlist WHERE playlistId=?", (playlist_id,))
                cur.execute("DELETE FROM playlist_track WHERE playlistId=?", (playlist_id,))
                con.commit()
                msg = "Playlist successfully deleted"
        except Exception as e:
            con.rollback()
            msg = f"Error in deleting playlist: {str(e)}"
        finally:
            con.close()
            # Send the transaction message to the f
            # ont-end
            return jsonify({'message': msg})
        
# Route to add a track to a playlist
@app.route('/add_to_playlist', methods=['POST', 'OPTIONS'])
def add_to_playlist():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    if request.method == 'POST':
        try:
            data = request.get_json()
            user_id = data['userId']
            playlist_id = data['playlistId']
            track_id = data['trackId']
            artist = data['artist']
            album = data['album']
            genre = data['genre']

            with sqlite3.connect('database.db') as con:
                cursor = con.cursor()
                cursor.execute('INSERT INTO user_playlist (userId, playlistId) VALUES (?, ?)', (user_id, playlist_id))
                con.commit()
            
        except Exception as e:
            con.rollback()
        finally:
            con.close()
            msg = "Track added to playlist successfully!"
            response = jsonify({'message': msg})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

@app.route('/delete_from_playlist', methods=['POST', 'OPTIONS'])
def delete_from_playlist():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    try:
        data = request.get_json()
        playlist_id = data['playlistId']
        track_id = data['trackId']

        with sqlite3.connect('database.db') as con:
            cur = con.cursor()
            # Delete entry from the playlist_track table
            cur.execute("DELETE FROM playlist_track WHERE playlistId=? AND trackId=?", (playlist_id, track_id))
            con.commit()
            msg = "Song successfully removed from the playlist"
    except Exception as e:
        con.rollback()
        msg = f"Error in removing song from playlist: {str(e)}"
    finally:
        con.close()
        response = jsonify({'message': msg})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/get_all_playlists', methods=['GET'])
def get_all_playlists():
    try:
        with sqlite3.connect('database.db') as con:
            cursor = con.cursor()
            cursor.execute("SELECT * FROM playlist")
            playlists = cursor.fetchall()
            playlists_data = [{'playlistId': row[0], 'userId': row[1], 'title': row[2], 'description': row[3], 'created_at': row[4]} for row in playlists]
            return jsonify(playlists_data)
    except Exception as e:
        return jsonify({'error': str(e)})


# Function to get all music from a playlist
@app.route('/get_music_from_playlist/<int:playlist_id>', methods=['GET'])
def get_music_from_playlist(playlist_id):
    try:
        with sqlite3.connect('database.db') as con:
            cursor = con.cursor()
            cursor.execute("SELECT * FROM playlist_track WHERE playlistId=?", (playlist_id,))
            playlist_music = cursor.fetchall()
            music_data = []
            for row in playlist_music:
                cursor.execute("SELECT * FROM track WHERE trackId=?", (row[1],))
                track_info = cursor.fetchone()
                if track_info:
                    music_data.append({
                        'trackId': track_info[0],
                        'title': track_info[1],
                        'artist': track_info[2],
                        'album': track_info[3],
                        'genre': track_info[4]
                    })
            return jsonify(music_data)
    except Exception as e:
        return jsonify({'error': str(e)})


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"error": "Invalid token"}), 401


@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({"error": "Token has expired"}), 401


@jwt.unauthorized_loader
def unauthorized_callback(error):
    return jsonify({"error": "Unauthorized"}), 401


@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
    return jsonify({"error": "Fresh token required"}), 401

# # Route to SELECT all data from the database and display in a table      
# @app.route('/list')
# def list():
#     print("test")
#     # Connect to the SQLite3 datatabase and 
#     # SELECT rowid and all Rows from the students table.
#     con = sqlite3.connect("database.db")
#     con.row_factory = sqlite3.Row

#     cur = con.cursor()
#     cur.execute("SELECT rowid, * FROM students")

#     rows = cur.fetchall()
#     students_list = [{'name': row['name'], 'id': row['id'], 'points': row['points']} for row in rows]
#     con.close()
#     # Send the results of the SELECT to the list.html page
#     return jsonify(students_list)


# # Route used to execute the UPDATE statement on a specific record in the database
# @app.route("/edit", methods=['POST','GET'])
# def editrec():
#     # Data will be available from POST submitted by the form
#     if request.method == 'POST':
#         try:
#             data = request.get_json()
#             nm = data['name']
#             ID = data['ID']
#             points = data['points']

#             # UPDATE a specific record in the database based on the rowid
#             with sqlite3.connect('database.db') as con:
#                 cur = con.cursor()
#                 cur.execute("UPDATE students SET name='"+nm+"', points='"+points+"' WHERE ID="+ID)

#                 con.commit()
#                 msg = "Record successfully edited in the database"
#         except:
#             con.rollback()
#             msg = "Error in the Edit"

#         finally:
#             con.close()
#             # Send the transaction message to result.html
#             return jsonify({'message': msg})



# @app.route('/sendUpdate')
# def get_data():
#     print("test1")
#     con = sqlite3.connect("database.db")
#     con.row_factory = sqlite3.Row

#     cur = con.cursor()
#     cur.execute("SELECT rowid, * FROM students")

#     rows = cur.fetchall()
#     students_list = [{'name': row['name'], 'id': row['id'], 'points': row['points']} for row in rows]
#     con.close()
#     # Send the results of the SELECT to the list.html page
#     return jsonify(students_list)

if __name__ == "__main__":
    app.run(debug=True, port=5001)