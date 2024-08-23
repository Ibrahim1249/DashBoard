import React, { createContext, useState , useMemo , useEffect} from 'react'

export const AppContext = React.createContext();

function Context({children}) {
    
    const LOCAL_STORAGE_KEY = 'cnapp_categories';
    const saveCategoriesToLocalStorage = (categories) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
      };
      
      const getCategoriesFromLocalStorage = () => {
        const storedCategories = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedCategories ? JSON.parse(storedCategories) : [
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
        ];
      };
     const [categories, setCategories] = useState(() => getCategoriesFromLocalStorage());
    const [userInput,setUserInput] = useState("")

    const handleAddWidget = (category_id, widget) => {
        setCategories((prevCategories) => {
            const newCategories = prevCategories.map((category) =>
              category.id === parseInt(category_id)
                ? { ...category, widgets: [...category.widgets, widget] }
                : category
            );
            saveCategoriesToLocalStorage(newCategories);
            return newCategories;
          });
    }

    const handleRemoveWidget = (category_id, widget_id) => {
        setCategories((prevCategories) => {
            const newCategories = prevCategories.map((category) => {
              if (category.id === category_id) {
                return {
                  ...category,
                  widgets: category.widgets.filter((widget) => widget.id !== widget_id)
                };
              }
              return category;
            });
            saveCategoriesToLocalStorage(newCategories);
            return newCategories;
          });
    }
    const handleAddCategory = (category) =>{
        setCategories((prevCategories)=>{
            const newCategories = [
                ...prevCategories,
                { id: prevCategories.length + 1, widgets: [], name: category }
              ];
              saveCategoriesToLocalStorage(newCategories);
              return newCategories;
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



useEffect(() => {
    saveCategoriesToLocalStorage(categories);
  }, [categories]);

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