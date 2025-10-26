// Utility to handle image paths correctly for both development and production
export const getImagePath = (imagePath) => {
  // Remove leading ./ if present
  const cleanPath = imagePath.startsWith('./') ? imagePath.substring(2) : imagePath;
  
  // Get the base path from environment or use default
  const basePath = import.meta.env.VITE_BASE_PATH || '/-My-Portfolio-Website';
  
  // For development (when base path is empty or undefined)
  if (!basePath || basePath === '/') {
    return `/${cleanPath}`;
  }
  
  // For production with base path
  return `${basePath}/${cleanPath}`;
};

// Export commonly used image paths
export const profileImage = 'assets/profile.png';
export const fullBodyImage = 'assets/Full body.png';