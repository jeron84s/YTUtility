FROM python:3.11.9-slim AS builder

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11.9-slim
COPY --from=builder /usr/local /usr/local
COPY . /app

WORKDIR /app/YTUtility
EXPOSE 5000

ENV PYTHONUNBUFFERED=1

CMD ["python", "app.py"]
