export async function generateVirtualTryOn(
  personBase64: string,
  personMimeType: string,
  outfitBase64: string,
  outfitMimeType: string
): Promise<string> {
  const response = await fetch('/api/try-on', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personBase64,
      personMimeType,
      outfitBase64,
      outfitMimeType,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'An unknown error occurred on the server.');
  }

  if (!result.image) {
    throw new Error('The server did not return an image.');
  }
  
  return result.image;
}
