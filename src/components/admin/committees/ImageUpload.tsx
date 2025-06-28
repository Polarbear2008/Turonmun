import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string) => void;
  onImageRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImageUrl, 
  onImageChange, 
  onImageRemove 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (PNG, JPG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `committees/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('committees')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('committees')
        .getPublicUrl(filePath);

      console.log('File uploaded successfully:', publicUrl);
      
      onImageChange(publicUrl);
      
      toast({
        title: "Upload Successful",
        description: "Committee image has been uploaded successfully",
      });

    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageUrl) return;

    try {
      // Extract file path from URL for Supabase storage files
      if (currentImageUrl.includes('supabase.co')) {
        const urlParts = currentImageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `committees/${fileName}`;

        // Delete from storage
        const { error } = await supabase.storage
          .from('committees')
          .remove([filePath]);

        if (error) {
          console.error('Error deleting file:', error);
          // Don't throw error if file doesn't exist
        }
      }

      onImageRemove();
      
      toast({
        title: "Image Removed",
        description: "Committee image has been removed",
      });

    } catch (error: any) {
      console.error('Error removing image:', error);
      toast({
        title: "Error",
        description: "Failed to remove image from storage",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Committee Image</label>
      
      {currentImageUrl ? (
        <div className="relative group">
          <img 
            src={currentImageUrl} 
            alt="Committee" 
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center rounded-lg">
            <button
              type="button"
              onClick={handleRemoveImage}
              className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? 'border-diplomatic-500 bg-diplomatic-50'
              : 'border-gray-300 hover:border-diplomatic-400'
          } ${isUploading ? 'opacity-50' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {isUploading ? (
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-diplomatic-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-diplomatic-600 animate-pulse" />
              </div>
              <p className="text-sm text-gray-600">Uploading image...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-diplomatic-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Drop an image here, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-diplomatic-600 hover:text-diplomatic-800 underline"
                  >
                    browse files
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 