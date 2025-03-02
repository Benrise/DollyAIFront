export async function fetchImages(): Promise<string[]> {
  try {
    const response = await fetch('/api/example-images', { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}