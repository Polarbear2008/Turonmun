
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomButton } from '@/components/ui/custom-button';
import { categories } from './resourcesConfig';

export interface ResourceFormData {
  id: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

interface ResourceFormProps {
  formData: ResourceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResourceFormData>>;
  resetForm: () => void;
  fetchResources: () => Promise<void>;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  formData,
  setFormData,
  resetForm,
  fetchResources,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description || !formData.link) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (formData.id) {
        // Update
        const { error } = await supabase
          .from('resources')
          .update({
            category: formData.category,
            title: formData.title,
            description: formData.description,
            link: formData.link,
          })
          .eq('id', formData.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Resource updated successfully",
        });
      } else {
        // Create
        const { error } = await supabase
          .from('resources')
          .insert({
            category: formData.category,
            title: formData.title,
            description: formData.description,
            link: formData.link,
          });
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Resource created successfully",
        });
      }
      
      resetForm();
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        title: "Error",
        description: "Failed to save resource",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {formData.id ? 'Edit Resource' : 'Create Resource'}
        </h2>
        <button
          onClick={resetForm}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Category</Label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Link URL</Label>
          <Input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="https://example.com/resource.pdf"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <CustomButton
            variant="outline"
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : formData.id ? 'Update Resource' : 'Create Resource'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
