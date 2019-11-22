<template>
    <div>
        <h3>{{post.title}}</h3>
        <button @click="$emit('enlarge-text',0.1)">Enlarge text</button>
    </div>
</template>
<script>
export default {
  name: 'blogPost',
  props: ['post']
}
</script>
