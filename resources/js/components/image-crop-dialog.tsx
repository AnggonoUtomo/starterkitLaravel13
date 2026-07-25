import { Crop, RotateCcw, RotateCw, Sparkles } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export interface ImageCropDialogProps {
    file: File | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply: (croppedFile: File) => void;
    aspectRatio?: number;
    title?: string;
}

type DragAction =
    'none' | 'new' | 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e';

export function ImageCropDialog({
    file,
    open,
    onOpenChange,
    onApply,
    aspectRatio = 1,
    title = 'Crop & Seleksi Area Gambar',
}: ImageCropDialogProps) {
    const [rotation, setRotation] = useState<number>(0);
    const [crop, setCrop] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>({
        x: 20,
        y: 20,
        width: 200,
        height: 200,
    });

    const [dragAction, setDragAction] = useState<DragAction>('none');
    const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [initialCrop, setInitialCrop] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const imageRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Derive ObjectURL for preview
    const imageSrc = useMemo(() => {
        if (!file) {
            return null;
        }

        return URL.createObjectURL(file);
    }, [file]);

    // Revoke ObjectURL on cleanup
    useEffect(() => {
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    // Initialize crop box on image load
    const handleImageLoad = () => {
        if (!containerRef.current || !imageRef.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const imgRect = imageRef.current.getBoundingClientRect();

        const imgLeftInContainer = imgRect.left - containerRect.left;
        const imgTopInContainer = imgRect.top - containerRect.top;

        const size = Math.min(imgRect.width, imgRect.height) * 0.8;
        setCrop({
            x: imgLeftInContainer + (imgRect.width - size) / 2,
            y: imgTopInContainer + (imgRect.height - size / aspectRatio) / 2,
            width: size,
            height: size / aspectRatio,
        });
    };

    // Helper: Clamp values within container bounds
    const clamp = (val: number, min: number, max: number) =>
        Math.max(min, Math.min(max, val));

    // Mouse Down (Start Drag / Selection)
    const handleMouseDown = (
        e: React.MouseEvent,
        action: DragAction = 'new',
    ) => {
        if (!containerRef.current) {
            return;
        }

        e.stopPropagation();
        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        setDragAction(action);
        setDragStartPos({ x: mouseX, y: mouseY });
        setInitialCrop({ ...crop });

        if (action === 'new') {
            setCrop({
                x: mouseX,
                y: mouseY,
                width: 10,
                height: 10 / aspectRatio,
            });
        }
    };

    // Mouse Move (Dragging Rubberband Box / Handles)
    const handleMouseMove = (e: React.MouseEvent) => {
        if (
            dragAction === 'none' ||
            !containerRef.current ||
            !imageRef.current
        ) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = clamp(
            e.clientX - containerRect.left,
            0,
            containerRect.width,
        );
        const mouseY = clamp(
            e.clientY - containerRect.top,
            0,
            containerRect.height,
        );

        const deltaX = mouseX - dragStartPos.x;
        const deltaY = mouseY - dragStartPos.y;

        if (dragAction === 'new') {
            const width = Math.abs(mouseX - dragStartPos.x);
            const height = width / aspectRatio;
            const x = mouseX < dragStartPos.x ? mouseX : dragStartPos.x;
            const y = mouseY < dragStartPos.y ? mouseY : dragStartPos.y;

            setCrop({
                x: clamp(x, 0, containerRect.width - 20),
                y: clamp(y, 0, containerRect.height - 20),
                width: clamp(width, 20, containerRect.width - x),
                height: clamp(height, 20, containerRect.height - y),
            });
        } else if (dragAction === 'move') {
            setCrop({
                ...initialCrop,
                x: clamp(
                    initialCrop.x + deltaX,
                    0,
                    containerRect.width - initialCrop.width,
                ),
                y: clamp(
                    initialCrop.y + deltaY,
                    0,
                    containerRect.height - initialCrop.height,
                ),
            });
        } else if (dragAction === 'se') {
            const newWidth = clamp(
                initialCrop.width + deltaX,
                30,
                containerRect.width - initialCrop.x,
            );
            const newHeight = newWidth / aspectRatio;
            setCrop({
                ...initialCrop,
                width: newWidth,
                height: clamp(
                    newHeight,
                    30,
                    containerRect.height - initialCrop.y,
                ),
            });
        } else if (dragAction === 'sw') {
            const newWidth = clamp(
                initialCrop.width - deltaX,
                30,
                initialCrop.x + initialCrop.width,
            );
            const newHeight = newWidth / aspectRatio;
            const newX = initialCrop.x + (initialCrop.width - newWidth);
            setCrop({
                ...initialCrop,
                x: newX,
                width: newWidth,
                height: clamp(
                    newHeight,
                    30,
                    containerRect.height - initialCrop.y,
                ),
            });
        } else if (dragAction === 'nw') {
            const newWidth = clamp(
                initialCrop.width - deltaX,
                30,
                initialCrop.x + initialCrop.width,
            );
            const newHeight = newWidth / aspectRatio;
            const newX = initialCrop.x + (initialCrop.width - newWidth);
            const newY = initialCrop.y + (initialCrop.height - newHeight);
            setCrop({
                x: clamp(newX, 0, containerRect.width - 30),
                y: clamp(newY, 0, containerRect.height - 30),
                width: newWidth,
                height: newHeight,
            });
        } else if (dragAction === 'ne') {
            const newWidth = clamp(
                initialCrop.width + deltaX,
                30,
                containerRect.width - initialCrop.x,
            );
            const newHeight = newWidth / aspectRatio;
            const newY = initialCrop.y + (initialCrop.height - newHeight);
            setCrop({
                ...initialCrop,
                y: clamp(newY, 0, containerRect.height - 30),
                width: newWidth,
                height: newHeight,
            });
        }
    };

    const handleMouseUp = () => {
        setDragAction('none');
    };

    const handleReset = () => {
        setRotation(0);
        handleImageLoad();
    };

    // Export Selection Box to HTML5 Canvas Blob
    const handleApply = () => {
        if (!file || !imageRef.current || !containerRef.current) {
            return;
        }

        const img = imageRef.current;
        const containerRect = containerRef.current.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();

        if (imgRect.width === 0 || imgRect.height === 0) {
            return;
        }

        // Calculate image offset relative to container
        const imgLeftInContainer = imgRect.left - containerRect.left;
        const imgTopInContainer = imgRect.top - containerRect.top;

        // Calculate crop box relative to image element
        const cropXInImg = crop.x - imgLeftInContainer;
        const cropYInImg = crop.y - imgTopInContainer;

        // Scale factors to map display pixels to natural image pixels
        const scaleX = img.naturalWidth / imgRect.width;
        const scaleY = img.naturalHeight / imgRect.height;

        // Real crop coordinates on natural image
        const realCropX = Math.max(0, cropXInImg * scaleX);
        const realCropY = Math.max(0, cropYInImg * scaleY);
        const realCropWidth = Math.min(
            img.naturalWidth - realCropX,
            crop.width * scaleX,
        );
        const realCropHeight = Math.min(
            img.naturalHeight - realCropY,
            crop.height * scaleY,
        );

        if (realCropWidth <= 0 || realCropHeight <= 0) {
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(realCropWidth));
        canvas.height = Math.max(1, Math.round(realCropHeight));

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        ctx.save();

        if (rotation !== 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        ctx.drawImage(
            img,
            realCropX,
            realCropY,
            realCropWidth,
            realCropHeight,
            0,
            0,
            canvas.width,
            canvas.height,
        );
        ctx.restore();

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    return;
                }

                const extension = file.name.split('.').pop() || 'png';
                const croppedFile = new File([blob], file.name, {
                    type: file.type || `image/${extension}`,
                    lastModified: Date.now(),
                });
                onApply(croppedFile);
                onOpenChange(false);
            },
            file.type || 'image/png',
            0.95,
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md gap-4 sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base font-bold">
                        <Crop className="size-4 text-emerald-500" />
                        <span>{title}</span>
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Seret kursor mouse untuk memilih area crop pada gambar
                        secara interaktif.
                    </DialogDescription>
                </DialogHeader>

                {/* Rubberband Selection Crop Container */}
                <div
                    ref={containerRef}
                    onMouseDown={(e) => handleMouseDown(e, 'new')}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-xl border bg-slate-950/90 select-none"
                >
                    {imageSrc && (
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Crop Canvas"
                            onLoad={handleImageLoad}
                            draggable={false}
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: 'transform 0.1s ease-out',
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                            }}
                            className="pointer-events-none select-none"
                        />
                    )}

                    {/* Dark Backdrop Overlay Outside Selection */}
                    <div className="pointer-events-none absolute inset-0 bg-black/50" />

                    {/* Rubberband Selection Box */}
                    <div
                        onMouseDown={(e) => handleMouseDown(e, 'move')}
                        style={{
                            left: `${crop.x}px`,
                            top: `${crop.y}px`,
                            width: `${crop.width}px`,
                            height: `${crop.height}px`,
                        }}
                        className="absolute cursor-move rounded-sm border-2 border-emerald-400 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
                    >
                        {/* Grid Guides */}
                        <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                            <div className="border-r border-b border-white" />
                            <div className="border-r border-b border-white" />
                            <div className="border-b border-white" />
                            <div className="border-r border-b border-white" />
                            <div className="border-r border-b border-white" />
                            <div className="border-b border-white" />
                        </div>

                        {/* Corner Resize Handles */}
                        <div
                            onMouseDown={(e) => handleMouseDown(e, 'nw')}
                            className="absolute -top-1.5 -left-1.5 size-3.5 cursor-nwse-resize rounded-full border border-white bg-emerald-500 shadow-xs hover:scale-125"
                        />
                        <div
                            onMouseDown={(e) => handleMouseDown(e, 'ne')}
                            className="absolute -top-1.5 -right-1.5 size-3.5 cursor-nesw-resize rounded-full border border-white bg-emerald-500 shadow-xs hover:scale-125"
                        />
                        <div
                            onMouseDown={(e) => handleMouseDown(e, 'sw')}
                            className="absolute -bottom-1.5 -left-1.5 size-3.5 cursor-nesw-resize rounded-full border border-white bg-emerald-500 shadow-xs hover:scale-125"
                        />
                        <div
                            onMouseDown={(e) => handleMouseDown(e, 'se')}
                            className="absolute -right-1.5 -bottom-1.5 size-3.5 cursor-nwse-resize rounded-full border border-white bg-emerald-500 shadow-xs hover:scale-125"
                        />
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Sparkles className="size-3.5 text-amber-500" />
                        <span>
                            Seret kotak atau sudut untuk mengubah area seleksi
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => setRotation((r) => r - 90)}
                        >
                            <RotateCcw className="size-3.5" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => setRotation((r) => r + 90)}
                        >
                            <RotateCw className="size-3.5" />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-semibold"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        onClick={handleApply}
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        <Crop className="size-4" />
                        Terapkan Seleksi Crop
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
