import { dateFormat } from "../utils/date";

export interface IIssue {
  title: string;
  body: string;
  comments: number;
  created_at: string;
  number: number;
  user: {
    login: string;
    avatar_url: string;
  };
}

export class Issue {
  id: number;
  title: string;
  body: string;
  comments: number;
  createdAt: string;
  user: {
    nickname: string;
    avatarUrl: string;
  };

  constructor(data: IIssue) {
    this.id = data.number;
    this.title = data.title;
    this.body = data.body;
    this.comments = data.comments;
    this.createdAt = dateFormat(new Date(data.created_at), "long");
    this.user = {
      nickname: data.user.login,
      avatarUrl: data.user.avatar_url,
    };
  }
}
