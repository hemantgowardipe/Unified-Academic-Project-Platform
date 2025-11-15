# Set Python version (Render default is 3.11, compatible with our packages)
FROM python:3.11-slim

# Set app directory
WORKDIR /app

# Prevent Python from buffering output
ENV PYTHONUNBUFFERED=1

# Install system dependencies (required for PyMuPDF)
RUN apt-get update && apt-get install -y \
    build-essential \
    zlib1g-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Expose port Render expects
EXPOSE 10000

# Run app using gunicorn
CMD ["gunicorn", "ai_companion.wsgi:application", "--bind", "0.0.0.0:10000"]
