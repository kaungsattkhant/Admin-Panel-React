import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import UserCreate from "@/components/admin/user/UserCreate";
export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function create() {
  return (
    <div>
      <PageBreadcrumb pageTitle="User " />
        <div className="space-y-6">
          <UserCreate />
        </div>
    </div>
  );
}