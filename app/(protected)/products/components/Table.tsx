"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

// const data: Product[] = [
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "1GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 1000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "2T Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 2000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "3GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 3200,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "4GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 4000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "5GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 5000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "1GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 1000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     type: {
//       id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//       name: "Inova",
//     },
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "2T Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 2000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "3GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 3200,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "4GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 4000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "5GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 5000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "1GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 1000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "2T Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 2000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "3GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 3200,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "4GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 4000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "5GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 5000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "1GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 1000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "2T Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 2000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "3GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 3200,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "4GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 4000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "5GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 5000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "1GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 1000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "2T Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 2000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "3GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 3200,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "4GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 4000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "5GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 5000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "1GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 1000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "2T Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 2000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "3GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 3200,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "4GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 4000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
//   {
//     id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//     name: "5GT Timing belt pulley kit 60 teeth 20 teeth with 200mm belt width 10m - 20T8 ~ 60T8",
//     sub_category_id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//     type_id: "ec2183f0-df95-48cb-8234-6e6414636e29",
//     price: "95000",
//     stock: 5000,
//     min_order_quantity: 100,
//     min_order_price: "90000",
//     sub_category: {
//       id: "785f0d81-68c3-40a6-a168-d46bbd9d949a",
//       name: "Timing Belt",
//       main_category_id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//       main_category: {
//         id: "e8e69c82-cc6b-4e56-8d1c-ec7dd146778a",
//         name: "Sistem Mesin",
//       },
//     },
//     photos: [
//       {
//         id: "870456a3-8ba8-4768-83a1-7dfe06821e11",
//         url: "https://files.edgestore.dev/33ji2re52mg7uy65/publicFiles/_public/bd47bed3-e373-486a-a1ec-321e5fd48efd.jpg",
//         product_id: "012fe2ed-a00a-4534-ab62-dbfe1bdaca8f",
//       },
//     ],
//   },
// ];

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "photo",
    id: "Photo",
    header: ({ column }) => {
      return <div>Photo</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.original.photos?.map((item) => {
          return (
            <Image
              key={item.id}
              src={item.url}
              height={100}
              width={100}
              alt={row.original.name}
            />
          );
        })}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "sub_category.name",
    id: "Kategori",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type.name",
    id: "Tipe Mobil",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mobil
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "min_order_quantity",
    id: "Minimal Order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Min Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "min_order_price",
    id: "Harga Eceran",
    header: "Harga Eceran",
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Harga</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the price as a dollar price
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ data }: { data: Product[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [category, setCategory] = useState<SubCategory[]>([]);
  const [type, setType] = useState<Type[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openType, setOpenType] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Kategori: false,
    "Tipe Mobil": false,
    "Minimal Order": false,
    "Harga Eceran": false,
    Photo: false,
  });

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedItemIds = table.getSelectedRowModel().rows.map((item) => {
    return item.original.id;
  });

  const filterCategory = table
    .getColumn("Kategori")
    ?.getFilterValue() as string;
  const filterType = table.getColumn("Tipe Mobil")?.getFilterValue() as string;
  return (
    <div className="w-full">
      <div className="flex items-center py-4 flex-wrap">
        <Input
          placeholder="Filter Nama..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {category && (
          <Popover
            open={openCategory}
            onOpenChange={setOpenCategory}
            modal={true}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[180px] justify-between",
                  filterCategory && "text-muted-foreground"
                )}
              >
                {filterCategory
                  ? category.find(
                      (account) => account.name === filterCategory!
                    )!.name
                  : "Kategori"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Cari..." />
                <CommandEmpty>
                  <p>Tidak ditemukan ...</p>
                </CommandEmpty>
                <CommandGroup className=" max-h-80 overflow-auto">
                  <CommandList>
                    {category.map((account) => (
                      <CommandItem
                        value={account.name}
                        key={account.id}
                        onSelect={(value) => {
                          table.getColumn("Kategori")?.setFilterValue(value);
                          setOpenCategory(false);
                        }}
                      >
                        {`${account.name}`}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}{" "}
        {type && (
          <Popover open={openType} onOpenChange={setOpenType} modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[180px] justify-between",
                  filterType && "text-muted-foreground"
                )}
              >
                {filterType
                  ? type.find((account) => account.name === filterType!)!.name
                  : "Tipe Mobil"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Cari..." />
                <CommandEmpty>
                  <p>Tidak ditemukan ...</p>
                </CommandEmpty>
                <CommandGroup className=" max-h-80 overflow-auto">
                  <CommandList>
                    {type.map((account) => (
                      <CommandItem
                        value={account.name}
                        key={account.id}
                        onSelect={(value) => {
                          table.getColumn("Tipe Mobil")?.setFilterValue(value);
                          setOpenType(false);
                        }}
                      >
                        {`${account.name}`}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolom <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border max-[500px]:w-[250px]">
        <Table className="overflow-y-auto relative  ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
