export interface Tag {
  tag: string;
  id: number;
}

export interface BookmarkFormData {
  title: string;
  description: string;
  url: string;
  tags: Tag[];
}