export interface Bookmark {
    id: string;
    user_id: string;
    title: string;
    description: string;
    url: string;
    favicon_url: string;
    created_at: string;
    bookmark_tags: {
      tags: {
        tag: string;
        id: number;
      };
    }[];
    is_archived: boolean;
    is_pinned: boolean;
    visit_count: number;
    last_visited: string | null;
}