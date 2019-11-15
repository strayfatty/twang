import './App.css';
import { Layout } from 'Layout';
import * as m from 'mithril';

import { Dashboard } from 'Pages/Dashboard';
import { LoginResult } from 'Pages/LoginResult';

m.route(document.body, '/', {
    '/': { render: () => m(Layout, m(Dashboard)) },
    '/loginresult': { render: () => m(LoginResult) },
});