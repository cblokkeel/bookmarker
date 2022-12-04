import { getDatabase } from './../../src/database';
import * as Bookmarks from '~/server/src/bookmark';

export default defineEventHandler(async (event) => {
  const { databaseFilePath } = useRuntimeConfig();
  const db = await getDatabase(databaseFilePath);

  const body = await readBody(event);
  return Bookmarks.create(db, body);
});
