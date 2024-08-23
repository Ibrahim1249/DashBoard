import React, { createContext, useState , useMemo } from 'react'

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
    const [userInput,setUserInput] = useState("")

    const handleAddWidget = (category_id, widget) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => 
                category.id === parseInt(category_id)
                    ? {...category, widgets: [...category.widgets, widget]} 
                    : category
            )
        );
    }

    const handleRemoveWidget = (category_id, widget_id) => {
        let copyCategories = [...categories];
        let categoryIndex = copyCategories.findIndex((category) => category.id === category_id);
        
        if (categoryIndex !== -1) {
            copyCategories[categoryIndex].widgets = copyCategories[categoryIndex].widgets.filter(
                (widget) => widget.id !== widget_id
            );
            setCategories(copyCategories);
        }
    }
    const handleAddCategory = (category) =>{
        setCategories((prevCategories)=>{
            return [...prevCategories , {id:prevCategories.length + 1 , widgets :[] , name:category}]
        })
    }
    const filteredCategories = useMemo(() => {
        if (!userInput.trim()) {
          return categories;
        }
      
        return categories.map(category => {
          const categoryMatches = category.name.toLowerCase().includes(userInput.toLowerCase());
          const filteredWidgets = category.widgets.filter(widget =>
            widget.name.toLowerCase().includes(userInput.toLowerCase())
          );
      
          if (categoryMatches || filteredWidgets.length > 0) {
            return {
              ...category,
              widgets: categoryMatches ? category.widgets : filteredWidgets
            };
          }
      
          return null;
        }).filter(Boolean);
      }, [categories, userInput]);

    const contextValue = {
        categories,
        handleAddWidget,
        handleRemoveWidget,
        handleAddCategory,
        userInput,
        setUserInput,
        filteredCategories

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider> 
    )
}

export default Context;