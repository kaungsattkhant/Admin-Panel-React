"use client"; 
import React ,{ useEffect,useState } from "react";
import { apiFetch } from "@/lib/api";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import { Metadata } from "next";
import UserCreate from "@/components/admin/user/UserCreate";
// export const metadata: Metadata = {
//   title: "User Create",
// };

export default  function Create() {
      const [permissions, setPermissions] = useState([]);
      useEffect(()=>{
        async function fetchPermissions(){
try{
          const res= await apiFetch("/permissions");
          setPermissions(res.data);
        }catch(error){
          console.log(error);
        }
        }
        fetchPermissions();
        
      },[])
    // console.log('Permissions', permissions);
  return (
    <div>
      <PageBreadcrumb pageTitle="User " />
        <div className="space-y-6">
          <UserCreate permissions={permissions}/>
        </div>
    </div>
  );
}