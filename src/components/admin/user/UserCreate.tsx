"use client";
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import ComponentCard from '../../common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '../../../icons';
import User from '@/app/(admin)/users/page';
import UserPermissionList from '../permission/UserPermissionList';
import { createUser } from '@/services/user.service';
import  { useRouter} from "next/navigation";
import {toast} from "react-hot-toast";


const Select = dynamic(() => import("react-select"), {
  ssr: false,
});


interface Props {
  permissions: Permissions [],
}
export default function UserCreate({permissions}:Props) {
  const router= useRouter();
  const [loading,setLoading]=useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    type:"",
    password_confirmation: "",
    selectedPermissions: [] as number[],
  });
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  console.log(e.target.value);
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (selected: any) => {
  setForm((prev) => ({
    ...prev,
    type: selected ? selected.value : "",
  }));
};
  const handleTogglePermission = (id: number) => {
    console.log('Selected Id is ',id);
  setForm((prev) => ({
    ...prev,
    selectedPermissions: prev.selectedPermissions.includes(id)
      ? prev.selectedPermissions.filter((pid) => pid !== id)
      : [...prev.selectedPermissions, id],
  }));
};

 const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "super_admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  const  onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        console.log("Full Form State:", form);
        try {
    setLoading(true);
    await createUser(form);
    toast.success("User created successfully!");
     router.push("/users");
  } catch (error : any) {
    console.error(error);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
  };
  return (
    <ComponentCard title="User Create">
      <form onSubmit={onSubmit}>

      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <Input type="text" name="username" value={form.username} onChange={handleChange} required/>
        </div>
        <div>
          <Label>Email:</Label>
          <Input type="text" placeholder="example@gmail.com" name="email" value={form.email} onChange={handleChange} required/>
        </div>
          <div>
          <Label>Ph No:</Label>
          <Input type="text" placeholder="09123456789" name="phone_number" value={form.phone_number} onChange={handleChange} required/>
        </div>
        <div>
          <Label>Type</Label>
          <div className="relative">
           <Select
        options={options}
        placeholder="Search and select..."
        onChange={handleSelectChange}
        value={options.find((opt) => opt.value === form.type)}
        isSearchable
        className="text-sm"
        name="type"
        required
      />
          </div>
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={form.password} 
              onChange={handleChange} 
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
 <div>
          <Label>Password Confirmation</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password confirmation"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              required  
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
        <UserPermissionList permissions={permissions} selectedPermissions={form.selectedPermissions} handleToggle={handleTogglePermission}/>
        
        {/* <div>
          <DatePicker
            id="date-picker"
            label="DOB"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div> */}

<Button type="submit" size="md" variant="primary" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>        {/* <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Card number"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </span>
          </div>
        </div> */}
      </div>
      </form>
    </ComponentCard>
  );
}
