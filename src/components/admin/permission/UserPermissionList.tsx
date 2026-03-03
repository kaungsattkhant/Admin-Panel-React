"use client";
import React,{useState} from "react";
import { Metadata } from "next";
import Checkbox from "@/components/form/input/Checkbox";
interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

interface Props {
  permissions: Permissions [],
  selectedPermissions: number[];
  handleToggle: (id: number) => void;
}
export default function UserPermissionList({permissions,selectedPermissions,handleToggle}:Props){
     const [isChecked, setIsChecked] = useState(false);
      const [isCheckedTwo, setIsCheckedTwo] = useState(true);
      const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);
      // console.log('User Permission is ',permissions);
      
    // return (
    //     <div className=" items-center gap-4">
      
    //     {
    //         permissions.map((group)=>(
    //               <div className=" items-center gap-3" key={group.name}>
    //         {group.name}
    //         </div>
    //     //          <div className="flex items-center gap-3" key={index}>
    //     //   <Checkbox checked={isChecked} onChange={setIsChecked} />
    //     //   <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
    //     //     Default
    //     //   </span>
    //     // </div>
    //         ))
    //     }
       
    //     </div>
    // );
    return (
        <div className="space-y-6">
  {permissions.map((group) => (
    <div
      key={group.name}
      className="grid grid-cols-12 gap-4 items-start"
    >
      {/* Column 1 (Name) */}
      <div className="col-span-2 font-semibold capitalize">
        {group.name} :
      </div>

      {/* Column 4 (Permissions Area) */}
      <div className="col-span-10">
        <div className="grid grid-cols-4 gap-4">
          {group.permissions.map((permission) => (
            <div
              key={permission.id}
              className="flex items-center gap-2"
            >
              <Checkbox
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handleToggle(permission.id)}
              />
              <span className="text-sm text-gray-700 dark:text-gray-400">
                {permission.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
    // <div className=" items-center gap-6">
    //   {permissions.map((group) => (
    //     <div className="flex items-center gap-6" key={group.name}>
    //       {/* Group Title */}
    //       <h3 className="text-lg font-semibold capitalize mb-3">
    //         {group.name} :
    //       </h3>

    //       {/* Permission List */}
    //       <div className="flex items-center gap-6">
    //         {group.permissions.map((permission) => (
    //           <div
    //             className="flex items-center gap-6"
    //             key={permission.id}
    //           >
    //             <Checkbox
    //               checked={selectedPermissions.includes(permission.id)}
    //               onChange={() => handleToggle(permission.id)}
    //             />
    //             <span className="text-sm text-gray-700 dark:text-gray-400">
    //               {permission.name}
    //             </span>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}