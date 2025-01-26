import React from 'react';
import { Badge } from '../ui/badge';

export interface EditorialTagsProps {
    tags: string[] | undefined;
}

const EditorialTags: React.FC<EditorialTagsProps> = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {tags?.map((tag, index) => (
                <Badge key={index} className="text-sm font-medium px-2 py-1">
                    {tag}
                </Badge>
            ))}
        </div>
    );
};

export default EditorialTags;
