"use client";

import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Page = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [placeholder, setplaceholder] = useState("Hello editor!")

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    }),
        [placeholder]
    );

    return (
        <div className="p-6">
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { setplaceholder(newContent) }}
            />
        </div>
    );
};

export default Page;
