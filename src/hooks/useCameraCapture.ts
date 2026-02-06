import { useState, useCallback, useRef } from 'react';

interface UseCameraCaptureResult {
  capturedImages: File[];
  captureFromCamera: () => Promise<void>;
  selectFromGallery: () => Promise<void>;
  removeImage: (index: number) => void;
  clearImages: () => void;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MAX_IMAGES = 5;
const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/heic,image/heif';

export function useCameraCapture(): UseCameraCaptureResult {
  const [capturedImages, setCapturedImages] = useState<File[]>([]);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );

    setCapturedImages((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, MAX_IMAGES);
    });

    e.target.value = '';
  }, []);

  const captureFromCamera = useCallback(async () => {
    cameraInputRef.current?.click();
  }, []);

  const selectFromGallery = useCallback(async () => {
    galleryInputRef.current?.click();
  }, []);

  const removeImage = useCallback((index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearImages = useCallback(() => {
    setCapturedImages([]);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  }, []);

  return {
    capturedImages,
    captureFromCamera,
    selectFromGallery,
    removeImage,
    clearImages,
    cameraInputRef,
    galleryInputRef,
    handleFileChange,
  };
}

export { MAX_IMAGES, ACCEPTED_TYPES };
