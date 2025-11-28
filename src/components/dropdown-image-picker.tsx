import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

import type {ReactNode} from "react";
 type DropdownImagePickerProps = {
   isOpen: boolean;
   children: ReactNode;
   onOpenChange: () => void;
   previewHref: string
 }

export function DropdownImagePicker({isOpen, children, onOpenChange, previewHref}: DropdownImagePickerProps) {


  return (
    <DropdownMenu open = {isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className='w-full bg-gray-200 dark:bg-neutral-800  h-[300px] rounded-md text-center' >
        {previewHref == '' ? (<p className="min-w-[180px] w-full">Нажмите, чтобы добавить превью</p> ) : (<img className='max-h-full w-auto mx-auto' src={previewHref} alt='превью технологии'></img>)}

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )

}