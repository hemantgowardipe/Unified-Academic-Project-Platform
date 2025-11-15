import os
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

class AuthMiddleware(MiddlewareMixin):
    """
    Middleware to locally validate JWT issued by auth_service
    and attach the same token for use in other internal service calls.
    """

    def process_request(self, request):
        # 1️⃣ Get Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Missing or invalid Authorization header'}, status=401)

        token = auth_header.split(' ')[1]

        # 2️⃣ Decode the token using the same secret as your Spring Boot auth_service
        secret_key = os.getenv('JWT_SECRET', 'secret')  # ⚠️ Replace 'secret' with your actual JWT secret
        try:
            decoded = jwt.decode(token, secret_key, algorithms=['HS256'])

            # 3️⃣ Attach user info and token for later use
            request.user_info = {
                'user_id': decoded.get('sub'),
                'role': decoded.get('role'),
                'exp': decoded.get('exp'),
                'token': token  # ✅ Store the same token to forward to submission_service
            }

            return None

        except ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        except Exception as e:
            return JsonResponse({'error': f'JWT validation failed: {str(e)}'}, status=401)
