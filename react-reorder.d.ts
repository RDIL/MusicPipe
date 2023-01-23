declare module "react-reorder" {
    const Reorder: React.FC<ReorderProps>

    export default Reorder

    interface ReorderProps {
        reorderId: string
        reorderGroup?: string
        placeholderClassName?: string
        draggedClassName?: string
        lock?: "horizontal" | "vertical"
        holdTime?: number
        touchHoldTime?: number
        mouseHoldTime?: number
        onReorder?: (
            event: any,
            previousIndex: number,
            nextIndex: number,
            fromId: string,
            toId: string
        ) => void
        placeholder?: React.ReactNode
        children: React.ReactNode | React.ReactNode[]
    }
}
