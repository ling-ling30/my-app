import React from "react";
import AddProductForm from "../components/AddProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="p-10">
      <Card className="">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Add a new product</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
