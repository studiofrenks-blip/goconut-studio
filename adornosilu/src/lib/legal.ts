import { site } from "./site";
export const UPDATED = "8 de noviembre de 2026";
export const C = site.company;
export const meta = (title: string, path: string) => ({ title, alternates: { canonical: path } });
