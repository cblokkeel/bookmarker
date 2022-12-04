import { DatabaseConnection, sql } from '@databases/sqlite';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { generateIconUrl } from './utils';

const bookmarks: Bookmark[] = [];

export interface Bookmark {
  id: string;
  url: string;
  icon: {
    url: string;
    version: number;
  };
  createdAt: Date;
  updateddAt: Date;
}

interface AddOptions {
  url: string;
}

const AddOptionsSchema = z.object({ url: z.string().url() });

export async function list(db: DatabaseConnection): Promise<Bookmark[]> {
  return db.query(sql`SELECT * FROM bookmarks`);
}

export async function create(
  db: DatabaseConnection,
  options: AddOptions,
): Promise<Bookmark> {
  const params = AddOptionsSchema.parse(options);

  const bookmark: Bookmark = {
    id: randomUUID(),
    url: params.url,
    icon: {
      url: generateIconUrl(params.url),
      version: Date.now(),
    },
    createdAt: new Date(),
    updateddAt: new Date(),
  };

  db.query(
    sql`INSERT INTO BOOKMARKS (id, url, icon_url, icon_version, createdAt, updatedAt) VALUES (${bookmark.id}, ${bookmark.url}, ${bookmark.icon.url}, ${bookmark.icon.version}, ${bookmark.createdAt}, ${bookmark.updateddAt})`,
  );
  return bookmark;
}
