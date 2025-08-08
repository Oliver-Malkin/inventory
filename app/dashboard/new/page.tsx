import AddNewForm from "@/app/ui/dashboard/new/new-component-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'New Item',
};

export default function Dashboard() {
  return (
    <AddNewForm />
  );
}