import type { ComponentType } from "react";
import { DetailPage } from "../registry/blocks/detail-page";
import { FormPage } from "../registry/blocks/form-page";
import { ListPage } from "../registry/blocks/list-page";

export interface BlockMeta {
  title: string;
  description: string;
  Component: ComponentType;
}

/** Slug = registry item name = file name in registry/blocks. */
export const blocks: Record<string, BlockMeta> = {
  "list-page": {
    title: "List page",
    description: "Title and primary action, filter row, table and empty state.",
    Component: ListPage,
  },
  "detail-page": {
    title: "Detail page",
    description: "Breadcrumb, status header, tabs, details and summary cards.",
    Component: DetailPage,
  },
  "form-page": {
    title: "Form page",
    description: "Sectioned form in cards with a two-column grid and footer actions.",
    Component: FormPage,
  },
};
