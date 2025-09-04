// Mock image generation for demo purposes
export async function GenerateImage({ prompt }: { prompt: string }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Return a placeholder image URL
  const imageId = Math.random().toString(36).substring(7);
  return {
    url: `https://picsum.photos/512/512?random=${imageId}`,
    id: imageId
  };
}