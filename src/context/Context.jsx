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
              type: 'chart',
              chartType: 'bar',
              data: {
                labels: ['January', 'February', 'March'],
                datasets: [{
                  label: 'Sales',
                  data: [12, 19, 3],
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }],
              },
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

    const contextValue = {
        categories,
        handleAddWidget,
        handleRemoveWidget
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider> 
    )
}

export default Context;