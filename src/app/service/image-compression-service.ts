import { Injectable } from '@angular/core';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressionService {
  async compressImage(file: File): Promise<File> {
    const options = {
      maxSizeMB: 0.5, // Reduced to 500KB
      maxWidthOrHeight: 1280, // Reduced dimensions
      useWebWorker: true,
      initialQuality: 0.7 // Added quality parameter
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return new File([compressedFile], file.name, { type: 'image/jpeg' }); // Force JPEG format
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  }

  getFileSizeInMB(file: File): number {
    return file.size / (1024 * 1024);
  }

  async createThumbnail(file: File): Promise<File> {
    const options = {
      maxSizeMB: 0.1, // 100KB for thumbnails
      maxWidthOrHeight: 300,
      useWebWorker: true,
      initialQuality: 0.6
    };

    try {
      const thumbnail = await imageCompression(file, options);
      return new File([thumbnail], `thumb_${file.name}`, { type: 'image/jpeg' });
    } catch (error) {
      console.error('Error creating thumbnail:', error);
      throw error;
    }
  }
}