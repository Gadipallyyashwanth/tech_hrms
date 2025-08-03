// src/utils/csrf.js

export const getCSRFToken = () => {
  try {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
    return null; // CSRF token not found
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    return null;
  }
};
