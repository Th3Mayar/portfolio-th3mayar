<template>
  <div class="code-snippet">
    <div class="snippet-header">
      <Typography variant="FiraCode" as="h5" color="light" caseType="upper">
        {{ title }}
      </Typography>
      <span class="snippet-meta">{{ createdBy }} - {{ date }}</span>
    </div>
    <pre><code>{{ codeSnippet }}</code></pre>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    codeSnippet: String,
    createdBy: String,
    date: String,
  },
};
</script>

<style scoped>
.code-snippet {
  background-color: #0e1b2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 255, 0, 0.3);
  margin-bottom: 20px;
}

.snippet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.snippet-meta {
  font-size: 0.9rem;
  color: #00ff00;
}

pre {
  background-color: #122338;
  padding: 10px;
  border-radius: 10px;
  overflow-x: auto;
  color: #00ff00;
}
</style>
