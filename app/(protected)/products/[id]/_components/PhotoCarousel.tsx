"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
type Props = {
  data: Photo[];
  className?: string;
};

export default function PhotoCarousel({ data, className }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div
        className={cn(
          "p-4 flex justify-center flex-col items-center min-w-[150px]",
          className
        )}
      >
        <Carousel setApi={setApi} className="w-full max-w-xs relative">
          <CarouselContent className="flex justify-center">
            {data.map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image src={_.url} alt="product" width={200} height={200} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2" />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </>
  );
}
