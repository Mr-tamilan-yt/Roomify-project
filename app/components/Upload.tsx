import { CheckCircle2, ImageIcon, UploadIcon } from 'lucide-react';
import React, { useState, useRef } from 'react'
import { useOutletContext } from "react-router"
import { PROGRESS_INTERVAL_MS, PROGRESS_STEP, REDIRECT_DELAY_MS } from '../../lib/constants'

interface UploadProps {
  onComplete?: (base64Data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { isSignedIn } = useOutletContext<AuthContext>()

    const processFile = (selectedFile: File) => {
      setFile(selectedFile);
      setProgress(0);

      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target?.result as string;

        intervalRef.current = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + PROGRESS_STEP;

            if (newProgress >= 100) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }

              setTimeout(() => {
                if (onComplete) {
                  onComplete(base64String);
                }
                setProgress(0);
                setFile(null);
              }, REDIRECT_DELAY_MS);

              return 100;
            }

            return newProgress;
          });
        }, PROGRESS_INTERVAL_MS);
      };

      reader.readAsDataURL(selectedFile);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isSignedIn) return;

      const files = event.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (isSignedIn) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      if (!isSignedIn) return;

      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    }
  return (
    <div className="upload">
        {!file ? (
            <div
              className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="drop-input"
                  accept=".jpg,jpeg,.png"
                  disabled={!isSignedIn}
                  onChange={handleChange}
                />
                <div className='drop-content'>
                    <div className='drop-icon'>
                        <UploadIcon size={20}/>
                    </div>
                    <p> {isSignedIn ? (
                        "Click to upload or just drag and drop"
                    ): ("Sign in or sign up with Puter to upload")}
                    </p>
                    <p className='help'>Maximum file size 50 MB.</p>
                </div>
            </div>
        ) :(
            <div className='upload-status'>
                <div className='status-content'>
                    <div className='status-icon'>
                        {progress === 100 ?(
                            <CheckCircle2 className='check'/>
                        ):(
                            <ImageIcon className='image'/>
                        )}
                    </div>
                    <h3>{file.name}</h3>
                    <div className='progress'>
                        <div className='bar' style={{width: `${progress}%`}}/>
                        <p className='status-text'>
                            {progress < 100 ? 'analyzing Floor Plan...' : 'Redirecting...'}
                        </p>
                    </div>
                </div>
            </div>
        )}
       </div>
  )
}

export default Upload