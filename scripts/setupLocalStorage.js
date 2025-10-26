// Script to setup localStorage for local development
// This creates an HTML file that sets up the test user in localStorage

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testUserData = {
  id_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1RXE2dlVzSHNxMEtQd2VRVmNwY2s2TGNMLU51VGNHcjhFSmJDMjhEV1Q4In0.eyJleHAiOjE3NjE1MDc0NzcsImlhdCI6MTc2MTUwNzE3NywiYXV0aF90aW1lIjoxNzYxNTA1NTg4LCJqdGkiOiI0MzdmZDlkNy1jZjYwLTNlNjQtYjI4Mi0yNWIxZDJjY2ZiYmQiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLnNhdS1wb3J0YWwuZGUvcmVhbG1zL3NhdSIsImF1ZCI6InJvb3QtdWkiLCJzdWIiOiJiN2FjYjgyNS00ZTcwLTQ5ZTQtODRhMS1iZjVkYzdjOGY1MDkiLCJ0eXAiOiJJRCIsImF6cCI6InJvb3QtdWkiLCJzaWQiOiIzYjY5YWUwYy1lZTIwLTRjNzItODdhNC04MzIyZWFhMDA2YmUiLCJhdF9oYXNoIjoiQXJ5NkJScEp3eUpjQUEwVTZ5Y0JOQSIsImFjciI6IjEiLCJ1cG4iOiJ0ZXN0LXN0dWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgU3R1ZCIsImdyb3VwcyI6WyJkZWZhdWx0LXJvbGVzLXNhdSIsIkFyZWEtMi5UZWFtLTYuVXBkYXRlLmFudHJhZy11cGRhdGUiLCJBcmVhLTIuVGVhbS03LlJlYWQucmVhZC1kb2N1bWVudCIsIkFyZWEtMi5UZWFtLTYuUmVhZC5hbnRyYWctcmVhZCIsInN0dWRlbnQiLCJvZmZsaW5lX2FjY2VzcyIsIkFyZWEtMi5UZWFtLTYuRGVsZXRlLmFudHJhZy1kZWxldGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0LXN0dWQiLCJnaXZlbl9uYW1lIjoiVGVzdCIsImZhbWlseV9uYW1lIjoiU3R1ZCIsImVtYWlsIjoidGVzdC1zdHVkQHNhdS1wb3J0YWwuZGUifQ.jN7FEvVc-kwgvnWjbvL7iwcMVoHbK0gomNeGQjDPydY720e_T_3LKcxawno2jiGG22t1-r_3VBzMc2HAgSPd-AGLZSbquyKozW2DTQcDzdf_74fS05SYMymop2njP2gJtnHqPdny-IyzkE-jhZ-1vWGfmCR1sZdflqK4Gjm0Xc7T6teYUq4isWHo5vFRtHQmbpb5xlrP1AqaYAW7P-fhvl-cZ-FnYuOaT3NlrloFl9Xk06NGBydaW2cjGmKNt8VCI-CZbkfG_l0Z3acJgRJ8lIkQFWIjIr5vvQqCWTmFTgZRer8z8ge2MfD3ubITuTA-w-E6uteTSt7wmlogYRGeMA",
  session_state: "3b69ae0c-ee20-4c72-87a4-8322eaa006be",
  access_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1RXE2dlVzSHNxMEtQd2VRVmNwY2s2TGNMLU51VGNHcjhFSmJDMjhEV1Q4In0.eyJleHAiOjE3NjE1MDc0NzcsImlhdCI6MTc2MTUwNzE3NywiYXV0aF90aW1lIjoxNzYxNTA1NTg4LCJqdGkiOiJvbnJ0cnQ6ZDgxMThiM2ItZjljZC0yMjQyLTY2ZjQtMDZkYzFlNTkxYTEyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zYXUtcG9ydGFsLmRlL3JlYWxtcy9zYXUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYjdhY2I4MjUtNGU3MC00OWU0LTg0YTEtYmY1ZGM3YzhmNTA5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicm9vdC11aSIsInNpZCI6IjNiNjlhZTBjLWVlMjAtNGM3Mi04N2E0LTgzMjJlYWEwMDZiZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9zYXUtcG9ydGFsLmRlIiwiKiIsImh0dHBzOi8vc2F1LXBvcnRhbC5kZS8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNhdSIsIkFyZWEtMi5UZWFtLTYuVXBkYXRlLmFudHJhZy11cGRhdGUiLCJBcmVhLTIuVGVhbS03LlJlYWQucmVhZC1kb2N1bWVudCIsIkFyZWEtMi5UZWFtLTYuUmVhZC5hbnRyYWctcmVhZCIsInN0dWRlbnQiLCJvZmZsaW5lX2FjY2VzcyIsIkFyZWEtMi5UZWFtLTYuRGVsZXRlLmFudHJhZy1kZWxldGUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgbWljcm9wcm9maWxlLWp3dCBlbWFpbCIsInVwbiI6InRlc3Qtc3R1ZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiVGVzdCBTdHVkIiwiZ3JvdXBzIjpbImRlZmF1bHQtcm9sZXMtc2F1IiwiQXJlYS0yLlRlYW0tNi5VcGRhdGUuYW50cmFnLXVwZGF0ZSIsIkFyZWEtMi5UZWFtLTcuUmVhZC5yZWFkLWRvY3VtZW50IiwiQXJlYS0yLlRlYW0tNi5SZWFkLmFudHJhZy1yZWFkIiwic3R1ZGVudCIsIm9mZmxpbmVfYWNjZXNzIiwiQXJlYS0yLlRlYW0tNi5EZWxldGUuYW50cmFnLWRlbGV0ZSIsInVtYV9hdXRob3JpemF0aW9uIl0sInByZWZlcnJlZF91c2VybmFtZSI6InRlc3Qtc3R1ZCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJTdHVkIiwiZW1haWwiOiJ0ZXN0LXN0dWRAc2F1LXBvcnRhbC5kZSJ9.QKDiF9lRRhKQIXJRxDyWSwt3K1tm-J50M8Wt8UImkosHViQ7L1j_KmjYjOx98Fk57lWkUzmn6y7--Q7QFwKUmKs47BMNxY9Z9k7-5-xmwAsK5T3I1YJ3jpJVCZZo4lgED7cIRCXIWKSt2u4clD8dWNDJVzzptpEyDU3-1ug-1Sk2u8ah_lLj_W73KszjcHGisErOnJDPDy4utdfANmu933ulE-SZaq66cYn834BSkas_xhm4JABAr2iBBWroobJy4f8sYUEFaMpCk9z71zupx5HMhd84l6Ebn7DRO0w0PbBgrs9j6uCM2bafMPDXeH_iIJdhCZatyG_Mq87KEKUH5w",
  refresh_token: "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYWRiYjk0MC1mOGU4LTQ4OGItOWUyNi0yNzQzMGU2NzdjZmQifQ.eyJleHAiOjE3NjE1MDg5NzcsImlhdCI6MTc2MTUwNzE3NywianRpIjoiODUwNmE0ZmQtZGVkMi0zYWU5LTMxMDktYzNjMTk5ZmYzYWNmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zYXUtcG9ydGFsLmRlL3JlYWxtcy9zYXUiLCJhdWQiOiJodHRwczovL2tleWNsb2FrLnNhdS1wb3J0YWwuZGUvcmVhbG1zL3NhdSIsInN1YiI6ImI3YWNiODI1LTRlNzAtNDllNC04NGExLWJmNWRjN2M4ZjUwOSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJyb290LXVpIiwic2lkIjoiM2I2OWFlMGMtZWUyMC00YzcyLTg3YTQtODMyMmVhYTAwNmJlIiwic2NvcGUiOiJvcGVuaWQgYWNyIHByb2ZpbGUgcm9sZXMgd2ViLW9yaWdpbnMgbWljcm9wcm9maWxlLWp3dCBiYXNpYyBlbWFpbCJ9.9ClB1Oqesb3HeA4gTgUlUhfgtw8sGLOWFrkSXeEX1akdixn2pFyztEQjUH9T2D9PmsWir9DcFbTssYAbrnst4g",
  token_type: "Bearer",
  scope: "openid profile microprofile-jwt email",
  profile: {
    exp: 1761507477,
    iat: 1761507177,
    iss: "https://keycloak.sau-portal.de/realms/sau",
    aud: "root-ui",
    sub: "b7acb825-4e70-49e4-84a1-bf5dc7c8f509",
    typ: "ID",
    sid: "3b69ae0c-ee20-4c72-87a4-8322eaa006be",
    upn: "test-stud",
    email_verified: true,
    name: "Test Stud",
    groups: [
      "default-roles-sau",
      "Area-2.Team-6.Update.antrag-update",
      "Area-2.Team-7.Read.read-document",
      "Area-2.Team-6.Read.antrag-read",
      "student",
      "offline_access",
      "Area-2.Team-6.Delete.antrag-delete",
      "uma_authorization"
    ],
    preferred_username: "test-stud",
    given_name: "Test",
    family_name: "Stud",
    email: "test-stud@sau-portal.de"
  },
  expires_at: 1761507477
};

const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Local Dev Setup</title>
</head>
<body>
  <h1>Setting up test user for local development...</h1>
  <script>
    const testUser = ${JSON.stringify(testUserData, null, 2)};
    const key = 'oidc.user:https://keycloak.sau-portal.de/realms/sau:root-ui';
    localStorage.setItem(key, JSON.stringify(testUser));
    console.log('[Local Dev Setup] Test user stored in localStorage');
    console.log('User ID:', testUser.profile.sub);
    console.log('Name:', testUser.profile.name);
    console.log('Email:', testUser.profile.email);
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  </script>
</body>
</html>`;

const publicDir = path.join(__dirname, '..', 'public');
const setupFilePath = path.join(publicDir, 'setup-local-user.html');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(setupFilePath, htmlContent);
console.log('✅ Created setup-local-user.html in public directory');
console.log('📝 Navigate to http://localhost:5173/setup-local-user.html after starting dev server to setup test user');
