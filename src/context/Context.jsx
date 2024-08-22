import React, { createContext, useState } from 'react'

export const AppContext = createContext();

function Context({children}) {
    const [categories, setCategories] = useState([
        {
          id: 1,
          name: 'CSPM Executive Dashboard',
          widgets: [
            {
              id: 101,
              name: 'Text Widget 1',
              type: 'text',
              content: 'This is a text widget',
            },
            {
              id: 102,
              name: 'Chart Widget 1',
              content: 'This is a text widget 2',
            },
          ],
        },
    ]);

    const handleAddWidget = (category_id, widget) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => 
                category.id === parseInt(category_id)
                    ? {...category, widgets: [...category.widgets, widget]} 
                    : category
            )
        );
    }

    const handleRemoveWidget = () => {
        // Implement remove logic here
    }
    const handleAddCategory = (category) =>{
        setCategories((prevCategories)=>{
            return [...prevCategories , {id:prevCategories.length + 1 , widgets :[] , name:category}]
        })
    }

    const contextValue = {
        categories,
        handleAddWidget,
        handleRemoveWidget,
        handleAddCategory
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider> 
    )
}

export default Context;