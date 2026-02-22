"use client";
import { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Link from "next/link";
import Button from "../../../components/ui/button/Button";
import { apiFetch } from "@/lib/api";
import UserTable from "../../../components/admin/user/UserTable";
// import { Metadata } from "next";
import { 
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
   } from "@/components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import Image from "next/image";

// export const metadata: Metadata = {
//   title: "Next.js User | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js User page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   phone_number: string;
//   type: string;
//   is_active: boolean;
// }

// Define the table data using the interface

export default  function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await apiFetch("/users");
        setUsers(res.data); 
      } catch (err) {
        console.error(err);
      }finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);
  return (
    <div>
      <PageBreadcrumb pageTitle="User" />
      <div className="space-y-6">
        <ComponentCard title="User List"
        headerRight={
         <Link href="/user/create">
      <Button size="sm" variant="primary">
        + Create User
      </Button>
    </Link>}
        >
           {
            loading ? (
              <div>Loading...</div>
            ) : (<UserTable users={users} />)
           }
        </ComponentCard>
        </div>
    </div>
  );
}