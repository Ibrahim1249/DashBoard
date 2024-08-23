import React from 'react';
import Widget from './Widget';

const Category = ({ category, onRemoveWidget }) => {
  return (
    <div className="bg-white shadow border p-4">
      <h2 className="text-xl font-bold mb-4">{category.name}</h2>
      
      {category.widgets.length > 0 ? <div className="flex flex-wrap items-center gap-4 ">
        {category.widgets.map(widget => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => onRemoveWidget(widget.id)}
          />
        ))}
      </div> : <div className='text-red-400'>No widget is their for this category</div> }
    </div>
  );
};

export default Category;