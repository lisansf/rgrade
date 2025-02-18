'use client';

import Toggle from './Toggle';
import { Editor } from '@tiptap/react';
import {
    Heading1, Heading2, Heading3, Bold, Italic, Strikethrough,
    AlignCenter, AlignLeft, AlignRight, Highlighter, ListOrdered, Code, Upload,
} from 'lucide-react';

export default function Toolbar({ editor }: { editor: Editor }) {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const options = [
        {
            icon: <Heading1 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 }),
            label: 'Heading 1',
        },
        {
            icon: <Heading2 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 }),
            label: 'Heading 2',
        },
        {
            icon: <Heading3 />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 }),
            label: 'Heading 3',
        },
        {
            icon: <Bold />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold'),
            label: 'Bold',
        },
        {
            icon: <Italic />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic'),
            label: 'Italic',
        },
        {
            icon: <Strikethrough />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike'),
            label: 'Strikethrough',
        },
        {
            icon: <ListOrdered />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive('orderedList'),
            label: 'Ordered List',
        },
        {
            icon: <AlignLeft />,
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            pressed: editor.isActive({ textAlign: 'left' }),
            label: 'Align Left',
        },
        {
            icon: <AlignCenter />,
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            pressed: editor.isActive({ textAlign: 'center' }),
            label: 'Align Center',
        },
        {
            icon: <AlignRight />,
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            pressed: editor.isActive({ textAlign: 'right' }),
            label: 'Align Right',
        },
        {
            icon: <Code />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            pressed: editor.isActive('code'),
            label: 'Code',
        },
        {
            icon: <Upload />,
            onClick: () => addImage(),
        },
        {
            icon: <Highlighter />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive('highlight'),
            label: 'Highlight',
        },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {options.map((option, index) => (
                <Toggle
                    key={index}
                    pressed={option.pressed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
        </div>
    );
}