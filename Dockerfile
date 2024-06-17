FROM python:3.11.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required dependencies
RUN pip install --no-cache-dir yt-dlp==2024.05.27
RUN pip install --no-cache-dir flask

# Expose port 5000 for the Flask app
EXPOSE 5000

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Run the application
CMD ["python", "app.py"]
