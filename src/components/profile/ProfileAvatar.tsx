
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

interface ProfileAvatarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  isEditing: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar,
  firstName,
  lastName,
  isEditing,
  onAvatarChange
}) => {
  const getInitials = (first: string = '', last: string = '') => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative mb-4 cursor-pointer">
          <Avatar className="w-24 h-24 text-3xl">
            <AvatarImage src={avatar} alt="User avatar" />
            <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
              <Upload className="h-4 w-4" />
              <input 
                id="avatar-upload" 
                type="file" 
                className="hidden" 
                onChange={onAvatarChange} 
                accept="image/*" 
              />
            </label>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-w-2xl bg-transparent">
        <img 
          src={avatar} 
          alt="User avatar zoomed" 
          className="w-full h-auto rounded-lg max-h-[85vh] object-contain" 
        />
      </DialogContent>
    </Dialog>
  );
};
