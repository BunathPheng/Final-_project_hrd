"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, UserTag } from 'iconsax-reactjs';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const RoleComponent: FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();
  
  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    console.log(`✅ Role selected: ${role}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole) {
      // Navigate based on selected role with query parameters
      if (selectedRole === 'visitor') {
        // Navigate to: /register/visitor?visitor=visitor
        router.push('/register/visitor?role=visitor');
      } else if (selectedRole === 'museum_owner') {
        // Navigate to: /register/museum-owner?museum_owner=museum_owner
        router.push('/register/museum-owner?role=museum_owner');
      }
    } else {
      toast.error("Please select a role to continue");
    }
  };

  return (
    <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-10 mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="text-h5 lg:text-h4 text-primary-700 mb-6">
          Pick Your Role to Start
        </h1>
        
        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Visitor Card */}
          <label
            className={`bg-white rounded-lg border-2 ${
              selectedRole === 'visitor' 
              ? 'border-primary-700' 
              : 'border-grey-100'
            } p-6 cursor-pointer card-hover transition-all duration-300`}
          >
            <input
              type="radio"
              name="role"
              value="visitor"
              className="sr-only"
              checked={selectedRole === 'visitor'}
              onChange={() => handleRoleSelection('visitor')}
            />
            <div className="text-center">
              <div className="rounded-full flex items-center justify-center mx-auto mb-4">
                <UserTag 
                  size={40} 
                  color={selectedRole === 'visitor' ? "#B50000" : "#5B5B5B"}
                  className={selectedRole === 'visitor' ? '[&>*]:stroke-1 fill-primary-50 [&>*:last-child]:fill-primary-700' : '[&>*]:stroke-1'}
                />
              </div>
              <h3 className="text-h5 text-grey-900 mb-2">
                Visitor
              </h3>
              <p className="text-grey-800">Explore new things</p>
            </div>
          </label>
          
          {/* Museum Owner Card */}
          <label
            className={`bg-white rounded-lg border-2 ${
              selectedRole === 'museum_owner' 
              ? 'border-primary-700' 
              : 'border-grey-100'
            } p-6 cursor-pointer transition-all duration-300`}
          >
            <input
              type="radio"
              name="role"
              value="museum_owner"
              className="sr-only"
              checked={selectedRole === 'museum_owner'}
              onChange={() => handleRoleSelection('museum_owner')}
            />
            <div className="text-center">
              <div className="rounded-full flex items-center justify-center mx-auto mb-4">
                <UserTag 
                  size={40}
                  color={selectedRole === 'museum_owner' ? "#B50000" : "#5B5B5B"}
                  className={selectedRole === 'museum_owner' ? '[&>*]:stroke-1 fill-primary-50 [&>*:last-child]:fill-primary-700' : '[&>*]:stroke-1'}
                />
              </div>
              <h3 className="text-h5 text-grey-900 mb-2">
                Museum owner
              </h3>
              <p className="text-grey-800">Control your museum</p>
            </div>
          </label>
        </div>
        
        {/* Next Button */}
        <Button 
          className="w-full" 
          type="submit"
        >
          <span>Next</span>
          <ArrowRight className='[&>*]:stroke-2' />
        </Button>
      </form>
    </div>
  );
};