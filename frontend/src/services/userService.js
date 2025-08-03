export async function fetchUserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return null;

    try {
        const response = await fetch(`http://localhost:5000/api/users/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch user profile');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
