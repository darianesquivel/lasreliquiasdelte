import { Timestamp } from "firebase/firestore/lite";
import type { BadgeProps } from "@radix-ui/themes";

export type CategoryColor = BadgeProps["color"];

export interface Category {
  id: string;
  name: string;
  color: CategoryColor;
  createdAt: Timestamp;
}

export type NewCategory = Omit<Category, "id" | "createdAt">;
