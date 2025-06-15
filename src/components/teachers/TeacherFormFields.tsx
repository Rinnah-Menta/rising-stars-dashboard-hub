
import React from 'react';
import { BasicInfoFields } from './form/BasicInfoFields';
import { ClassSelector } from './form/ClassSelector';
import { ProfessionalInfoFields } from './form/ProfessionalInfoFields';
import { ContactInfoFields } from './form/ContactInfoFields';

interface TeacherFormFieldsProps {
  formData: {
    name: string;
    subject: string;
    classes: string;
    phone: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    experience: string;
    email: string;
    address: string;
    qualification: string;
    department: string;
  };
  setFormData: (data: any) => void;
}

export const TeacherFormFields: React.FC<TeacherFormFieldsProps> = ({
  formData,
  setFormData
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Handle multi-select for classes
  const selectedClasses = formData.classes ? formData.classes.split(', ') : [];
  
  const handleClassToggle = (className: string) => {
    const currentClasses = selectedClasses;
    const updatedClasses = currentClasses.includes(className)
      ? currentClasses.filter(c => c !== className)
      : [...currentClasses, className];
    
    handleInputChange('classes', updatedClasses.join(', '));
  };

  const removeClass = (className: string) => {
    const updatedClasses = selectedClasses.filter(c => c !== className);
    handleInputChange('classes', updatedClasses.join(', '));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BasicInfoFields 
        formData={formData}
        onInputChange={handleInputChange}
      />
      
      <ClassSelector
        selectedClasses={selectedClasses}
        onClassToggle={handleClassToggle}
        onRemoveClass={removeClass}
      />
      
      <ProfessionalInfoFields
        formData={formData}
        onInputChange={handleInputChange}
      />
      
      <ContactInfoFields
        formData={formData}
        onInputChange={handleInputChange}
      />
    </div>
  );
};
