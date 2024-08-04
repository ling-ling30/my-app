/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9NG6paBWLcJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Inventory Management Software
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Streamline your inventory operations with our powerful and
                  user-friendly software. Gain real-time visibility, optimize
                  stock levels, and automate your workflows.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Product"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Powerful Inventory Management
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our software offers a comprehensive set of features to help you
                manage your inventory efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-4">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Real-Time Tracking</h3>
                    <p className="text-muted-foreground">
                      Monitor stock levels, sales, and orders in real-time
                      across multiple locations.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Automated Reordering</h3>
                    <p className="text-muted-foreground">
                      Set up low stock alerts and automatically generate
                      purchase orders to maintain optimal inventory levels.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Barcode Scanning</h3>
                    <p className="text-muted-foreground">
                      Streamline your inventory management with barcode scanning
                      for faster item lookup and tracking.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Features"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Screenshots
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Intuitive User Interface
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the clean and user-friendly design of our inventory
                management software.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Screenshot 1"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <img
              src="/placeholder.svg"
              width="550"
              height="310"
              alt="Screenshot 2"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Flexible Pricing Plans
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that best fits your business needs and scale as
                you grow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for small businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$19</div>
                <p className="text-muted-foreground">per month</p>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Real-time inventory tracking
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Automated reordering
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Basic reporting
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$49</div>
                <p className="text-muted-foreground">per month</p>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Advanced inventory analytics
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Barcode scanning
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Customizable reporting
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large-scale operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$99</div>
                <p className="text-muted-foreground">per month</p>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Multi-location management
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Advanced forecasting
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Dedicated support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
