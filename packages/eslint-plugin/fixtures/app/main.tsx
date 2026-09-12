// App entry that forgot the runtime contract: no `import 'tenet-ui/styles.css'`.
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Newsroom } from '../violations';

createRoot(document.getElementById('root')!).render(<Newsroom onSave={() => {}} />);
