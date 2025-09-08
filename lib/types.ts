import type { Component, Category } from "@prisma/client"

type WithRelation<T, R extends object> = T & R;

export type ComponentWithCategory = WithRelation<Component, { category: Category }>

export interface FormCategory {
  label: string;
  value: string;
}