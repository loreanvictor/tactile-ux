import { makeRenderer } from 'callbag-jsx';

const renderer = makeRenderer();

renderer.render(<>
  Hellow World!
</>).on(document.body);
