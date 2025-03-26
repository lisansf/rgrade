'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ImageResize from 'tiptap-extension-resize-image';

import Toolbar from './Toolbar';

interface TiptapProps {
    value?: string; // ✅ Tambahkan `value` untuk menampilkan data lama
    onChange: (html: string) => void;
}

export default function Tiptap({ value = "<p>Start typing...</p>", onChange }: TiptapProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3"
                }
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3"
                }
            }),
            Highlight,
            Image,
            ImageResize
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const htmlContent = editor.getHTML();
            onChange(htmlContent);
        },
    });

    // ✅ Perbarui konten jika `value` berubah
    useEffect(() => {
        if (editor && value) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className='flex flex-col gap-2 p-4 border-2 border-gray-400 rounded min-h-[600px] max-h-full'>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="editor-wrapper" />
        </div>
    );
};