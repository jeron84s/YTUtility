from flask import Flask, request, send_from_directory, send_file
import subprocess
import os
import uuid
from pathlib import Path

app = Flask(__name__, static_folder='static', static_url_path='')

# Get the user's home directory and specify the download folder
home_directory = Path.home()
DOWNLOAD_FOLDER = home_directory / 'Downloads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)


@app.route('/')
def index():
    return send_file('static/index.html')

@app.route('/download', methods=['POST'])
def download_playlist():
    data = request.json
    url = data.get('url')
    format = data.get('format')
    playlist_id = str(uuid.uuid4())
    output_dir = os.path.join(DOWNLOAD_FOLDER, playlist_id)
    os.makedirs(output_dir, exist_ok=True)
    
    if format == 'mp3':
        cmd = [
            'yt-dlp', 
            '-x', '--audio-format', 'mp3', 
            '-o', f'{output_dir}/%(title)s.%(ext)s', 
            url
        ]
    else:
        cmd = [
            'yt-dlp', 
            '-o', f'{output_dir}/%(title)s.%(ext)s', 
            url
        ]
    
    subprocess.run(cmd)
    
    return {'playlist_id': playlist_id}, 200

@app.route('/downloads/<playlist_id>/<filename>', methods=['GET'])
def get_download(playlist_id, filename):
    return send_from_directory(f"{DOWNLOAD_FOLDER}/{playlist_id}", filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
