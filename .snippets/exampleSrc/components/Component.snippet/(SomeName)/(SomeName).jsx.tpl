import React from 'react';
<% if (styles) { %>
import css from './<%= someName %>.css'
<% } %>
const <%= SomeName %> = ({ children }) => (
    <% if (styles) { %><div className={css.<%= someName %>}><% } else { %><div><% } %>
        {children}
    </div>
);

export default <%= SomeName %>;
