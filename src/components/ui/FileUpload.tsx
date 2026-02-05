import React from "react";
import { Button } from "@base-ui/react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import wpMedia, { IWpMediaData } from "@/lib/WpMedia";
type FileUploadProps = {
  btnText?: string;
  text?: string,
  description?: string,
  onUpload: (file: IWpMediaData | any | null) => void,
  className?: string,
  variant?: 'text' | 'button' | 'button-text',
  handlerType?: 'default' | 'custom',
  id?: string,
  isDroppable?: boolean,
  accept?: string,
  multiple?: boolean
}

function FileUpload( {
  btnText,
  text,
  description, 
  onUpload, 
  className, 
  handlerType = 'default', 
  variant = 'button', 
  id = React.useId(),
  isDroppable = false,
  accept,
  multiple = false
}: FileUploadProps ) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handle = (e?: React.MouseEvent | React.ChangeEvent) => {
    if (handlerType === 'default') {
      wpMedia( onUpload );
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(multiple ? Array.from(files) : files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    if (!isDroppable) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    if (!isDroppable) return;
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    if (!isDroppable) return;
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onUpload(multiple ? Array.from(files) : files[0]);
    }
  };

  const Wrapper = (props) => {
    const wrapperClasses = cn( 
      variant === 'button-text' ? 'flex flex-col px-0 py-4 gap-2.5 justify-start ring-0! border-none! shadow-none' : 'flex flex-col p-4 gap-2.5 justify-center items-center rounded-[5px] bg-muted! text-center ring-0! border! border-border! border-dashed! shadow-none',
      isDragging && 'border-primary bg-primary/10',
      className 
    );

    return (
      <Card 
        className={ wrapperClasses }
        onDragOver={ onDragOver }
        onDragLeave={ onDragLeave }
        onDrop={ onDrop }
      >
        { variant === 'text' ? (
          <label htmlFor={ id } className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2.5">
            { props.children }
          </label>
        ) : props.children }
      </Card>
    );
  }

  return (
    <>
      <Wrapper>
        {
          variant === 'button' && (
            <>
              <Button
                className="border! border-border p-[6px_16px] rounded-[3px] bg-background cursor-pointer"
                onClick={ handle }
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium! text-[14px]! leading-5!">
                    { btnText }
                  </span>
                  <Upload size={ 16 } />
                </div>
              </Button>

              <p className="text-muted-foreground p-0! m-0! font-normal text-[12px]">
                { description }
              </p>
            </>
          )
        }
        {
          variant === 'text' && (
            <>
              <span className="font-medium! text-[14px]! leading-5! text-primary hover:underline cursor-pointer">
                { text }
              </span>

              <input
                type="file"
                id={ id }
                ref={ fileInputRef }
                onChange={ onFileChange }
                className="hidden"
                accept={ accept }
                multiple={ multiple }
              />

              <p className="text-muted-foreground p-0! m-0! font-normal text-[12px]">
                { description }
              </p>
            </>
          )
        }

        {
          variant === 'button-text' && (
            <div className="flex flex-row gap-2.5">
              <Button
                className="border! border-primary! text-primary! p-[6px_16px] rounded-[3px] bg-background cursor-pointer"
                onClick={ handle }
              >
                <span className="font-medium! text-[14px]! leading-5!">
                    { btnText }
                  </span>
              </Button>

              <div className="flex flex-col items-start" style={{ minWidth: 100 }}>
                <span className="font-medium! text-[14px]! leading-5! text-primary hover:underline cursor-pointer" onClick={ handle }>
                  { text }
                </span>

                <p className="text-muted-foreground p-0! m-0! font-normal text-[12px]">
                  { description }
                </p>
              </div>
            </div>
          )
        }
      </Wrapper>
    </>
  );
}

export {
  FileUpload,
  FileUploadProps,
};