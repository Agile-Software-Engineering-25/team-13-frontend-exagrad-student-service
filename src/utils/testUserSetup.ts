// TODO: REMOVE - This is for local testing only
import { User } from 'oidc-client-ts';
import { setGlobalUser } from '@hooks/useUser';

const testUserData = {
  id_token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1RXE2dlVzSHNxMEtQd2VRVmNwY2s2TGNMLU51VGNHcjhFSmJDMjhEV1Q4In0.eyJleHAiOjE3NjIzNzE1MjQsImlhdCI6MTc2MjM3MTIyNCwiYXV0aF90aW1lIjoxNzYyMzcxMjI0LCJqdGkiOiJkMzg4YTVlNC0yNmE2LWYwNTAtZmM0My0zZmU2YTg5Y2VkOTgiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLnNhdS1wb3J0YWwuZGUvcmVhbG1zL3NhdSIsImF1ZCI6InJvb3QtdWkiLCJzdWIiOiJkMDNhYTAwNi02ZjBiLTQ5MzktOTI4Ny03NTM3OThiNmQ0MDMiLCJ0eXAiOiJJRCIsImF6cCI6InJvb3QtdWkiLCJzaWQiOiI1NDE5ZDhjNy0xMzMxLTRkY2UtOTA1My1lN2M5M2FkMmYxZWYiLCJhdF9oYXNoIjoiN1N5U3lzcXFwaGlpS3FlOFhhSjk2QSIsImFjciI6IjEiLCJ1cG4iOiJ0ZXN0LXN0dWQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJ0ZXN0IHN0dWQiLCJncm91cHMiOlsiQXJlYS0yLlRlYW0tNi5VcGRhdGUuYW50cmFnLXVwZGF0ZSIsIkFyZWEtMi5UZWFtLTcuUmVhZC5yZWFkLWRvY3VtZW50IiwiQXJlYS0yLlRlYW0tNi5SZWFkLmFudHJhZy1yZWFkIiwic3R1ZGVudCIsIkFyZWEtMi5UZWFtLTUuUmVhZC5OZXdzUG9zdC1DaGVtaXN0cnkiLCJBcmVhLTIuVGVhbS01LlJlYWQuTmV3c1Bvc3QtQ29tcHV0ZXJTY2llbmNlIiwiQXJlYS0yLlRlYW0tNS5SZWFkLk5ld3NQb3N0LUVuZ2luZWVyaW5nIiwiQXJlYS0xLlRlYW0tMi5SZWFkLkV2ZW50cyIsIkFyZWEtMi5UZWFtLTYuRGVsZXRlLmFudHJhZy1kZWxldGUiLCJkZWZhdWx0LXJvbGVzLXNhdSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJBcmVhLTIuVGVhbS01LlJlYWQuTmV3c1Bvc3QtQnVzaW5lc3MiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdC1zdHVkIiwiZ2l2ZW5fbmFtZSI6InRlc3QiLCJmYW1pbHlfbmFtZSI6InN0dWQifQ.eKoBUL-Hac8l1G80xByAJ0NlpWWXTsLd6vzp2YZBaX-zYqX857EVJNW80qV7DkVrD90CWBovqUBDuhfzrCBHy18onCKgt_itkhbVVHd118HZCRMwcq4TvRjhmOXI4khGZDU2naijTt4bUEppkYgCcd7WCqcMSEwQDXCKUWr5k8Cqqxd81DVwmzI_cDNkguRFGGTk7hObXQRNX41rvx6SSOgav77FOMHVcQsKLohZ7bpXVhw3lLZphe5vh9DaG_jHRAIVJCqc4VjXF2R8CBUitnTfXYJ4q9EezgZsZA6MfAUwxmP_6z85TGp2mA-qVkYAzo-keBJNZib9VJGuXeXppg',
  session_state: '5419d8c7-1331-4dce-9053-e7c93ad2f1ef',
  access_token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1RXE2dlVzSHNxMEtQd2VRVmNwY2s2TGNMLU51VGNHcjhFSmJDMjhEV1Q4In0.eyJleHAiOjE3NjIzNzE1MjQsImlhdCI6MTc2MjM3MTIyNCwiYXV0aF90aW1lIjoxNzYyMzcxMjI0LCJqdGkiOiJvbnJ0YWM6NzZkZTcwOTQtYzk5NC1jNWU4LWMxNTUtMTM4NjUyNmVmYWU4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zYXUtcG9ydGFsLmRlL3JlYWxtcy9zYXUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDAzYWEwMDYtNmYwYi00OTM5LTkyODctNzUzNzk4YjZkNDAzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicm9vdC11aSIsInNpZCI6IjU0MTlkOGM3LTEzMzEtNGRjZS05MDUzLWU3YzkzYWQyZjFlZiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9zYXUtcG9ydGFsLmRlIiwiKiIsImh0dHBzOi8vc2F1LXBvcnRhbC5kZS8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJBcmVhLTIuVGVhbS02LlVwZGF0ZS5hbnRyYWctdXBkYXRlIiwiQXJlYS0yLlRlYW0tNy5SZWFkLnJlYWQtZG9jdW1lbnQiLCJBcmVhLTIuVGVhbS02LlJlYWQuYW50cmFnLXJlYWQiLCJzdHVkZW50IiwiQXJlYS0yLlRlYW0tNS5SZWFkLk5ld3NQb3N0LUNoZW1pc3RyeSIsIkFyZWEtMi5UZWFtLTUuUmVhZC5OZXdzUG9zdC1Db21wdXRlclNjaWVuY2UiLCJBcmVhLTIuVGVhbS01LlJlYWQuTmV3c1Bvc3QtRW5naW5lZXJpbmciLCJBcmVhLTEuVGVhbS0yLlJlYWQuRXZlbnRzIiwiQXJlYS0yLlRlYW0tNi5EZWxldGUuYW50cmFnLWRlbGV0ZSIsImRlZmF1bHQtcm9sZXMtc2F1Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFyZWEtMi5UZWFtLTUuUmVhZC5OZXdzUG9zdC1CdXNpbmVzcyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgbWljcm9wcm9maWxlLWp3dCBlbWFpbCIsInVwbiI6InRlc3Qtc3R1ZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6InRlc3Qgc3R1ZCIsImdyb3VwcyI6WyJBcmVhLTIuVGVhbS02LlVwZGF0ZS5hbnRyYWctdXBkYXRlIiwiQXJlYS0yLlRlYW0tNy5SZWFkLnJlYWQtZG9jdW1lbnQiLCJBcmVhLTIuVGVhbS02LlJlYWQuYW50cmFnLXJlYWQiLCJzdHVkZW50IiwiQXJlYS0yLlRlYW0tNS5SZWFkLk5ld3NQb3N0LUNoZW1pc3RyeSIsIkFyZWEtMi5UZWFtLTUuUmVhZC5OZXdzUG9zdC1Db21wdXRlclNjaWVuY2UiLCJBcmVhLTIuVGVhbS01LlJlYWQuTmV3c1Bvc3QtRW5naW5lZXJpbmciLCJBcmVhLTEuVGVhbS0yLlJlYWQuRXZlbnRzIiwiQXJlYS0yLlRlYW0tNi5EZWxldGUuYW50cmFnLWRlbGV0ZSIsImRlZmF1bHQtcm9sZXMtc2F1Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFyZWEtMi5UZWFtLTUuUmVhZC5OZXdzUG9zdC1CdXNpbmVzcyJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0LXN0dWQiLCJnaXZlbl9uYW1lIjoidGVzdCIsImZhbWlseV9uYW1lIjoic3R1ZCJ9.meFHG85qannE93D11_llJX9Su_JOh4_leazy7geyCYeG2k7az212Vjxz2Myf9UEq9J-VXUY4uQ27o25pUrzJZwgtNCUhFYLmtlAdApiEA3tQFpkNJIsiErfu-InMUsfPHC809MnXkjwktuvMifYHRsHBn0QRo9ExO5NCH7Bt3XebpbWSM3u7aEbDcDL3U2bqeWDos8smlqiC_L5hmIy72NQi-SJsznbgP2_uuFJthecOSOM-270X9k28AzCtZ8c8OL5JbJiwSjwECxrqgMdqqyF7cZFVUsxa5vcXJIES49KUEFAYqBpYJ4zdAPeDh9qwkTX2NggDyLyL-niO2UpMZQ',
  refresh_token:
    'eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYWRiYjk0MC1mOGU4LTQ4OGItOWUyNi0yNzQzMGU2NzdjZmQifQ.eyJleHAiOjE3NjIzNzMwMjQsImlhdCI6MTc2MjM3MTIyNCwianRpIjoiYTBjMDZiZTMtMDAwYS0wODU0LTZmNjAtOWM4ZDBjZDdlOTY2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zYXUtcG9ydGFsLmRlL3JlYWxtcy9zYXUiLCJhdWQiOiJodHRwczovL2tleWNsb2FrLnNhdS1wb3J0YWwuZGUvcmVhbG1zL3NhdSIsInN1YiI6ImQwM2FhMDA2LTZmMGItNDkzOS05Mjg3LTc1Mzc5OGI2ZDQwMyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJyb290LXVpIiwic2lkIjoiNTQxOWQ4YzctMTMzMS00ZGNlLTkwNTMtZTdjOTNhZDJmMWVmIiwic2NvcGUiOiJvcGVuaWQgYWNyIHByb2ZpbGUgcm9sZXMgd2ViLW9yaWdpbnMgbWljcm9wcm9maWxlLWp3dCBiYXNpYyBlbWFpbCJ9.iTaf2FUHRwJzlC0qxWMdiJFY1TF7KsmvswTszo_CPcvcix8JXO-QPP-1nOGqvQK9QqVrt4F7BVubb5TklJX8BQ',
  token_type: 'Bearer',
  scope: 'openid profile microprofile-jwt email',
  profile: {
    exp: 1762371524,
    iat: 1762371224,
    iss: 'https://keycloak.sau-portal.de/realms/sau',
    aud: 'root-ui',
    sub: 'd03aa006-6f0b-4939-9287-753798b6d403',
    typ: 'ID',
    sid: '5419d8c7-1331-4dce-9053-e7c93ad2f1ef',
    upn: 'test-stud',
    email_verified: false,
    name: 'test stud',
    groups: [
      'Area-2.Team-6.Update.antrag-update',
      'Area-2.Team-7.Read.read-document',
      'Area-2.Team-6.Read.antrag-read',
      'student',
      'Area-2.Team-5.Read.NewsPost-Chemistry',
      'Area-2.Team-5.Read.NewsPost-ComputerScience',
      'Area-2.Team-5.Read.NewsPost-Engineering',
      'Area-1.Team-2.Read.Events',
      'Area-2.Team-6.Delete.antrag-delete',
      'default-roles-sau',
      'offline_access',
      'uma_authorization',
      'Area-2.Team-5.Read.NewsPost-Business',
    ],
    preferred_username: 'test-stud',
    given_name: 'test',
    family_name: 'stud',
  },
  expires_at: 1762371525,
};

export const setupTestUser = () => {
  const userDataKey =
    'oidc.user:https://keycloak.sau-portal.de/realms/sau:root-ui';
  const existingUserStr = localStorage.getItem(userDataKey);

  // If user doesn't exist in localStorage, set it up
  if (!existingUserStr) {
    localStorage.setItem(userDataKey, JSON.stringify(testUserData));
    console.log('[TEST SETUP] Test user injected into localStorage');
  }

  // Load user data (either existing or just injected)
  const userDataStr = localStorage.getItem(userDataKey);
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      const user = userData as User;
      setGlobalUser(user);
      console.log(
        '[TEST SETUP] User loaded:',
        user.profile.sub,
        '-',
        user.profile.name
      );
    } catch (error) {
      console.error('[TEST SETUP] Failed to parse user data:', error);
    }
  }
};
