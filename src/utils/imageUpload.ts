import { supabase } from '../lib/supabase';

const MAX_IMAGE_WIDTH = 1920;
const MAX_IMAGE_HEIGHT = 1080;
const JPEG_QUALITY = 0.85;

export interface UploadResult {
  url: string;
  path: string;
}

export async function compressImage(
  file: File,
  maxWidth = MAX_IMAGE_WIDTH,
  maxHeight = MAX_IMAGE_HEIGHT
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image with white background (for transparency)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export async function uploadImage(
  file: File,
  userId: string,
  submissionId: string
): Promise<UploadResult> {
  // Compress the image
  const compressedBlob = await compressImage(file);

  // Generate unique filename
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const filename = `${timestamp}-${randomId}.jpg`;
  const path = `${userId}/${submissionId}/${filename}`;

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('submission-images')
    .upload(path, compressedBlob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('submission-images')
    .getPublicUrl(path);

  return {
    url: urlData.publicUrl,
    path,
  };
}

export async function uploadImages(
  files: File[],
  userId: string,
  submissionId: string
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadImage(file, userId, submissionId))
  );
  return results;
}

export async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from('submission-images')
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}
