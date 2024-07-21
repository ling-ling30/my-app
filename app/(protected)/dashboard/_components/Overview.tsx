import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ClockIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  Users2Icon,
} from "lucide-react";
import { auth } from "@/auth";
type Props = {};

async function Overview({}: Props) {
  const session = await auth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back, {session?.user?.name}!</CardTitle>
        <CardDescription>
          Here&apos;s a quick overview of your account and recent activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                Total Orders
              </div>
              <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">124</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </div>
              <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">$12,345</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                New Customers
              </div>
              <Users2Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">32</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                Pending Orders
              </div>
              <ClockIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold">8</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Overview;
