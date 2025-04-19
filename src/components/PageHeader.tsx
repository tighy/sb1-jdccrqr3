import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

function PageHeader({ title, description, icon, action }: PageHeaderProps) {
  return (
    <div className="md:flex md:items-center md:justify-between pb-4 border-b border-gray-200">
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          {icon && <div className="mr-3">{icon}</div>}
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
            {title}
          </h1>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500 max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default PageHeader;