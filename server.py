from flask import Flask, jsonify, Response, session
from flask import render_template
from flask import request
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from flask_session import Session
from redis import Redis

# login manager object
login_manager = LoginManager()

app = Flask(__name__)
app.config['SECRET_KEY'] = '522df36e51694f0012cc55f3b640088b82c2806e6a957eca'
# app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, supports_credentials=True)

# initialize to work with app
login_manager.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/Amy/Documents/UMBC/Spring 2024/CMSC 447/repo/music-playlist/database.db'
db = SQLAlchemy(app)

app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = Redis(host='localhost', port=6379)
Session(app)


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


# loads a user 
@login_manager.user_loader
def load_user(user_id):
    result = User.query.get(user_id)
    print("LOAD:", result)
    return result

@app.route('/loginStatus', methods=['GET'])
def get_login_status():
    print("SESSION ID DURING VERIFICATION", session.sid)  # THIS IS DIFFERENT THAN DURING LOGIN
    is_logged_in = current_user.is_authenticated
    print("logged in??????????????????", is_logged_in)
    return jsonify({'is_logged_in': is_logged_in})


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
        login_user(user)
        session['userId'] = user.userId
        print("SESSION DURING LOG IN", session.sid)
        return jsonify({'userID': user.userId}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route("/logout")
def logout():
    logout_user()
    # return to login

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
        
@app.route('/create_playlist', methods=['POST', 'OPTIONS'])
def create_playlist():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user_id = data['userId']
            title = data['title']
            description = data['description']
            with sqlite3.connect('database.db') as con:
                cursor = con.cursor()
                cursor.execute('INSERT INTO playlist (userId, title, description, created_at) VALUES (?, ?, ?, datetime("now"))',
                            (user_id, title, description))
                con.commit()
        except Exception as e:
            con.rollback()
        finally:
            con.close()

            return jsonify({'message': 'Playlist created successfully!'})

# Route to add a track to a playlist
@app.route('/add_to_playlist', methods=['POST', 'OPTIONS'])
def add_to_playlist():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user_id = data['userId']
            playlist_id = data['playlistId']
            track_id = data['trackId']

            with sqlite3.connect('database.db') as con:
                cursor = con.cursor()
                cursor.execute('INSERT INTO user_playlist (userId, playlistId) VALUES (?, ?)', (user_id, playlist_id))
                cursor.execute('INSERT INTO playlist_track (playlistId, trackId) VALUES (?, ?)', (playlist_id, track_id))
                con.commit()
            
        except Exception as e:
            con.rollback()
        finally:
            con.close()
            return jsonify({'message': 'Track added to playlist successfully!'})



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