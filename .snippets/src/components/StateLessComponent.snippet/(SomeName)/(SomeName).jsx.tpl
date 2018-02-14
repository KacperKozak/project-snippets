import React from 'react';
import css from './<%= someName %>.css'

const <%= SomeName %> = ({ children }) => (
    <div className={css.<%= someName %>}>
        {children}
    </div>
);

export default <%= SomeName %>;
