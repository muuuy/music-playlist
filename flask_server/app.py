from flask import Flask, render_template, request, url_for, flash, redirect, abort, jsonify
from dotenv import load_dotenv
import os
from requests import post, get
import json
from flask_cors import CORS
import traceback

load_dotenv()

app = Flask(__name__)
CORS(app)

# Store environment variables
refresh_token = os.getenv("REFRESH_TOKEN")

HOST = "https://api.chartmetric.com"
TOKEN = refresh_token

# Get Access token
def get_token():
    result = post(f'{HOST}/api/token', json={"refreshtoken": TOKEN})
    if result.status_code != 200:
        print(
            f'ERROR: received a {result.status_code} instead of 200 from '
            f'/api/token')
        exit(1)

    access_token = result.json()['token']

    return access_token


def get_auth_header(token):
    return {"Authorization": f"Bearer {token}"}


def search_song(token, song_name):
    empty_list = []
    url = f"https://api.chartmetric.com/api/search"
    headers = get_auth_header(token)
    query = f"?q={song_name}&limit=5&type=tracks"

    query_url = url + query
    result = get(query_url, headers=headers)
    if result.status_code != 200:
        print("Error")
        exit(1)
    elif len(json.loads(result.content)["obj"]["tracks"]) == 0:
        return empty_list
    else:
        json_result = json.loads(result.content)["obj"]["tracks"]
        return json_result


def get_artist_id(token, artist_name):
    url = f"https://api.chartmetric.com/api/search"
    headers = get_auth_header(token)
    query = f"?q={artist_name}&type=artists&limit=1"

    query_url = url + query
    result = get(query_url, headers=headers)
    if result.status_code != 200:
        print("Error")
        exit(1)
    # Check length of result to determine if it's empty
    elif len(json.loads(result.content)['obj']['artists']) == 0:
        return -1
    # If not empty list, return the artist ID
    else:
        artist_id = json.loads(result.content)['obj']['artists'][0]['id']
        return artist_id


def search_songs_of_artist(token, artist_name):
    empty_list = []
    artist_id = get_artist_id(token, artist_name)
    if artist_id < 0:
        return empty_list
    url = f"https://api.chartmetric.com/api/artist/{artist_id}/tracks"
    headers = get_auth_header(token)
    query = "?limit=20&artist_type=main"

    query_url = url + query
    result = get(query_url, headers=headers)
    if result.status_code != 200:
        print("Error")
        exit(1)
    json_result = json.loads(result.content)['obj']

    return json_result


token = get_token()


@app.route('/')
def home():
    return jsonify({"Hello":"World"})


@app.route('/user_search', methods=['POST'])
def search():
    query_data = request.json
    query = query_data.get('search_box')
    query_type = query_data.get('search_type')

    # Define the characters you want to remove from the query string
    chars_to_remove = ['"', "'", ";", "<", ">", "/"]  # Add any other characters you want to remove

    # Remove the specified characters from the query string
    cleaned_query = ''.join(char for char in query if char not in chars_to_remove)

    print("query_data:", query_data, "| query:", cleaned_query, "| query_type:", query_type)

    if query_type == "song":
        results = search_song(token, cleaned_query)
        return jsonify(results=results)
    else:
        results = search_songs_of_artist(token, cleaned_query)
        return jsonify(results=results)
