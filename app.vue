<template>
  <main class="container">
    <!-- FORM -->

    <form @submit.prevent="addBookmark" class="bookmark-form">
      <label for="url" class="bookmark-form__title">Add Bookmarks</label>
      <input type="url" name="url" id="url" v-model="newBookmark" required />
      <button type="submit">Add</button>
    </form>

    <!-- BOOKMARKS -->

    <div v-if="pending">Loading...</div>

    <div v-else-if="bookmarks && bookmarks.length > 0">
      <ul class="bookmark-list">
        <li
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          class="bookmark-list__item"
        >
          <a
            class="bookmark-link"
            :href="bookmark.url"
            target="_blank"
            rel="noopener noreferer"
          >
            <img :src="bookmark.icon.url" />
            {{ bookmark.url }}
          </a>
        </li>
      </ul>
    </div>

    <div v-else>No bookmarks yet...</div>
  </main>
</template>

<script lang="ts" setup>
const newBookmark = ref('');

const { pending, data: bookmarks } = useAsyncData(async () =>
  $fetch('/api/bookmarks'),
);

const addBookmark = async () => {
  if (bookmarks.value === null || newBookmark.value.trim() === '') {
    return;
  }

  const bookmark = await $fetch('/api/bookmarks/create', {
    method: 'POST',
    body: {
      url: newBookmark.value,
    },
  });

  console.log(bookmark);
  newBookmark.value = '';

  bookmarks.value.push(bookmark);
};
</script>

<style>
* {
  font-family: sans-serif;
}

html {
  font-size: 10px;
  background-color: rgb(5, 8, 48);
  color: white;
}

.container {
  max-width: max(95vh, 60rem);
  margin-inline: auto;
}

.container .bookmark-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
}

.bookmark-form__title {
  font-size: 2rem;
}

.bookmark-form input,
.bookmark-form button {
  padding: 1rem;
  width: 30rem;
}

.bookmark-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.bookmark-list__item {
  margin-block: 1rem;
}

.bookmark-list__item img {
  aspect-ratio: 1;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 100%;
  transition: all 100ms linear;
}

.bookmark-list__item:hover img {
  border-radius: 0.3rem;
  scale: 1.12;
}

.bookmark-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
}
</style>
