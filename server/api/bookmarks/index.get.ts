import * as Bookmarks from '~/server/src/bookmark';
import { getDatabase } from '~~/server/src/database';

export default defineEventHandler(async (event) => {
  const { databaseFilePath } = useRuntimeConfig();
  const db = await getDatabase(databaseFilePath);
  return await Bookmarks.list(db);
});
