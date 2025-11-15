import os
import redis
from dotenv import load_dotenv

load_dotenv()

redis_url = os.getenv("REDIS_URL")
redis_token = os.getenv("REDIS_TOKEN")

redis_client = redis.from_url(
    redis_url,
    password=redis_token,
    decode_responses=True
)
