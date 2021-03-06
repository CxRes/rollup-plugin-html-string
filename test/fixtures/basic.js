import tpl from './templates/tpl.html';

const match = `<h1>This is the Title</h1>

<section class="section">
  <article class="article">Article 1</article>
  <article class="article">Article 2</article>
</section>

<script>
  (function() {
    console.log('init');
  }());
</script>
`;

// eslint-disable-next-line no-undef
assert.strictEqual(tpl.replace(/\r?\n/mg, '\n'), match);
