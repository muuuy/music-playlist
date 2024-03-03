from flask import Flask, jsonify
from flask import render_template
from flask import request
import sqlite3

app = Flask(__name__)

# Home Page route
@app.route("/")
def home():
    return "<p>Hello, sqlite3</p>"



# Route to add a new record (INSERT) student data to the database
@app.route("/addUser", methods=['POST', 'GET'])
def addrec():
    # Data will be available from POST submitted by the form
    if request.method == 'POST':
        try:
            data = request.get_json()
            userName = data['userName']
            email = data['email']
            password = data['password']

            # Check if the userName already exists in the database
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("SELECT userName FROM user WHERE userName=?", (userName,))
                existing_id = cur.fetchone()

                if existing_id:
                    msg = f"Record with userName {userName} already exists in the database"
                else:
                    # Perform the INSERT operation only if the ID doesn't exist
                    cur.execute("INSERT INTO user (userName, email, password) VALUES (?,?,?)", (userName, email, password))
                    con.commit()
                    msg = "Record successfully added to the database"
        except Exception as e:
            con.rollback()
            msg = f"Error in the INSERT: {str(e)}"
        finally:
            con.close()
            get_data()  # Refresh the data after adding or rejecting the entry
            # Send the transaction message to the front-end
            return jsonify({'message': msg})
        
# Route used to DELETE a specific record in the database    
@app.route("/removeUser", methods=['POST','GET'])
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
        
@app.route('/create_playlist', methods=['POST'])
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
@app.route('/add_to_playlist', methods=['POST'])
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

# if __name__ == "__main__":
#     app.run(debug=True)