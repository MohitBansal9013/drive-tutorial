"use client";

import React from "react";
import { useState } from "react";
import { mockData, type Item } from "../lib/mock-data";
import { Folder, File, Upload, ChevronRight } from "lucide-react";
import { Button } from "./../components/ui/button";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<Item[]>(mockData);
  const [breadcrumbs, setBreadcrumbs] = useState<Item[]>([]);

  const handleItemClick = (item: Item) => {
    if (item.type === "folder") {
      setCurrentFolder(item.children || []);
      setBreadcrumbs([...breadcrumbs, item]);
    } else {
      // For files, we'll just log a message. In a real app, this would open the file.
      console.log(`Opening file: ${item.name}`);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentFolder(mockData);
      setBreadcrumbs([]);
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setCurrentFolder(
        newBreadcrumbs[newBreadcrumbs.length - 1]?.children ?? [],
      );
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const handleUpload = () => {
    console.log("Upload button clicked");
    // In a real app, this would open a file picker and handle the upload
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-white">Google Drive Clone</h1>

      <div className="mb-4 flex items-center space-x-2">
        <Button variant="ghost" onClick={() => handleBreadcrumbClick(-1)}>
          Home
        </Button>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.id}>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Button
              variant="ghost"
              onClick={() => handleBreadcrumbClick(index)}
            >
              {item.name}
            </Button>
          </React.Fragment>
        ))}
      </div>

      <div className="mb-4">
        <Button onClick={handleUpload} aria-label="Upload file">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="space-y-2">
        {currentFolder.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer items-center rounded-lg border border-gray-700 p-4 hover:bg-gray-800"
            onClick={() => handleItemClick(item)}
          >
            {item.type === "folder" ? (
              <Folder
                className="mr-4 h-6 w-6 text-blue-500"
                aria-label="Folder"
              />
            ) : (
              <File className="mr-4 h-6 w-6 text-gray-400" aria-label="File" />
            )}
            <p className="text-sm text-white">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
