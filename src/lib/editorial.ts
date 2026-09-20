export const editorialStatuses = ['PROVISIONAL', 'REVIEWED', 'FINAL'] as const;

export type EditorialStatus = (typeof editorialStatuses)[number];

export interface EditorialMeta {
  status: EditorialStatus;
}

export interface EditorialAction {
  label: string;
  href: string;
}
