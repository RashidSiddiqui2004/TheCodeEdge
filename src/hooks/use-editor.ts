import { useEffect, useRef, type MutableRefObject } from "react"
import type EditorJS from "@editorjs/editorjs"
import type { OutputData, EditorConfig } from "@editorjs/editorjs"

interface UseEditorProps {
    data?: OutputData
    onChange?: (data: OutputData) => void
    editorRef: MutableRefObject<HTMLDivElement | null>
}

export const useEditor = ({ data, onChange, editorRef }: UseEditorProps) => {
    const editorInstanceRef = useRef<EditorJS | null>(null)

    useEffect(() => {
        if (editorRef.current && !editorInstanceRef.current) {
            const EditorJS = require("@editorjs/editorjs").default
            const Header = require("@editorjs/header")
            const List = require("@editorjs/list")

            const editorConfig: EditorConfig = {
                holder: editorRef.current,
                tools: {
                    header: Header,
                    list: List,
                },
                data: data,
                onChange: async () => {
                    const outputData = await editorInstanceRef.current?.save()
                    if (outputData) {
                        onChange?.(outputData)
                    }
                },
            }

            const editor = new EditorJS(editorConfig)
            editorInstanceRef.current = editor
        }

        return () => {
            if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
                editorInstanceRef.current.destroy()
            }
        }
    }, [data, onChange, editorRef])

    return editorInstanceRef
}

