export interface IBlogForm {
    title: string;
    author_name: string;
    content: string;
    images: any[];
}
export interface IBlogEditForm {
    title: string,
    content: string,
    author_name: string,
    tags: string[],
    is_feature: boolean
  }

export interface Post {
    user_id: number;
    updated_at: string;
    images: string[];
    title: string;
    content: string;
    is_feature: boolean;
    tags: string | null;
    created_at: string;
    id: number;
    slug: string;
    author_name: string;
    views: number;
}

export interface IComment {
    id: number;
    like: number;
    name: string;
    content: string;
    user_id: number;
    post_id: number;
    created_at: string;
    parent_comment_id: number | null;
    child_comments: IComment[];
}

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    images: string[];
    created_at: string;
    author_name: string;
    comments: IComment[];
}